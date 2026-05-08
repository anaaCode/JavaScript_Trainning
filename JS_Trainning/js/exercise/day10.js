// Task 1
const title = document.querySelector("#title");

title.textContent = "Hello, Anamika!";
title.style.color = "crimson";
title.style.fontFamily = "Georgia, serif";


// Task 2
const themeBtn = document.querySelector("#theme-btn");

document.body.classList.toggle("dark");
console.log(document.body.classList.contains("dark"));

document.body.classList.toggle("dark");
console.log(document.body.classList.contains("dark"));


// Task 3
const names = ["Priya", "Aarav", "Riya", "Kabir"];

const namesList = document.querySelector("#names-list");

for (let i = 0; i < names.length; i++) {
  const li = document.createElement("li");

  li.textContent = `${i + 1}. ${names[i]}`;

  li.classList.add("name-item");

  namesList.append(li);
}


// Bonus Build a Card
const product = {
  name: "Laptop",
  price: 60000,
  brand: "Dell"
};

const cards = document.querySelector("#cards");

const card = document.createElement("div");
card.classList.add("card");

const h3 = document.createElement("h3");
h3.textContent = product.name;

const p = document.createElement("p");
p.textContent = product.brand;

const span = document.createElement("span");
span.textContent = `₹${product.price}`;

card.append(h3, p, span);

cards.append(card);