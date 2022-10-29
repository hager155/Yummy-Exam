let userNameAlert 
let userEmailAlert 
let userPhoneAlert 
let userAgeAlert 
let userpasswordAlert 
let userRepasswordAlert 
let userName
let userEmail
let userPhone
let userAge
let userPassword
let userRePassword

var nvWidth = 0,
  isTrue = !0,
  before = [];

$(".header-menu").click(function () {
  isTrue
    ? ($(".menu").addClass("open-menu").removeClass("close-menu"),
      (nvWidth = $(".menu").width() - 10),
      $(".header").css("left", nvWidth),
      $(".fa-align-justify").toggleClass("fa-times"),
      $(".menu .item1").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1100
      ),
      $(".menu .item2").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1200
      ),
      $(".menu .item3").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1300
      ),
      $(".menu .item4").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1400
      ),
      $(".menu .item5").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1500
      ),
      $(".menu .item6").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1600
      ),
      (isTrue = !isTrue))
    : ($(".menu").addClass("close-menu").removeClass("open-menu"),
      $(".fa-align-justify").toggleClass("fa-times"),
      $(".header").css("left", 0),
      $(".menu li").animate(
        {
          opacity: "0",
          paddingTop: "500px",
        },
        500
      ),
      (isTrue = !isTrue));
});

var isSearchTrue = !0;

$(".strip-search").click(function () {
  isSearchTrue
    ? ($(".search").addClass("open-menu").removeClass("close-search"),
      $(".fa-search").toggleClass("fa-times"),
      $(".search-input").animate(
        {
          top: "49%",
        },
        1500,
        function () {
          $(".search-input").animate(
            {
              top: "50%",
            },
            250
          );
        }
      ),
      (isSearchTrue = !isSearchTrue))
    : ($(".search").addClass("close-search").removeClass("open-menu"),
      $(".fa-search").toggleClass("fa-times"),
      $(".search-input").animate({
        top: "300%",
      }),
      (isSearchTrue = !isSearchTrue));
});

var row = document.getElementById("rowData");

search("");
async function search(a) {
  $(".loading-container").fadeIn(100);

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${a}`)
    .then((response) => response.json())
    .then((response) => {
      displayMeals(response.meals);
      $(".loading-container").fadeOut(400);

      $(".loading-screen").fadeOut(1000, () => {
        $("body").css("overflow", "visible");
      });
    });
}

function showCategory() {
  let category = "";
  for (var i = 0; i < before.length; i++)
    category += `
    <div class="col-md-6 col-lg-3 my-3  shadow">
        <div class="show shadow rounded position-relative">
            <div onclick="filterByCategory('${
              before[i].strCategory
            }')" class="post">
                <img src='${
                  before[i].strCategoryThumb
                }' class="w-100 rounded" />
                <div class="layer d-flex flex-wrap  align-items-center w-100 h-100 position-absolute text-center fw-bolder  ">
                    <div class="info p-2">
                        <h2>${before[i].strCategory}</h2>
                        <p>${before[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  row.innerHTML = category;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}

// displayArea

function displayArea() {
  let h = "";
  for (var i = 0; i < before.length; i++)
    h += `
    <div class="col-md-6 col-lg-3 my-3 ps-2  shadow">
        <div class="show shadow rounded position-relative">
            <div onclick=(filterByArea('${before[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${before[i].strArea}</h2>
            </div>
        </div>
    </div>`;
  row.innerHTML = h;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}
// displayIngredients
function displayIngredients() {
  let s = "";
  for (var i = 0; i < before.length; i++)
    s += `
    <div class="col-md-6 col-lg-3 my-3 ps-2  shadow">
        <div onclick="displayMeal('${
          before[i].strIngredient
        }')" class="show shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid food fa-3x"></i>
                <h2 class="text-white">${before[i].strIngredient}</h2>
                <p class="text-white">${before[i].strDescription
                  .split(" ")
                  .splice(0, 20)
                  .join(" ")}</p>
            </div>
        </div>
    </div>`;
  row.innerHTML = s;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}
// displayMeal
async function displayMeal(name) {
  $(".loading-container").fadeIn(100);
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  meal = await meal.json();
  displayMeals(meal.meals);
  $(".loading-container").fadeOut(500);
}
// displayMeals
function displayMeals(before) {
  let meals = "";
  for (let i = 0; i < before.length; i++) {
    meals += `
        <div class="col-md-6 col-lg-3 my-3 ps-2  shadow">
            <div onclick="getMeal('${before[i].idMeal}')" class="show shadow rounded position-relative">
                <div class="post ">
                    <img src='${before[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex  flex-wrap align-items-center ">
                        <div class="info p-2">
                            <h2>${before[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  }
  row.innerHTML = meals;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}
// getMeal
async function getMeal(mealID) {
  $(".loading-container").fadeIn(100);
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  meal = await meal.json();
  displayMeal(meal.meals[0]);
  $(".loading-container").fadeOut(500);
}
// displayMeal
function displayMeal(meal) {
  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  let tagsStr = "";
  for (let i = 0; i < tags?.length; i++) {
    tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`;
  }

  let str = `
    <div class="col-md-4 ps-2 text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 ps-2 text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex flex-wrap " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex flex-wrap " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`;
  row.innerHTML = str;
  document.getElementById("recipes").innerHTML = recipes;
  document.getElementById("tags").innerHTML = tagsStr;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}
// getCategories
async function getCategories(listed) {
  x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listed}`);
  x = await x.json();
  return x;
}
// lestedByLetter
async function lestedByLetter(letter) {
  if (letter) {
    $(".loading-container").fadeIn(100);
    let meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    meals = await meals.json();
    if (meals.meals) {
      displayMeals(meals.meals);
    }
    $(".loading-container").fadeOut(100);
  }
}
// filterByCategory
async function filterByCategory(category) {
  $(".loading-container").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  meals = await meals.json();
  displayMeals(meals.meals);
  $(".loading-container").fadeOut(500);
}
// filterByArea
async function filterByArea(area) {
  $(".loading-container").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  meals = await meals.json();
  displayMeals(meals.meals.slice(0, 20));
  $(".loading-container").fadeOut(500);
}

$(".navbar-item a").click(async (e) => {
  let listed = e.target.getAttribute("data-list");

  document.getElementById("search").innerHTML = "";
  row.innerHTML = "";
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );

  if (listed == "contact") {
    row.innerHTML = `
        <section id="contact" class="container ps-2 w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row ">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow ce" onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

		<button type="submit" disabled id="submitBtn" class="btn btn-success my-3">Submit</button>
		</div>

	</section>`;

    (userName = document.querySelector("#name")),
      (userEmail = document.querySelector("#email")),
      (userPhone = document.querySelector("#phone")),
      (userAge = document.querySelector("#age")),
      (userPassword = document.querySelector("#password")),
      (userRePassword = document.querySelector("#rePassword")),
      (userNameAlert = document.querySelector("#namealert")),
      (userEmailAlert = document.querySelector("#emailalert")),
      (userPhoneAlert = document.querySelector("#phonealert")),
      (userAgeAlert = document.querySelector("#agealert")),
      (userpasswordAlert = document.querySelector("#passwordalert")),
      (userRepasswordAlert = document.querySelector("#repasswordalert"));

    userName.addEventListener("focus", () => {
      nameToached = true;
    });
    userEmail.addEventListener("focus", () => {
      emailToached = true;
    });
    userPhone.addEventListener("focus", () => {
      phoneToached = true;
    });
    userAge.addEventListener("focus", () => {
      ageToached = true;
    });
    userPassword.addEventListener("focus", () => {
      passwordToached = true;
    });
    userRePassword.addEventListener("focus", () => {
      repasswordToached = true;
    });
  }
  if (listed == "search") {
    row.innerHTML = "";
    document.getElementById("search").innerHTML = `
        <div class="row">
				<div class="col-md-6 my-3 "><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6 my-3">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`;

    $("#searchInput").keyup((e) => {
      search(e.target.value);
    });
    $("#letter").keyup((e) => {
      lestedByLetter(e.target.value);
    });

    $("#letter").on("input", function () {
      if (this.value.length > 1) this.value = this.value.slice(0, 1);
    });
  }

  let click_event = new CustomEvent("click");
  document.querySelector(".header-menu").dispatchEvent(click_event);

  let x;

  if (listed == "categories") {
    $(".loading-container").fadeIn(100);

    x = await getCategories(listed + ".php");
    before = x.categories.splice(0, 20);
    showCategory();
    $(".loading-container").fadeOut(500);
  } else if (listed == "a") {
    $(".loading-container").fadeIn(100);

    x = await getCategories("list.php?a=list");
    before = x.meals.splice(0, 20);
    displayArea();
    $(".loading-container").fadeOut(500);
  } else if (listed == "i") {
    $(".loading-container").fadeIn(100);

    x = await getCategories("list.php?i=list");
    before = x.meals.splice(0, 20);
    displayIngredients();
    $(".loading-container").fadeOut(500);
  }
});

$(document).scroll((e) => {
  if ($(document).scrollTop()) {
    $(".maro").css("backgroundColor", "#0D0D0D");
  }
});

let nameToached = false,
  emailToached = false,
  phoneToached = false,
  ageToached = false,
  passwordToached = false,
  repasswordToached = false;

function validation() {
  if (nameToached) {
    if (userNameValid()) {
      userName.classList.remove("is-invalid");
      userName.classList.add("is-valid");
      userNameAlert.classList.replace("d-block", "d-none");
      userNameAlert.classList.replace("d-block", "d-none");
    } else {
      userName.classList.replace("is-valid", "is-invalid");
      userNameAlert.classList.replace("d-none", "d-block");
    }
  }

  if (emailToached) {
    if (userEmailValid()) {
      userEmail.classList.remove("is-invalid");
      userEmail.classList.add("is-valid");
      userEmailAlert.classList.replace("d-block", "d-none");
      userEmailAlert.classList.replace("d-block", "d-none");
    } else {
      userEmail.classList.replace("is-valid", "is-invalid");
      userEmailAlert.classList.replace("d-none", "d-block");
    }
  }

  if (phoneToached) {
    if (userPhoneValid()) {
      userPhone.classList.remove("is-invalid");
      userPhone.classList.add("is-valid");
      userPhoneAlert.classList.replace("d-block", "d-none");
      userPhoneAlert.classList.replace("d-block", "d-none");
    } else {
      userPhone.classList.replace("is-valid", "is-invalid");
      userPhoneAlert.classList.replace("d-none", "d-block");
    }
  }

  if (ageToached) {
    if (userAgeValid()) {
      userAge.classList.remove("is-invalid");
      userAge.classList.add("is-valid");
      userAgeAlert.classList.replace("d-block", "d-none");
      userAgeAlert.classList.replace("d-block", "d-none");
    } else {
      userAge.classList.replace("is-valid", "is-invalid");
      userAgeAlert.classList.replace("d-none", "d-block");
    }
  }

  if (passwordToached) {
    if (userPasswordValid()) {
      userPassword.classList.remove("is-invalid");
      userPassword.classList.add("is-valid");
      userpasswordAlert.classList.replace("d-block", "d-none");
      userpasswordAlert.classList.replace("d-block", "d-none");
    } else {
      userPassword.classList.replace("is-valid", "is-invalid");
      userpasswordAlert.classList.replace("d-none", "d-block");
    }
  }

  if (repasswordToached) {
    if (userRePasswordValid()) {
      userRePassword.classList.remove("is-invalid");
      userRePassword.classList.add("is-valid");
      userRepasswordAlert.classList.replace("d-block", "d-none");
      userRepasswordAlert.classList.replace("d-block", "d-none");
    } else {
      userRePassword.classList.replace("is-valid", "is-invalid");
      userRepasswordAlert.classList.replace("d-none", "d-block");
    }
  }

  if (
    userNameValid() &&
    userEmailValid() &&
    userPhoneValid() &&
    userAgeValid() &&
    userPasswordValid() &&
    userRePasswordValid()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", "true");
  }
}

function userNameValid() {
  return /^[a-zA-Z ]+$/.test(userName.value);
}

function userEmailValid() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    userEmail.value
  );
}

function userPhoneValid() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    userPhone.value
  );
}

function userAgeValid() {
  return /^[1-9][0-9]?$|^100$/.test(userAge.value);
}

function userPasswordValid() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value);
}

function userRePasswordValid() {
  return userPassword.value == userRePassword.value;
}
