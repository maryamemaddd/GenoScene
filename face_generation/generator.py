import torch
import os
import threading
from diffusers import DiffusionPipeline

class SDXLGenerator:
    def __init__(self):
        if not torch.cuda.is_available():
            raise RuntimeError("CUDA-capable GPU is strictly required for SDXL generation in this prototype. CPU execution is disabled to prevent unacceptable latency.")
            
        self.device = "cuda"
        print(f"Initializing SDXL on {self.device}...")
        
        self.pipeline = DiffusionPipeline.from_pretrained(
            "stabilityai/stable-diffusion-xl-base-1.0",
            torch_dtype=torch.float16,
            use_safetensors=True,
            variant="fp16"
        )
        self.pipeline = self.pipeline.to(self.device)

    def generate_face(self, prompt: str, output_path: str):
        print(f"Generating image. Prompt: \n{prompt}")
        negative_prompt = "cartoon, anime, 3d, cgi, deformed, distorted, blurry, low resolution, bad anatomy, bad eyes, text, watermark, mutated"
        
        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        
        image = self.pipeline(
            prompt=prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=30,
            guidance_scale=7.0,
            height=1024,
            width=1024
        ).images[0]
        
        image.save(output_path)
        print(f"Saved generated image to {output_path}")
        
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
            
        return output_path

_generator_instance = None
_generator_lock = threading.Lock()

def generate_face(prompt: str, output_path: str):
    global _generator_instance
    
    if _generator_instance is None:
        with _generator_lock:
            if _generator_instance is None:
                _generator_instance = SDXLGenerator()
    
    with _generator_lock:
        return _generator_instance.generate_face(prompt, output_path)
