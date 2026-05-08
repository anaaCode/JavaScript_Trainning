// Task 1 Random Background Color
const colorBtn = document.querySelector("#color-btn");

colorBtn.addEventListener("click", () => {

  const r = Math.floor(Math.random() * 256);

  const g = Math.floor(Math.random() * 256);

  const b = Math.floor(Math.random() * 256);

  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

});


// Task 2 Live Input Validation
const liveName = document.querySelector("#live-name");

liveName.addEventListener("input", () => {

  if (liveName.value.length < 3) {
    liveName.style.borderColor = "red";
  } else {
    liveName.style.borderColor = "green";
  }

});


// Task 3 Sum Form
const sumForm = document.querySelector("#sum-form");

const num1 = document.querySelector("#num1");

const num2 = document.querySelector("#num2");

const result = document.querySelector("#result");

sumForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const sum =
    Number(num1.value) + Number(num2.value);

  result.textContent = `Sum: ${sum}`;

});


// Task 4 Event Delegation
const items = document.querySelector("#items");

items.addEventListener("click", (e) => {

  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
  }

});


// Add 6th item dynamically
const newLi = document.createElement("li");

newLi.textContent = "Pineapple";

items.append(newLi);