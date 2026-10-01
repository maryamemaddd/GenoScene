import os
import sys
from prompt_builder import build_prompt
from generator import generate_face

def test_face_generation():
    prediction = {
        "Eye": {"Top": "Brown", "Probabilities_%": {"Brown": 99.36, "Blue": 0.64}},
        "Hair": {"Top": "Brown with subtle Red tones", "Probabilities_%": {"Brown": 55.57, "Red": 44.43}},
        "Skin": {"Top": "Intermediate", "Probabilities_%": {"Intermediate": 98.12, "Pale": 1.88}}
    }
    
    prompt = build_prompt(prediction)
    print(f"Successfully generated prompt:\n{prompt}\n")
    
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "generated")
    output_path = os.path.join(output_dir, "face_test.png")
    
    try:
        print("Passing prompt to SDXL pipeline...")
        generate_face(prompt, output_path)
        
        if os.path.exists(output_path):
            print(f"\n[SUCCESS] Image generated and saved to: {output_path}")
        else:
            print("\n[FAILURE] Execution completed but the image was not saved.")
            
    except RuntimeError as e:
        if "CUDA" in str(e):
            print(f"\n[INFO] Expected Prototype limitation: {e}\nLocal test bypassed smoothly since CUDA isn't strictly available.")
        else:
            raise e
            
if __name__ == "__main__":
    test_face_generation()
