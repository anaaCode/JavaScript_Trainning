// Task 1 Click Counter
const counterBtn = document.querySelector("#counter-btn");

const countSpan = document.querySelector("#count");

let count = 0;

counterBtn.addEventListener("click", () => {

  count++;

  countSpan.textContent = count;

  if (count >= 10) {
    counterBtn.textContent = "Stop clicking!";
  }

});


// Task 2 Live Input Preview
const liveInput = document.querySelector("#live-input");

const preview = document.querySelector("#preview");

liveInput.addEventListener("input", () => {

  if (liveInput.value === "") {
    preview.textContent = "Start typing...";
  } else {
    preview.textContent = liveInput.value;
  }

});


// Task 3 Form preventDefault
const regForm = document.querySelector("#reg-form");

const nameField = document.querySelector("#name-field");

const welcome = document.querySelector("#welcome");

regForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const name = nameField.value;

  if (name === "") {
    welcome.textContent = "Please enter your name";
  } else {
    welcome.textContent = `Welcome, ${name}!`;
  }

});


// Bonus Event Delegation
const todoList = document.querySelector("#todo-list");

todoList.addEventListener("click", (e) => {

  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
  }

});


// Bonus Add New LI
const newLi = document.createElement("li");

newLi.textContent = "Study JavaScript";

todoList.append(newLi);