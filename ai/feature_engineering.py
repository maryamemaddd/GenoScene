import pandas as pd

GENE_GROUPS = {
    "MC1R":       ["rs1805005","rs1805006","rs1805007","rs1805008","rs1805009",
                   "rs2228479","rs11547464","rs885479","rs1110400"],
    "HERC2_OCA2": ["rs12913832","rs1129038","rs1470608","rs1800407","rs12896399"],
    "SLC":        ["rs1426654","rs16891982","rs28777"],
    "TYR":        ["rs1042602","rs1393350","rs1126809"],
}

def construct_gene_group_features(df, selected_snps):
    """
    Aggregate features from known pigmentation gene groups.
    Creates sum/mean aggregates and interaction features.
    """
    gene_group_cols = []
    
    for group_name, rs_ids in GENE_GROUPS.items():
        cols = [s for s in selected_snps if any(rs in s for rs in rs_ids) and s in df.columns]
        if len(cols) >= 2:
            df[f"{group_name}_sum"]  = df[cols].sum(axis=1)
            df[f"{group_name}_mean"] = df[cols].mean(axis=1)
            gene_group_cols += [f"{group_name}_sum", f"{group_name}_mean"]

    if "MC1R_sum" in df.columns and "HERC2_OCA2_sum" in df.columns:
        df["MC1R_x_HERC2"] = df["MC1R_sum"] * df["HERC2_OCA2_sum"]
        gene_group_cols.append("MC1R_x_HERC2")
        
    if "MC1R_sum" in df.columns and "SLC_sum" in df.columns:
        df["MC1R_x_SLC"] = df["MC1R_sum"] * df["SLC_sum"]
        gene_group_cols.append("MC1R_x_SLC")
        
    return df, gene_group_cols
