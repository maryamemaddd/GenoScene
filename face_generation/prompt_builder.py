def get_visual_trait(probabilities, threshold=20):
    sorted_traits = sorted(
        probabilities.items(),
        key=lambda x: x[1],
        reverse=True
    )

    top_trait, top_prob = sorted_traits[0]
    second_trait, second_prob = sorted_traits[1]

    if top_prob - second_prob < threshold:
        return f"{top_trait} with subtle {second_trait} tones"

    return top_trait

def build_prompt(genoscene_result):
    eye = get_visual_trait(
        genoscene_result["Eye"]["Probabilities_%"]
    )

    hair = get_visual_trait(
        genoscene_result["Hair"]["Probabilities_%"]
    )

    skin = get_visual_trait(
        genoscene_result["Skin"]["Probabilities_%"]
    )

    prompt = f"""
A photorealistic portrait photograph of an adult human,
front-facing,
natural realistic facial features,
{eye} eyes,
{hair} hair,
{skin} skin pigmentation,
natural human appearance,
realistic skin texture,
natural hair texture,
neutral facial expression,
plain neutral background,
soft natural studio lighting,
professional portrait photography,
highly photorealistic
"""

    return prompt.strip()