// Task 1
const message = document.querySelector("#message");

message.textContent = "Changed using textContent";

message.innerHTML = "Changed using <strong>innerHTML</strong>";

message.textContent = "Back to plain text";


// Task 2
const items = document.querySelectorAll("#item-list li");

for (let i = 0; i < items.length; i++) {
  if (i % 2 === 0) {
    items[i].classList.add("even");
  }
}


// Task 3
const button = document.createElement("button");

button.textContent = "Click me";

button.id = "dynamic-btn";

button.classList.add("btn");

document.body.append(button);


// Task 4
const products = [
  { name: "Laptop", price: 60000 },
  { name: "Phone", price: 25000 },
  { name: "Headphones", price: 3000 }
];

const productsDiv = document.querySelector("#products");

for (const product of products) {

  const card = document.createElement("div");
  card.classList.add("card");

  const h3 = document.createElement("h3");
  h3.textContent = product.name;

  const p = document.createElement("p");
  p.textContent = `₹${product.price}`;

  card.append(h3, p);

  productsDiv.append(card);
}