from prompt_builder import build_prompt

genoscene_result = {
    "Eye": {
        "Top": "Brown",
        "Confidence_%": 99.36,
        "Probabilities_%": {
            "Blue": 0.56,
            "Brown": 99.36,
            "Intermediate": 0.08
        }
    },
    "Hair": {
        "Top": "Brown",
        "Confidence_%": 55.57,
        "Probabilities_%": {
            "Black": 0.00,
            "Blond": 0.00,
            "Brown": 55.57,
            "Red": 44.43
        }
    },
    "Skin": {
        "Top": "Intermediate",
        "Confidence_%": 98.12,
        "Probabilities_%": {
            "Dark": 0.54,
            "DarkToBlack": 0.00,
            "Intermediate": 98.12,
            "Pale": 1.33
        }
    }
}

prompt = build_prompt(genoscene_result)

print(prompt)