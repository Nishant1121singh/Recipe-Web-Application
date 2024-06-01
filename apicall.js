const btn = document.querySelector("button");
const input = document.querySelector("input");
let recipeContainer = document.querySelector(".cover");
const recipeDetails = document.querySelector(".recipeDetails");
const recipeContent = document.querySelector(".recipeContent");
const closeBtn = document.querySelector(".recipeCloseBtn");
const container = document.querySelector(".container")

async function getdata(query) {
    recipeContainer.innerHTML = "Loading......";
    recipeContainer.style.fontSize = "35px";
    recipeContainer.style.fontWeight = "700";
    try {
        const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        let data = await promise.json();
        recipeContainer.innerHTML = "";
        recipeContainer.style.fontSize = "";
        recipeContainer.style.fontWeight = "";
        data.meals.forEach((meal) => {
            const recipecon = document.createElement("div");
            recipecon.classList.add("recipe");
            recipecon.innerHTML = `
        <img src=${meal.strMealThumb}>
        <h3>${meal.strMeal}</h3>
        <p> <span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
       `
            const button = document.createElement("button");
            button.textContent = "View Recipe";
            recipecon.appendChild(button);
            recipeContainer.appendChild(recipecon);

            // Adding addEventListener to recipe butoon
            button.addEventListener("click", () => {
                openRcipePopup(meal)
            })
        });
    }
    catch (error) {
        recipeContainer.innerHTML = "<h2 class='typo'>Error In Fetching Recipe</h2>"

    }
}
// To fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientList;
}
const openRcipePopup = (meal) => {
    recipeContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}<h2>
    <h3 class="ing">Ingredents</h3>
    <ul class="ingredients">${fetchIngredients(meal)}</ul>
    <div  class="instructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
   `

    recipeContent.parentElement.style.display = "block";
}
closeBtn.addEventListener("click", () => {
    recipeContent.parentElement.style.display = "none";
})
btn.addEventListener("click", function (e) {
    e.preventDefault()
    let = fetchRecipe = input.value.trim()
    if (!fetchRecipe) {
        recipeContainer.innerHTML = "<h2 class='typo'>Please Type The Meal In The Search Box</h2>"
        return;
    }
    getdata(fetchRecipe)
})

