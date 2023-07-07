// food array
let foods = [];

// save button
const saveBtn = document.getElementById("save_food");
// food list
const foodList = document.querySelector(".food_list");

// check if data exists in local storage
if (localStorage.getItem("foodsCollection")) {
  // retrieve and parse the data from local storage
  foods = JSON.parse(localStorage.getItem("foodsCollection"));
}

// food push from input
saveBtn.onclick = () => {
  // check if not in food array
  const inputFood = saveBtn.previousElementSibling.value.trim();
  if (inputFood && !foods.includes(inputFood)) {
    foods.push(inputFood);

    // send data to local storage
    dataSend();

    // show data
    showFoods();
  } else if (inputFood && foods.includes(inputFood)) {
    alert(`${inputFood} already added!`);
  }

  // clear input after click
  saveBtn.previousElementSibling.value = "";

  //   make input red if empty
  if (!inputFood) {
    saveBtn.previousElementSibling.style.borderColor = "red";
  }
};

function dataSend() {
  // Send Data to Local Storage
  localStorage.setItem("foodsCollection", JSON.stringify(foods));
}

// show foods in list
function showFoods() {
  // Getting data from local storage
  const foodJsonGetting = JSON.parse(localStorage.getItem("foodsCollection"));

  if (foodJsonGetting) {
    // add food name with html
    let foodListItems = "";
    foodJsonGetting.reverse().forEach((item) => {
      // add col class to item if item more than 3
      let itemCols = foods.length > 4 ? "col-4" : "";
      if (foods.length > 4) {
        foodList.classList.add("d-flex");
      }

      foodListItems += `<li class="${itemCols}">${item}</li>`;
    });
    foodList.innerHTML = foodListItems;
  }

  //   Show no data if no data
  if (foods.length == 0) {
    foodList.innerHTML = "<h2>No data found!<h2>";
  }
}
showFoods();
