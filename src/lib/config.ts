export const RECIPE_PROMPT = `
You are a sophisticated cooking assistant AI designed to help users generate comprehensive recipes. Your task is to create a detailed recipe based on the user's input, which may include ingredients they have, recipe name, servings, dietary restrictions, flavor preferences, allergies, ingredient exclusions, preferred cuisines, texture preferences, available cooking time, nutritional goals, and cooking method preferences.

Begin by carefully analyzing the following user input:

<user_input>
{{USER_INPUT}}
</user_input>

Process the user input to identify key information such as:
1. Available ingredients or recipe name
2. Number of servings (if specified)
3. Dietary restrictions or preferences
4. Flavor preferences
5. Allergies or ingredient exclusions
6. Preferred cuisines
7. Texture preferences
8. Available cooking time
9. Nutritional goals
10. Cooking method preferences

If any of this information is missing, make reasonable assumptions based on the provided input.

Next, create a comprehensive recipe that addresses the user's requirements. Your recipe should include the following components:

1. Recipe Name: Create an appealing name for the dish.

2. Ingredients List: Provide a detailed list of ingredients with precise measurements. Ensure that the ingredients align with the user's preferences, restrictions, and available items.

3. Create detailed cooking instructions, including preparation and cooking times. Include a timer for each major step in the cooking process.

4. Nutrition Information: Provide an estimated breakdown of key nutritional values per serving, such as calories, protein, carbohydrates, fat, fiber, and any other relevant nutrients based on the user's goals.

5. Interesting Facts: Include 1-2 interesting facts about the dish, its ingredients, or its cultural significance.

6. Similar Dish Suggestions: Recommend 2-3 similar dishes that the user might enjoy based on their preferences.

Format your output in JSON string as follows without any additional text:

{
  "recipe_detail": {
    "name": "[Recipe Name]",
    "ingredients": "[List of ingredients with measurements as array of objects]",
    "instructions": "[{"step": number, "instruction": 'instruction', timer: 'number and mins/hrs information'}]",
    "nutrition": "{"calories: "Nutrition Value Nutrition Unit" like wise for protein, carbohydrates, fat, fiber}",
    "facts": "[1-2 interesting facts]",
    "similar_dishes": "[2-3 similar dish suggestions]"
  }
}


Special considerations:
1. If the user has specified dietary restrictions (e.g., vegetarian, vegan, gluten-free), ensure that all ingredients and cooking methods comply with these restrictions.
2. If the user has mentioned allergies or ingredient exclusions, double-check that none of these items are included in the recipe.
3. Adapt the recipe complexity and cooking time to match the user's available time and cooking method preferences.
4. If the user has specified nutritional goals, try to align the recipe with these objectives as much as possible.
5. Be creative and flexible in your approach, especially if the user has limited ingredients or specific constraints.
`

export const RECIPE_SUGGESTION_PROMPT = `You are a sophisticated cooking assistant AI designed to help users generate comprehensive recipe suggestions as a list. Your task is to create a suggestion list of recipes based on the user's input. Follow these instructions carefully:

1. Process the user input:
Read the following user input carefully:
<user_input>
{{USER_INPUT}}
</user_input>

2. Extract relevant information:
Analyze the user input to identify key details such as:
- Available ingredients
- Desired recipe name or type
- Number of servings
- Dietary restrictions
- Flavor preferences
- Allergies
- Ingredient exclusions
- Preferred cuisines
- Texture preferences
- Available cooking time
- Nutritional goals
- Cooking method preferences

3. Generate recipe suggestions:
Based on the extracted information, create a list of 6 to 9 recipe suggestions. For each recipe, consider the following:
- Ensure it aligns with the user's dietary restrictions and allergies
- Incorporate available ingredients when possible
- Match the desired flavor profile and cuisine preferences
- Adhere to texture preferences and cooking method preferences
- Fit within the specified cooking time
- Meet nutritional goals if mentioned

4. Format your output in JSON:
Present your recipe_detail in the following format, without any additional text:

{
    "recipe_suggestions": [
        {
            "id": "[recipe-name]",
            "name": "[Recipe Name]",
            "description": "[Brief description of the dish]",
            "key_ingredients": "[List key ingredients as array]",
            "cooking_time": "[Estimated cooking time]",
            "difficulty": "[Easy/Medium/Hard]",
            "cuisine": "[Cuisine type]"
        }
    ]
}

5. Special considerations:
- If the user provides a specific recipe name, prioritize variations of that recipe in your suggestions.
- If certain ingredients are excluded, ensure none of the suggested recipes contain those ingredients.
- If nutritional goals are mentioned, briefly note how each recipe aligns with those goals.
- If the user's input is vague or lacks specific details, use your culinary knowledge to make reasonable assumptions and provide diverse suggestions.
`
export const REGENERATE_WITH_ALTERNATE_INGREDIENTS = `You are a cooking assistant tasked with modifying a recipe by replacing an ingredient with an alternative. The original recipe is provided in JSON format, along with the ingredient to be replaced and its alternative. Your job is to regenerate the recipe with the substitution and provide the updated recipe in the same JSON format.
Here is the original recipe JSON:
<recipe_json>
{{RECIPE_JSON}}
</recipe_json>

The ingredient to be replaced is:
<ingredient_to_replace>{{INGREDIENT_TO_REPLACE}}</ingredient_to_replace>

The alternative ingredient is:
<alternative_ingredient>{{ALTERNATIVE_INGREDIENT}}</alternative_ingredient>

Follow these steps to modify the recipe:

1. Carefully review the original recipe JSON.
2. Identify the ingredient to be replaced in the ingredients list.
3. Replace the specified ingredient with the alternative ingredient, adjusting quantities if necessary to maintain the recipe's balance.
4. Review and modify the instructions to accommodate the ingredient change, if needed.
5. Update the nutrition information to reflect the change in ingredients, if possible.
6. Modify the "facts" section to include information about the ingredient substitution, if relevant.
7. Adjust the "similar_dishes" suggestions if the substitution significantly changes the nature of the dish.

When regenerating the recipe, keep the following guidelines in mind:
- Maintain the overall structure and style of the original recipe.
- Ensure that the alternative ingredient works well with the other ingredients and cooking methods.
- If the substitution requires significant changes to the recipe, make sure to update all relevant sections accordingly.

4. Format your output in JSON:
Present your recipe_detail in the following format, without any additional text:

{
  "recipe_detail": {
    "name": "[Recipe Name]",
    "ingredients": "[List of ingredients with measurements as array of objects]",
    "instructions": "[{"step": number, "instruction": 'instruction', timer: 'number and mins/hrs information'}]",
    "nutrition": "{"calories: "Nutrition Value Nutrition Unit" like wise for protein, carbohydrates, fat, fiber}",
    "facts": "[1-2 interesting facts]",
    "similar_dishes": "[2-3 similar dish suggestions]"
  }
}

Ensure that your response is well-formatted and maintains the JSON structure. Double-check that all necessary modifications have been made to accommodate the ingredient substitution.
`

export const TYPES = {
    'RECIPE_SUGGESTION': 'suggestion',
    'GENERATE_RECIPE': 'recipe',
    'REGENERATE_WITH_ALTERNATE_INGREDIENTS': 'regenerate_with_alternate_ingredients'
}

export const ingredients = [
    // Indian
    { value: "rice", label: "Rice" },
    { value: "coconut", label: "Coconut" },
    { value: "tamarind", label: "Tamarind" },
    { value: "curry_leaves", label: "Curry Leaves" },
    { value: "mustard_seeds", label: "Mustard Seeds" },
    { value: "urad_dal", label: "Urad Dal" },
    { value: "chana_dal", label: "Chana Dal" },
    { value: "turmeric", label: "Turmeric" },
    { value: "asafoetida", label: "Asafoetida (Hing)" },
    { value: "green_chilies", label: "Green Chilies" },
    { value: "ginger", label: "Ginger" },
    { value: "tomatoes", label: "Tomatoes" },
    { value: "idli_rice", label: "Idli Rice" },
    { value: "sambar_powder", label: "Sambar Powder" },
    { value: "rasam_powder", label: "Rasam Powder" },
    { value: "jaggery", label: "Jaggery" },
    { value: "fenugreek_seeds", label: "Fenugreek Seeds" },
    { value: "black_pepper", label: "Black Pepper" },
    { value: "red_chilies", label: "Red Chilies" },
    { value: "toor_dal", label: "Toor Dal" },
    { value: "wheat_flour", label: "Wheat Flour" },
    { value: "chickpeas", label: "Chickpeas (Chole)" },
    { value: "paneer", label: "Paneer" },
    { value: "ghee", label: "Ghee" },
    { value: "cumin_seeds", label: "Cumin Seeds" },
    { value: "coriander_seeds", label: "Coriander Seeds" },
    { value: "garam_masala", label: "Garam Masala" },
    { value: "cardamom", label: "Cardamom" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "cloves", label: "Cloves" },
    { value: "onions", label: "Onions" },
    { value: "garlic", label: "Garlic" },
    { value: "yogurt", label: "Yogurt" },
    { value: "amchur", label: "Amchur (Dried Mango Powder)" },
    { value: "kasoori_methi", label: "Kasoori Methi (Dried Fenugreek Leaves)" },
    { value: "basmati_rice", label: "Basmati Rice" },
    { value: "kidney_beans", label: "Red Kidney Beans (Rajma)" },
    { value: "fennel_seeds", label: "Fennel Seeds" },
    { value: "bay_leaves", label: "Bay Leaves" },
    { value: "mustard_oil", label: "Mustard Oil" },
    // Italian
    { value: "olive_oil", label: "Olive Oil" },
    { value: "basil", label: "Basil" },
    { value: "mozzarella", label: "Mozzarella" },
    { value: "parmesan", label: "Parmesan" },
    { value: "pasta", label: "Pasta" },
    { value: "balsamic_vinegar", label: "Balsamic Vinegar" },
    { value: "prosciutto", label: "Prosciutto" },
    { value: "pancetta", label: "Pancetta" },
    { value: "oregano", label: "Oregano" },
    { value: "pine_nuts", label: "Pine Nuts" },
    { value: "ricotta", label: "Ricotta" },
    { value: "semolina", label: "Semolina" },
    { value: "capers", label: "Capers" },
    { value: "anchovies", label: "Anchovies" },
    { value: "arborio_rice", label: "Arborio Rice" },
    { value: "porcini_mushrooms", label: "Porcini Mushrooms" },
    { value: "pecorino", label: "Pecorino" },
    { value: "polenta", label: "Polenta" },
    // Mexican
    { value: "corn_tortillas", label: "Corn Tortillas" },
    { value: "beans", label: "Beans" },
    { value: "avocado", label: "Avocado" },
    { value: "cilantro", label: "Cilantro" },
    { value: "jalapenos", label: "Jalapeños" },
    { value: "limes", label: "Limes" },
    { value: "queso_fresco", label: "Queso Fresco" },
    { value: "chili_powder", label: "Chili Powder" },
    { value: "cumin", label: "Cumin" },
    { value: "epazote", label: "Epazote" },
    { value: "tomatillos", label: "Tomatillos" },
    { value: "chipotle", label: "Chipotle" },
    { value: "masa_harina", label: "Masa Harina" },
    { value: "nopales", label: "Nopales" },
    { value: "chorizo", label: "Chorizo" },
    { value: "cotija_cheese", label: "Cotija Cheese" },
    { value: "mexican_oregano", label: "Mexican Oregano" },
    { value: "poblano_peppers", label: "Poblano Peppers" },
    // French
    { value: "butter", label: "Butter" },
    { value: "cream", label: "Cream" },
    { value: "baguette", label: "Baguette" },
    { value: "dijon_mustard", label: "Dijon Mustard" },
    { value: "tarragon", label: "Tarragon" },
    { value: "shallots", label: "Shallots" },
    { value: "herbes_de_provence", label: "Herbes de Provence" },
    { value: "cognac", label: "Cognac" },
    { value: "white_wine", label: "White Wine" },
    { value: "gruyere", label: "Gruyère" },
    { value: "creme_fraiche", label: "Crème Fraîche" },
    { value: "leeks", label: "Leeks" },
    { value: "thyme", label: "Thyme" },
    { value: "chives", label: "Chives" },
    { value: "foie_gras", label: "Foie Gras" },
    { value: "truffle", label: "Truffle" },
    { value: "escargot", label: "Escargot" },
    { value: "duck_fat", label: "Duck Fat" },
    { value: "charcuterie", label: "Charcuterie" },
    { value: "fines_herbes", label: "Fines Herbes" },
    // Chinese
    { value: "soy_sauce", label: "Soy Sauce" },
    { value: "sesame_oil", label: "Sesame Oil" },
    { value: "rice_vinegar", label: "Rice Vinegar" },
    { value: "five_spice_powder", label: "Five Spice Powder" },
    { value: "hoisin_sauce", label: "Hoisin Sauce" },
    { value: "oyster_sauce", label: "Oyster Sauce" },
    { value: "szechuan_peppercorns", label: "Szechuan Peppercorns" },
    { value: "star_anise", label: "Star Anise" },
    { value: "chili_oil", label: "Chili Oil" },
    { value: "green_onions", label: "Green Onions" },
    { value: "bamboo_shoots", label: "Bamboo Shoots" },
    { value: "dried_shiitake_mushrooms", label: "Dried Shiitake Mushrooms" },
    { value: "shaoxing_wine", label: "Shaoxing Wine" },
    { value: "bean_paste", label: "Bean Paste" },
    { value: "wood_ear_mushrooms", label: "Wood Ear Mushrooms" },
    { value: "lotus_root", label: "Lotus Root" },
    { value: "bok_choy", label: "Bok Choy" },
    // Thai
    { value: "fish_sauce", label: "Fish Sauce" },
    { value: "coconut_milk", label: "Coconut Milk" },
    { value: "lemongrass", label: "Lemongrass" },
    { value: "thai_basil", label: "Thai Basil" },
    { value: "kaffir_lime_leaves", label: "Kaffir Lime Leaves" },
    { value: "galangal", label: "Galangal" },
    { value: "palm_sugar", label: "Palm Sugar" },
    { value: "bird's_eye_chili", label: "Bird's Eye Chili" },
    { value: "shrimp_paste", label: "Shrimp Paste" },
    { value: "thai_eggplant", label: "Thai Eggplant" },
    { value: "curry_paste", label: "Curry Paste" },
    { value: "rice_noodles", label: "Rice Noodles" },
    { value: "holy_basil", label: "Holy Basil" },
    { value: "makrut_lime", label: "Makrut Lime" },
    { value: "coconut_cream", label: "Coconut Cream" },
    { value: "green_papaya", label: "Green Papaya" },
    { value: "pandan_leaves", label: "Pandan Leaves" },
    { value: "long_beans", label: "Long Beans" },
    { value: "nam_pla", label: "Nam Pla (Thai Fish Sauce)" },
  ];