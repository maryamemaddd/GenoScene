# 🎨 GenoScene Face Generation Engine
### Generative Forensic Facial Reconstruction using Stable Diffusion XL (SDXL)

<p align="center">
  <img src="../docs/assets/facial_reconstruction.jpg" alt="GenoScene Generative Facial Reconstruction" width="100%" style="border-radius: 10px; border: 1px solid #1e293b;" />
</p>

The **GenoScene Face Generation Engine** transforms discrete and probabilistic phenotypic traits (eye color, hair pigmentation, skin dermal tones) into hyper-realistic, photorealistic forensic facial portraits using state-of-the-art latent diffusion models.

---

## 🌟 Key Features

- **Algorithmic Prompt Synthesizer (`prompt_builder.py`)**:
  - Dynamically evaluates probability margins between dominant and runner-up traits.
  - Automatically captures subtle phenotypic undertones (e.g., *"Brown hair with subtle Red tones"*) when secondary traits exceed probability threshold criteria.
  - Generates studio-grade portrait photography prompts enforcing neutral lighting, front-facing orientation, and natural human skin texture.
- **Thread-Safe SDXL Pipeline (`generator.py`)**:
  - Implements the Double-Checked Locking singleton pattern to avoid redundant multi-gigabyte model allocations in GPU VRAM.
  - Sequential inference queue preventing Out-Of-Memory (OOM) race conditions.
  - Automatic VRAM cache flushing (`torch.cuda.empty_cache()`) post-generation.
- **RESTful Service (`api.py`)**:
  - Exposes a clean FastAPI interface ready for integration with the central Node.js API Gateway or direct client access.

---

## 🏗️ Technical Pipeline

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'darkMode': false, 'background': '#FFFFFF', 'mainBkg': '#FFFFFF', 'clusterBkg': '#FFFFFF', 'clusterBorder': '#CBD5E1', 'lineColor': '#475569' }}}%%
flowchart TD
    Vector["📊 <b>Phenotype Prediction Vector</b><br/>Eye: Brown 98.4% • Hair: Dark Brown 91.1% • Skin: Intermediate 89.6%"]
    
    subgraph Engine ["🧠 Algorithmic Prompt Synthesizer (prompt_builder.py)"]
        Margin["⚖️ <b>Probability Margin Evaluator</b><br/>Δ(Top, Runner-up) < 20% Threshold Check"]
        Tone["🎨 <b>Subtle Undertone Enrichment</b><br/>e.g. 'Brown hair with subtle Red tones'"]
        Studio["📸 <b>Studio Photography Descriptor Matrix</b><br/>8k, front-facing, neutral expression, studio lighting"]
        Margin --> Tone --> Studio
    end

    subgraph SDXL_Pipeline ["🚀 Thread-Safe SDXL 1.0 Diffusion Pipeline (generator.py)"]
        Lock["🔒 <b>Double-Checked Thread Lock</b><br/>Prevents VRAM Race Conditions"]
        Model["🖼️ <b>stabilityai/stable-diffusion-xl-base-1.0</b><br/>Precision: fp16 • Steps: 30 • Guidance: 7.0"]
        Flush["🧹 <b>CUDA VRAM Auto-Cache Flush</b><br/>torch.cuda.empty_cache()"]
        Lock --> Model --> Flush
    end

    Vector --> Margin
    Studio --> Lock
    Flush --> Result["👤 <b>Synthesized 1024x1024 Forensic Portrait</b><br/>Photorealistic Forensic Facial Composite"]

    classDef dnaBlue fill:#EFF6FF,stroke:#2563EB,stroke-width:2.5px,color:#0F172A;
    classDef dnaPurple fill:#FAF5FF,stroke:#7C3AED,stroke-width:2.5px,color:#0F172A;
    classDef dnaCoral fill:#FFF1F2,stroke:#E11D48,stroke-width:2.5px,color:#0F172A;
    classDef dnaGreen fill:#ECFDF5,stroke:#059669,stroke-width:2.5px,color:#0F172A;

    class Vector dnaBlue;
    class Margin,Tone,Studio dnaPurple;
    class Lock,Model,Flush dnaCoral;
    class Result dnaGreen;

    style Engine fill:#FFFFFF,stroke:#CBD5E1,stroke-width:1.5px,color:#0F172A;
    style SDXL_Pipeline fill:#FFFFFF,stroke:#CBD5E1,stroke-width:1.5px,color:#0F172A;
```

---

## 📡 API Endpoints

### 1. Health Status
- **Method**: `GET /health`
- **Response**: `{"status": "ok", "service": "face-generation"}`

### 2. Generate Face
- **Method**: `POST /generate-face`
- **Request Body**:
```json
{
  "Eye": {
    "Top": "Brown",
    "Probabilities_%": { "Brown": 98.5, "Blue": 1.5 }
  },
  "Hair": {
    "Top": "Black",
    "Probabilities_%": { "Black": 92.0, "Brown": 8.0 }
  },
  "Skin": {
    "Top": "Intermediate",
    "Probabilities_%": { "Intermediate": 90.0, "Pale": 10.0 }
  }
}
```
- **Response**:
```json
{
  "status": "success",
  "prompt": "A photorealistic portrait photograph of an adult human...",
  "image_url": "/generated/face_1727800000.png"
}
```

---

## 🚀 Setup & Execution

### Prerequisites
- Python 3.10+
- **NVIDIA GPU** with CUDA support and at least 8 GB VRAM (Recommended for SDXL 1.0).
- *Note: In resource-constrained environments, you can run this microservice on Google Colab or Kaggle with a T4/A100 GPU and tunnel via Ngrok.*

### Dependencies Installation
```bash
cd face_generation
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
pip install diffusers transformers accelerate safetensors fastapi uvicorn
```

### Running the Microservice
```bash
python -m uvicorn api:app --host 127.0.0.1 --port 8001 --reload
```

---

## 📁 Track Structure

```
face_generation/
├── api.py              # FastAPI HTTP interface
├── generator.py        # SDXL loading and inference execution
├── prompt_builder.py   # Trait-to-prompt transformation engine
├── test_generator.py   # Standalone GPU synthesis verification script
└── test_prompt.py      # Unit test for prompt builder logic
```
