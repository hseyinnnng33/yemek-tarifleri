const search = document.querySelector("#search")
const submit = document.querySelector("#submit")
const random = document.querySelector("#random")
const mealsEl = document.querySelector("#meals")
const resultHeading = document.querySelector("#result-heading")
const singleMeal = document.querySelector("#single-meal")
const btnAra = document.querySelector(".search-btn")

searchMeal()
async function searchMeal(){
    singleMeal.innerHTML = ""
    mealsEl.innerHTML = "";
    const term = search.value;

    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        const data = await res.json();
        
        
        if(data.meals == null){
            resultHeading.innerHTML = `<p>Üzgünüz Aradıgınız Şeyi Bulamadık</p>`
        }
        else{
            data.meals.slice(0,18).forEach((meal)=>{
                mealsEl.innerHTML +=`
                    <div class ="meal">
                    <img src= ${meal.strMealThumb}>
                    <div class = "meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                    `
            })
                
            const mealInfo = document.querySelectorAll(".meal-info")
            mealInfo.forEach((item)=>{
                item.addEventListener("click", function(){
                    const id = item.getAttribute("data-mealID")
                    getMealId(id)
                })
            })

        }
        search.value = "";
        console.log(data)
    }
    catch(error){
        alert("Geçersiz Deger")
    }
}

async function getMealId(mealId){
    try{    
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const data = await res.json()
        const meal = data.meals[0]
        addMeal(meal)
    }
    catch{
        alert("Geçersiz Deger")
    }
}

async function getRandom(){
    mealsEl.innerHTML = ""
    resultHeading.innerHTML =""

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    const data = await res.json()
    const meal = data.meals[0]

    addMeal(meal)
}

function addMeal(meal){
    const ingredients = []
    console.log(ingredients)

    for(let i = 1; i< 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        }
        else{
            break;
        }
    }

    console.log(ingredients)
    
    mealsEl.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}">
    <div class="single-meal-info">
      <p>${meal.strCategory}</p>
      <p>Country: ${meal.strArea}</p>
    </div>
    <div class="main">
    <a href="${meal.strYoutube}" target="_blank">Recipe video <i class="fa-brands fa-youtube"></i></a>
      <p>${meal.strInstructions}</p>
      <h2>Materials</h2>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
      </ul>
    </div>
  </div>
`;

}

submit.addEventListener("keydown", function (event) {
    if(event.key == "Enter"){
        event.preventDefault();
        searchMeal();
    }
  
});

random.addEventListener("click", getRandom)

btnAra.addEventListener("click", function(e){
    event.preventDefault();
    searchMeal()
})
