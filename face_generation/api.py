from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import uuid

from prompt_builder import build_prompt
from generator import generate_face

app = FastAPI(title="GenoScene Face Generation API")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Face Generation Service Operational"}

@app.post("/generate")
def generate_face_endpoint(genoscene_result: dict):
    if not genoscene_result or "Eye" not in genoscene_result:
        raise HTTPException(status_code=400, detail="Invalid Genoscene Prediction JSON")

    try:
        prompt = build_prompt(genoscene_result)
        
        output_dir = "/kaggle/working/generated"
        os.makedirs(output_dir, exist_ok=True)
        
        filename = f"{uuid.uuid4().hex}.png"
        output_path = os.path.join(output_dir, filename)

        generate_face(prompt, output_path)

        if not os.path.exists(output_path):
            raise HTTPException(status_code=500, detail="CUDA executed successfully but image was not found locally.")

        return FileResponse(path=output_path, media_type="image/png", filename="visualized_face.png")
    
    except RuntimeError as e:
        if "CUDA" in str(e):
            raise HTTPException(status_code=503, detail="Face generation requires CUDA-capable GPU hardware. The current environment cannot execute this request.")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
