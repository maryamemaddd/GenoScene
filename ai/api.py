from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import tempfile
import pandas as pd

from predict import predict_multitask_from_csv

app = FastAPI(title="GenoScene API", description="FastAPI server for GenoScene phenotypic inference pipeline.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_endpoint():
    return {"status": "ok"}

@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="Missing file")
    
    if not file.filename.lower().endswith('.csv'):
        raise HTTPException(status_code=400, detail="Uploaded file must be a CSV format")
    
    temp_dir = tempfile.mkdtemp()
    temp_file_path = os.path.join(temp_dir, file.filename)
    
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        if os.path.getsize(temp_file_path) == 0:
            raise HTTPException(status_code=400, detail="The uploaded file is completely empty.")
            
        try:
            pd.read_csv(temp_file_path, nrows=1)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid CSV malformed structure.")

        try:
            results = predict_multitask_from_csv(temp_file_path)
            
            if not results or len(results) == 0:
                raise HTTPException(status_code=400, detail="Invalid genotype data; no rows extracted.")
                
            return results[0]
            
        except ValueError as e:
            if "Missing columns" in str(e):
                raise HTTPException(status_code=400, detail=str(e))
            raise HTTPException(status_code=400, detail=f"Genotype preprocessing value error: {str(e)}")
        except Exception as e:
            print(f"Prediction Internal Error: {e}")
            raise HTTPException(status_code=500, detail="An internal server error occurred during inference scoring.")
            
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
