import joblib
import pandas as pd
import numpy as np
from feature_engineering import GENE_GROUPS

def entropy(probs):
    return float(-np.sum(probs * np.log(probs + 1e-9)))

def uncertainty_level(ent):
    if ent < 0.3:
        return "Very High Confidence"
    elif ent < 0.7:
        return "Moderate Confidence"
    else:
        return "Low Confidence"

def predict_multitask_from_csv(csv_path):
    df_in = pd.read_csv(csv_path)

    selected_snps = joblib.load("artifacts/selected_snps.joblib")
    
    snps_in = [c for c in selected_snps if c in df_in.columns]
    for group_name, rs_ids in GENE_GROUPS.items():
        cols = [s for s in snps_in if any(rs in s for rs in rs_ids)]
        if len(cols) >= 2:
            df_in[f"{group_name}_sum"]  = df_in[cols].sum(axis=1)
            df_in[f"{group_name}_mean"] = df_in[cols].mean(axis=1)
            
    if "MC1R_sum" in df_in.columns and "HERC2_OCA2_sum" in df_in.columns:
        df_in["MC1R_x_HERC2"] = df_in["MC1R_sum"] * df_in["HERC2_OCA2_sum"]
    if "MC1R_sum" in df_in.columns and "SLC_sum" in df_in.columns:
        df_in["MC1R_x_SLC"] = df_in["MC1R_sum"] * df_in["SLC_sum"]

    traits_config = {}
    for label in ["Eye", "Hair", "Skin"]:
        artifacts = joblib.load(f"artifacts/{label}_artifacts.joblib")
        model = joblib.load(f"models/{label}_model.joblib")
        traits_config[label] = {
            "feature_cols": artifacts["feature_cols"],
            "classes": artifacts["classes"],
            "model": model
        }

    all_needed = set()
    for config in traits_config.values():
        all_needed.update(config["feature_cols"])
        
    missing = [c for c in all_needed if c not in df_in.columns]
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    outputs = []
    for i in range(len(df_in)):
        out = {}
        for trait_key, config in traits_config.items():
            feat_cols = config["feature_cols"]
            X_i = df_in[feat_cols].iloc[i].values.reshape(1, -1)
            
            proba = config["model"].predict_proba(X_i)[0]
            cls = config["classes"]
            top_idx = int(np.argmax(proba))
            
            out[trait_key] = {
                "Top": str(cls[top_idx]),
                "Confidence_%": round(float(np.max(proba)) * 100, 2),
                "Entropy": round(entropy(proba), 4),
                "Uncertainty": uncertainty_level(entropy(proba)),
                "Probabilities_%": {str(c): round(float(v)*100, 2) for c, v in zip(cls, proba)},
            }

        out["Summary"] = {k: out[k]["Top"] for k in ["Eye", "Hair", "Skin"]}
        out["Overall_Confidence_%"] = round(
            np.mean([out[k]["Confidence_%"] for k in ["Eye", "Hair", "Skin"]]), 2)
        outputs.append(out)
        
    return outputs

if __name__ == "__main__":
    import json as _json
    import os
    
    import sys
    csv_path = sys.argv[1] if len(sys.argv) > 1 else "../final_5.csv"
    
    if os.path.isfile(csv_path):
        results = predict_multitask_from_csv(csv_path)
        print("="*60)
        print("INFERENCE RESULTS")
        print("="*60)
        print(_json.dumps(results[0], indent=2, ensure_ascii=False))
    else:
        print(f"{csv_path} not found; skip inference.")
