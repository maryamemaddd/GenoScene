import pandas as pd
from sklearn.ensemble import RandomForestClassifier

def perform_feature_selection(df, target_col, all_feature_cols, n_features):
    """
    Executes Random Forest feature selection to identify the top N important features
    for a given target. Fits the Random Forest on all_feature_cols.
    """
    X_fs = df[all_feature_cols]
    y_fs = df[target_col].astype(str)
    
    rf = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
    rf.fit(X_fs, y_fs)
    
    importances = pd.Series(rf.feature_importances_, index=all_feature_cols)
    top_n = importances.nlargest(n_features).index.tolist()
    
    return top_n
