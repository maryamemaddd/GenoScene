# 🧪 GenoScene Forensic Demo Datasets
### Ready-to-Test Genomic SNP Profiles for Phenotypic Validation

This directory contains pre-validated, anonymized Single Nucleotide Polymorphism (SNP) genotype matrices formatted for instant testing with the GenoScene prediction pipeline and web application.

---

## 📁 Sample Profiles Catalog

| File Name | Primary Eye Color | Primary Hair Color | Skin Pigmentation | Notable Genetic Signatures |
| :--- | :--- | :--- | :--- | :--- |
| **[`case_01_blue_eyes_blond_hair.csv`](case_01_blue_eyes_blond_hair.csv)** | **Blue** (>90%) | **Blond** (>70%) | **Pale / Intermediate** | Homozygous `rs12913832 (G/G)` in `HERC2/OCA2`, `SLC45A2 (rs16891982)` derived allele |
| **[`case_02_brown_eyes_black_hair.csv`](case_02_brown_eyes_black_hair.csv)** | **Brown** (>95%) | **Black** (>90%) | **Intermediate / Dark** | Ancestral alleles across pigmentation loci, strong eumelanin expression |
| **[`case_03_red_hair_pale_skin.csv`](case_03_red_hair_pale_skin.csv)** | **Brown / Hazel** | **Red** (>60%) | **Very Pale / Pale** | Loss-of-function variants in `MC1R` (`rs1805007`, `rs1805008`), high pheomelanin ratio |

---

## 🚀 How to Test

### Option 1: Drag & Drop in the Web Application (`genoscene/`)
1. Open the **GenoScene** web interface (`http://localhost:5173`).
2. Navigate to the **Analysis** tab.
3. Drag any of the CSV files above into the **Genomic CSV Dropzone**.
4. Observe the real-time parsing, 40-SNP extraction, and calibrated probability calculations!

### Option 2: Test via the FastAPI AI Endpoint (`ai/`)
```bash
curl -X POST -F "file=@demo_samples/case_01_blue_eyes_blond_hair.csv" http://127.0.0.1:8000/predict
```

### Option 3: Test via the Node.js API Gateway (`backend/`)
```bash
curl -X POST -F "file=@demo_samples/case_03_red_hair_pale_skin.csv" http://localhost:3000/api/predict
```
