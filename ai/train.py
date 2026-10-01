import os
import joblib
import numpy as np
import pandas as pd
import optuna
import warnings

warnings.filterwarnings('ignore')
optuna.logging.set_verbosity(optuna.logging.WARNING)

from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import StratifiedKFold, train_test_split
from sklearn.metrics import accuracy_score, f1_score, log_loss
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier, StackingClassifier
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.calibration import CalibratedClassifierCV
from xgboost import XGBClassifier
import lightgbm as lgb
from pytorch_tabnet.tab_model import TabNetClassifier
from imblearn.over_sampling import BorderlineSMOTE, RandomOverSampler
from collections import Counter

from preprocessing import impute_missing_snps, clean_skin_target, fit_variance_threshold
from feature_engineering import construct_gene_group_features
from feature_selection import perform_feature_selection

class TabNetWrapper:
    _estimator_type = "classifier"

    def __init__(self, **kwargs):
        self.kwargs = kwargs
        self.model = None
        self.classes_ = None

    def fit(self, X, y, **fit_params):
        self.classes_ = np.unique(y)
        self.model = TabNetClassifier(**self.kwargs)
        self.model.fit(X.astype(np.float32), y, **fit_params)
        return self

    def predict(self, X):
        return self.model.predict(X.astype(np.float32))

    def predict_proba(self, X):
        return self.model.predict_proba(X.astype(np.float32))

    def get_params(self, deep=True):
        return self.kwargs.copy()

    def set_params(self, **params):
        self.kwargs.update(params)
        return self

def optuna_xgb(X_train, y_train, n_classes, n_trials=15):
    def objective(trial):
        params = {
            "n_estimators": trial.suggest_int("n_estimators", 200, 600),
            "max_depth": trial.suggest_int("max_depth", 3, 8),
            "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.15),
            "subsample": trial.suggest_float("subsample", 0.6, 1.0),
            "colsample_bytree": trial.suggest_float("colsample_bytree", 0.6, 1.0),
            "min_child_weight": trial.suggest_int("min_child_weight", 1, 10),
            "reg_alpha": trial.suggest_float("reg_alpha", 1e-8, 10.0, log=True),
            "reg_lambda": trial.suggest_float("reg_lambda", 1e-8, 10.0, log=True),
        }
        mdl = XGBClassifier(
            **params, objective="multi:softprob", num_class=n_classes,
            random_state=42, verbosity=0, n_jobs=-1)
        skf = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
        scores = []
        for tr, va in skf.split(X_train, y_train):
            mdl.fit(X_train[tr], y_train[tr])
            scores.append(f1_score(y_train[va], mdl.predict(X_train[va]), average="macro"))
        return np.mean(scores)

    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=n_trials, show_progress_bar=False)
    print(f"    XGB best CV-F1={study.best_value:.4f}")
    return study.best_params

def optuna_lgbm(X_train, y_train, n_classes, n_trials=15):
    obj = "multiclass" if n_classes > 2 else "binary"
    def objective(trial):
        params = {
            "n_estimators": trial.suggest_int("n_estimators", 200, 600),
            "num_leaves": trial.suggest_int("num_leaves", 15, 63),
            "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.15),
            "subsample": trial.suggest_float("subsample", 0.6, 1.0),
            "colsample_bytree": trial.suggest_float("colsample_bytree", 0.6, 1.0),
            "min_child_samples": trial.suggest_int("min_child_samples", 5, 20),
            "reg_alpha": trial.suggest_float("reg_alpha", 1e-8, 10.0, log=True),
            "reg_lambda": trial.suggest_float("reg_lambda", 1e-8, 10.0, log=True),
        }
        mdl = lgb.LGBMClassifier(
            **params, objective=obj,
            num_class=n_classes if obj == "multiclass" else None,
            class_weight="balanced" if obj == "multiclass" else None,
            random_state=42, n_jobs=-1, verbose=-1)
        skf = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
        scores = []
        for tr, va in skf.split(X_train, y_train):
            mdl.fit(X_train[tr], y_train[tr])
            scores.append(f1_score(y_train[va], mdl.predict(X_train[va]), average="macro"))
        return np.mean(scores)

    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=n_trials, show_progress_bar=False)
    print(f"    LGBM best CV-F1={study.best_value:.4f}")
    return study.best_params

def apply_smote(X, y):
    min_count = min(Counter(y).values())
    if min_count < 2:
        print("    Oversampling: skipped (class with <2 samples)")
        return X, y
    if min_count <= 5:
        ros = RandomOverSampler(random_state=42)
        X_r, y_r = ros.fit_resample(X, y)
        print(f"    RandomOverSampler: {len(y)} -> {len(y_r)}")
        return X_r, y_r
    try:
        k = min(5, min_count - 1)
        sm = BorderlineSMOTE(random_state=42, k_neighbors=k)
        X_r, y_r = sm.fit_resample(X, y)
        print(f"    BorderlineSMOTE: {len(y)} -> {len(y_r)}")
        return X_r, y_r
    except Exception:
        ros = RandomOverSampler(random_state=42)
        X_r, y_r = ros.fit_resample(X, y)
        print(f"    Fallback RandomOverSampler: {len(y)} -> {len(y_r)}")
        return X_r, y_r

def compute_metrics(y_true, y_pred, y_proba, n_classes):
    return {
        "Accuracy": round(accuracy_score(y_true, y_pred), 4),
        "Macro_F1": round(f1_score(y_true, y_pred, average="macro"), 4),
        "Log_Loss": round(log_loss(y_true, y_proba, labels=list(range(n_classes))), 4),
    }

def train_eval_trait(trait_name, target_col, feature_cols, df_data):
    le = LabelEncoder()
    y_all = le.fit_transform(df_data[target_col].astype(str))
    classes = le.classes_
    n_classes = len(classes)
    X_all = df_data[feature_cols].values

    print(f"\n{'='*60}")
    print(f"  {trait_name}  |  {n_classes} classes: {list(classes)}  |  {len(feature_cols)} features")
    print(f"{'='*60}")

    X_tv, X_test, y_tv, y_test = train_test_split(
        X_all, y_all, test_size=0.2, random_state=42, stratify=y_all)
    X_train, X_calib, y_train, y_calib = train_test_split(
        X_tv, y_tv, test_size=0.125, random_state=42, stratify=y_tv)
    print(f"  Split: train={len(y_train)}, calib={len(y_calib)}, test={len(y_test)}")

    X_sm, y_sm = apply_smote(X_train, y_train)

    X_tr, X_es, y_tr, y_es = train_test_split(
        X_sm, y_sm, test_size=0.15, random_state=42, stratify=y_sm)

    min_cal = min(Counter(y_calib).values())
    cal_method = "sigmoid" if min_cal < 10 else "isotonic"
    print(f"  Calibration: {cal_method} (min calib class={min_cal})")

    models, metrics_dict, preds = {}, {}, {}

    def _register(name, model, X_te=X_test):
        pred = model.predict(X_te)
        proba = model.predict_proba(X_te)
        models[name] = model
        metrics_dict[name] = compute_metrics(y_test, pred, proba, n_classes)
        preds[name] = pred
        m = metrics_dict[name]
        print(f"    {name:<12s}  Acc={m['Accuracy']:.4f}  F1={m['Macro_F1']:.4f}  Loss={m['Log_Loss']:.4f}")

    print("  [1/8] LogisticRegression")
    lr = Pipeline([("scaler", StandardScaler()),
                   ("clf", LogisticRegression(solver="lbfgs", max_iter=2000, class_weight="balanced"))])
    lr.fit(X_sm, y_sm)
    lr_cal = CalibratedClassifierCV(lr, method=cal_method, cv="prefit")
    lr_cal.fit(X_calib, y_calib)
    _register("LogReg", lr_cal)

    print("  [2/8] LightGBM (Optuna)")
    lgbm_params = optuna_lgbm(X_sm, y_sm, n_classes, n_trials=1)
    obj_type = "multiclass" if n_classes > 2 else "binary"
    lgbm_m = lgb.LGBMClassifier(
        **lgbm_params, objective=obj_type,
        num_class=n_classes if obj_type == "multiclass" else None,
        class_weight="balanced" if obj_type == "multiclass" else None,
        random_state=42, n_jobs=-1, verbose=-1)
    lgbm_m.fit(X_tr, y_tr, eval_set=[(X_es, y_es)],
               callbacks=[lgb.early_stopping(stopping_rounds=25, verbose=False)])
    lgbm_cal = CalibratedClassifierCV(lgbm_m, method=cal_method, cv="prefit")
    lgbm_cal.fit(X_calib, y_calib)
    _register("LGBM", lgbm_cal)

    print("  [3/8] XGBoost (Optuna)")
    xgb_params = optuna_xgb(X_sm, y_sm, n_classes, n_trials=1)
    xgb_m = XGBClassifier(
        **xgb_params, objective="multi:softprob", num_class=n_classes,
        random_state=42, verbosity=0, n_jobs=-1)
    xgb_m.fit(X_sm, y_sm)
    xgb_cal = CalibratedClassifierCV(xgb_m, method=cal_method, cv="prefit")
    xgb_cal.fit(X_calib, y_calib)
    _register("XGB", xgb_cal)

    print("  [4/8] HistGradientBoosting")
    hist_m = HistGradientBoostingClassifier(
        max_iter=300, max_depth=5, learning_rate=0.05,
        random_state=42, class_weight="balanced")
    hist_m.fit(X_sm, y_sm)
    hist_cal = CalibratedClassifierCV(hist_m, method=cal_method, cv="prefit")
    hist_cal.fit(X_calib, y_calib)
    _register("HistGB", hist_cal)

    print("  [5/8] SVC")
    svc_pipe = Pipeline([("scaler", StandardScaler()),
                         ("clf", SVC(kernel="rbf", C=1.0, gamma="scale",
                                     random_state=42, class_weight="balanced"))])
    svc_pipe.fit(X_sm, y_sm)
    svc_cal = CalibratedClassifierCV(svc_pipe, method=cal_method, cv="prefit")
    svc_cal.fit(X_calib, y_calib)
    _register("SVC", svc_cal)

    print("  [6/8] RandomForest")
    rf_m = RandomForestClassifier(
        n_estimators=300, random_state=42, class_weight="balanced", n_jobs=-1)
    rf_m.fit(X_sm, y_sm)
    rf_cal = CalibratedClassifierCV(rf_m, method=cal_method, cv="prefit")
    rf_cal.fit(X_calib, y_calib)
    _register("RF", rf_cal)

    print("  [7/8] TabNet")
    tab_m = TabNetWrapper(
        n_d=32, n_a=32, n_steps=5, gamma=1.5,
        optimizer_params=dict(lr=2e-2),
        scheduler_params={"step_size": 10, "gamma": 0.9},
        verbose=0)
    tab_m.fit(X_sm, y_sm,
              weights=0, 
              max_epochs=5, patience=3,
              eval_set=[(X_es.astype(np.float32), y_es)])
    tab_cal = CalibratedClassifierCV(tab_m, method=cal_method, cv="prefit")
    tab_cal.fit(X_calib, y_calib)
    _register("TabNet", tab_cal)

    print("  [8/8] Stacking Ensemble")
    stack_est = [
        ("lgbm", lgb.LGBMClassifier(
            **lgbm_params, objective=obj_type,
            num_class=n_classes if obj_type == "multiclass" else None,
            class_weight="balanced" if obj_type == "multiclass" else None,
            random_state=42, n_jobs=-1, verbose=-1)),
        ("xgb", XGBClassifier(
            **xgb_params, objective="multi:softprob", num_class=n_classes,
            random_state=42, verbosity=0, n_jobs=-1)),
        ("hist", HistGradientBoostingClassifier(
            max_iter=300, max_depth=5, learning_rate=0.05,
            random_state=42, class_weight="balanced")),
        ("rf", RandomForestClassifier(
            n_estimators=300, random_state=42, class_weight="balanced", n_jobs=-1)),
    ]
    stacker = StackingClassifier(
        estimators=stack_est,
        final_estimator=LogisticRegression(max_iter=1000, class_weight="balanced"),
        cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=42),
        stack_method="predict_proba", n_jobs=-1)
    stacker.fit(X_sm, y_sm)
    stack_cal = CalibratedClassifierCV(stacker, method=cal_method, cv="prefit")
    stack_cal.fit(X_calib, y_calib)
    _register("Stacking", stack_cal)

    return {
        "label_encoder": le,
        "classes": classes,
        "models": models,
        "metrics": metrics_dict,
        "feature_cols": feature_cols,
    }

def choose_best_model(res_dict):
    best_name, best_m = None, None
    for name, m in res_dict["metrics"].items():
        if best_m is None \
           or m["Macro_F1"] > best_m["Macro_F1"] \
           or (m["Macro_F1"] == best_m["Macro_F1"] and m["Log_Loss"] < best_m["Log_Loss"]):
            best_name, best_m = name, m
    return best_name, res_dict["models"][best_name]

if __name__ == "__main__":
    import os
    print("Starting GenoScene AI Model Pipeline Extraction...")

    data_path = "../final_5.csv"
    EYE_TARGET  = "Predicted_Eye_Color"
    HAIR_TARGET = "Predicted_Hair_Color"
    SKIN_TARGET = "Predicted_Skin_Color"

    os.makedirs("models", exist_ok=True)
    os.makedirs("artifacts", exist_ok=True)

    print("Loading Data...")
    df = pd.read_csv(data_path)
    snp_cols = [c for c in df.columns if c.startswith("rs")]

    print("Preprocessing & Imputing...")
    df = impute_missing_snps(df, snp_cols)
    selected_snps = fit_variance_threshold(df, snp_cols)

    df, SKIN_TARGET_MERGED = clean_skin_target(df, SKIN_TARGET)

    print("Feature Engineering...")
    df, gene_group_cols = construct_gene_group_features(df, selected_snps)
    all_feature_cols = selected_snps + gene_group_cols
    
    print("Saving selected SNPs globally required for feature engineering generation")
    joblib.dump(selected_snps, "artifacts/selected_snps.joblib")

    print("Feature Selection per Trait...")
    trait_feature_cols = {}
    targets_fs = {
        "Eye":  EYE_TARGET,
        "Hair": HAIR_TARGET,
        "Skin": SKIN_TARGET_MERGED,
    }
    target_n_features = {"Eye": 15, "Hair": 35, "Skin": 30}

    for label, target_col in targets_fs.items():
        n = target_n_features[label]
        rf_fs = RandomForestClassifier(n_estimators=10, random_state=42, n_jobs=-1)
        rf_fs.fit(df[all_feature_cols], df[target_col].astype(str))
        importances = pd.Series(rf_fs.feature_importances_, index=all_feature_cols)
        top_n = importances.nlargest(n).index.tolist()
        trait_feature_cols[label] = top_n

    print("Training models...")
    eye_res  = train_eval_trait("Eye",  EYE_TARGET, trait_feature_cols["Eye"], df)
    hair_res = train_eval_trait("Hair", HAIR_TARGET, trait_feature_cols["Hair"], df)
    skin_res = train_eval_trait("Skin", SKIN_TARGET_MERGED, trait_feature_cols["Skin"], df)

    print("Selecting Best Models & Persisting Artifacts...")
    eye_choice,  eye_final_model  = choose_best_model(eye_res)
    hair_choice, hair_final_model = choose_best_model(hair_res)
    skin_choice, skin_final_model = choose_best_model(skin_res)

    for label, choice, res, model in [
        ("Eye", eye_choice, eye_res, eye_final_model),
        ("Hair", hair_choice, hair_res, hair_final_model),
        ("Skin", skin_choice, skin_res, skin_final_model)
    ]:
        print(f"Persisting {label} - Best model was {choice}")
        joblib.dump(model, f"models/{label}_model.joblib")
        
        trait_artifacts = {
            "label_encoder": res["label_encoder"],
            "classes": res["classes"],
            "feature_cols": res["feature_cols"]
        }
        joblib.dump(trait_artifacts, f"artifacts/{label}_artifacts.joblib")

    print("Pipeline Extraction Complete.")
