//--------------------Task 1--------------------
function areaNormal(length, width) {
  return length * width;
}

console.log(areaNormal(5, 3));
console.log(areaNormal(10, 2));
console.log(area(7, 4));

const areaArrow = (length, width) => length * width;

console.log(areaArrow(5, 3));
console.log(areaArrow(10, 2));
console.log(areaArrow(7, 4));

//--------------------Task-2------------------
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet("Priya"));
console.log(greet("Aarav"));
console.log(greet());

console.log(greet(null));

//--------------------Task-3------------------
const cToF = celsius => celsius * 9/5 + 32;

console.log(cToF(0));
console.log(cToF(100));
console.log(cToF(37));
console.log(cToF(45));

//--------------------Bonus Task------------------
function double(n) {
  return n * 2;
}

console.log(double(2));
console.log(double(5));
console.log(double(10));

let total = 0;

function addToTotal(n) {
  total += n;
  return total;
}

console.log(addToTotal(2));
console.log(addToTotal(5));
console.log(addToTotal(10));

/* Pure functions are easier to reason about because
they always give the same output for the same input 
and have no side effects.*/

//---------------------Practice Task------------------
//--------------------Task-1------------------
const kmToMiles = km => km * 0.621;

console.log(kmToMiles(10));
console.log(kmToMiles(50));

//--------------------Task-2------------------
const gstAmount = (price, rate = 18) => (price * rate) / 100;

console.log(gstAmount(1000));
console.log(gstAmount(500, 5));

//--------------------Task-3------------------
const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Anamika", "Sharma"));
console.log(fullName("Akanksha", "Sharma"));

//--------------------Task-4------------------
const isAdult = age => age >= 18;

console.log(isAdult(20));
console.log(isAdult(15));