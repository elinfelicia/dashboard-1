import axios from 'axios';

export async function fetchRandomCocktail() {
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  try {
    const response = await axios.get(apiUrl);
    const cocktailData = response.data.drinks[0];
    return cocktailData;
  } catch (error) {
    console.error("Error fetching cocktail data:", error);
    throw error;
  }
}

export function displayCocktail(cocktailData) {
  const drinkContainer = document.querySelector(".drink-display");


  const cocktailImage = document.createElement("img");
  cocktailImage.src = cocktailData.strDrinkThumb;
  cocktailImage.alt = cocktailData.strDrink;
  cocktailImage.classList.add("drink-img")
  drinkContainer.appendChild(cocktailImage);

  const cocktailTitle = document.createElement("h3");
  cocktailTitle.textContent = cocktailData.strDrink;

  const cocktailIngredients = document.createElement("p");
  const ingredients = getIngredients(cocktailData);
  cocktailIngredients.textContent = `Ingredients: ${ingredients}`;

  const cocktailInstructions = document.createElement("p");
  cocktailInstructions.textContent = `Instructions: ${cocktailData.strInstructions}`;

  drinkContainer.appendChild(cocktailTitle);
  drinkContainer.appendChild(cocktailIngredients);
  drinkContainer.appendChild(cocktailInstructions);
}

function getIngredients(cocktailData) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktailData[`strIngredient${i}`];
    const measure = cocktailData[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients.join(", ");
}
