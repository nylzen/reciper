const popularRecipe = document.getElementById("popular");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// Base URL Api
const baseURL = "https://www.themealdb.com/api/json/v1/1/";

// events listeners

// random popular recipes
popularRecipe.addEventListener("click", getMealRecipe);
// close modal
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get random popular recipe
async function getMeals() {
  try {
    const res = await fetch(`${baseURL}random.php`, {});
    const json = await res.json();
    const html = json.meals
      .map((recipe) => {
        return `
        <div class = "meal-item" data-id = "${recipe.idMeal}">
            <div class = "meal-img">
                <img src = "${recipe.strMealThumb}" alt = "food">
            </div>
            <div class = "meal-name">
                <h3>${recipe.strMeal}</h3>
                <a href = "#" class = "recipe-btn">Get Recipe</a>
            </div>
        </div>
    `;
      })
      .join("");
    popularRecipe.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.log(error);
  }
}

getMeals();
getMeals();
getMeals();

// get recipe
async function getMealRecipe(e) {
  e.preventDefault();
  try {
    if (e.target.classList.contains("recipe-btn")) {
      let mealItem = e.target.parentElement.parentElement;
      console.log(mealItem);
      const res = await fetch(
        `${baseURL}lookup.php?i=${mealItem.dataset.id}`,
        {}
      );
      const json = await res.json();
      printModalRecipe(json.meals);
    }
  } catch (error) {
    console.log(error.message);
  }
}

function printModalRecipe(meal) {
  meal = meal[0];
  let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
