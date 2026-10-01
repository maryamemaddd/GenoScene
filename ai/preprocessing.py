import pandas as pd
from sklearn.feature_selection import VarianceThreshold

def impute_missing_snps(df, snp_cols):
    """Imputes missing values in SNP columns with the mode."""
    nan_count = df[snp_cols].isna().sum().sum()
    if nan_count > 0:
        for c in snp_cols:
            if df[c].isna().any():
                df[c] = df[c].fillna(df[c].mode().iloc[0])
    return df

def clean_skin_target(df, target_col):
    """Merges VeryPale to Pale in Skin target column to reduce class imbalance."""
    def _clean_skin(v):
        s = str(v).strip().replace(" ", "").lower()
        mapping = {
            "darktoblack": "DarkToBlack", "dark": "Dark",
            "intermediate": "Intermediate", "pale": "Pale", "verypale": "VeryPale",
        }
        return mapping.get(s, s)
        
    merged_col = f"{target_col}_merged"
    df[merged_col] = df[target_col].map(_clean_skin).replace("VeryPale", "Pale")
    return df, merged_col

def fit_variance_threshold(df, snp_cols, threshold=0.01):
    """Fits VarianceThreshold to drop near-constant SNPs."""
    var_selector = VarianceThreshold(threshold=threshold)
    var_selector.fit(df[snp_cols].values)
    selected_snps = [snp_cols[i] for i in range(len(snp_cols)) if var_selector.get_support()[i]]
    return selected_snps
