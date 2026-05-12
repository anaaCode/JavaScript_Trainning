 // console.log("welcome");
// marks = 95
// if (marks >= 90) console.log("Grade A");
// else if (marks >= 75) console.log("Grade B");
// else if (marks >= 60) console.log("Grade C");

// else console.log("Grade D");

// if (0) {console.log()};
 

// if ("0") { console.log()}
// if ([]) { console.log()}
// if (null) { console.log() }
// if (NaN) { console.log() }
// if ("false") { console.log()}


// const fruits = ["apple", "banana", "mango"];

// for (let i = 0; i < fruits.length; i++) {
//   console.log(fruits[i]);
// }

// const str = "Priya";

// for (let i = 0; i < str.length; i++) {
//   console.log(str[i]);
// }


// const s = { name: "Aarav", age: 22 };

// const keys = Object.keys(s);

// for (let i = 0; i < keys.length; i++) {
//   console.log(keys[i]);
// }


// for (let i = 0; i < keys.length; i++) {
//   console.log(s[keys[i]]);}

// for (let i = 1; i <= 10; i++) {
//   console.log(`7 x ${i} = ${7 * i}`);
// }


// for (let i = 1; i <= 10; i++) {
//   if (i % 2 !== 0) continue; // skip odd numbers
//   console.log(`7 x ${i} = ${7 * i}`);
// }
// for (let i = 2; i <= 10; i += 2) {
//   console.log(`7 x ${i} = ${7 * i}`);
// }

//------------day6-------------------------
// function add(a, b) { return a + b; }
// console.log(add(5, 3));

// function silent() { console.log("hi"); }
// const x = silent();
// console.log(x);

// const greet = function(name) {
//   return "Hello, " + name;
// };

// console.log(greet("Anamika"));


// const add = (a, b) => {
//   return a + b;
// };
// function addNormal(a, b) {
//   return a + b;
// }


// const add2 = (a, b) => a + b;

// function add2Normal(a, b) {
//   return a + b;
// }


// const square = x => x * x;
// function squareNormal(x) {
//   return x * x;
// }

// const greet = () => "Hello!";

// console.log(add(2, 3));
// console.log(addNormal(2, 3));
// console.log(add2(4,5));
// console.log(add2Normal(4,5));
// console.log(squareNormal(5));

// console.log(square(4));
// console.log(greet());

//----------------------Day10---------------------------
// const title = document.querySelector("#title");

// // Change text
// title.textContent = "Hello, Anamika!";

// // Change text color
// title.style.color = "crimson";

// // Bonus: change font family
// title.style.fontFamily = "Georgia, serif";

// // Grab the button
// const themeBtn = document.querySelector("#theme-btn");

// // Toggle dark class
// document.body.classList.toggle("dark");

// // Toggle again
// document.body.classList.toggle("dark");

// // Check if dark class exists
// console.log(document.body.classList.contains("dark"));



//------------------day12---------------------
// function tryCatchExample() {

//   try {
//     const data = JSON.parse('{"name":"Priya"');

//     console.log(data);
//   } catch (err) {

//     console.log("Couldn't parse:", err.message);
//   }

//   console.log("App keeps running");
// }

// tryCatchExample();



// function divide(a, b) {
//   if (typeof a !== "number" || typeof b !== "number") {
//     throw new Error("Both arguments must be numbers");
//   }
//   if (b === 0) {
//     throw new Error("Cannot divide by zero");
//   }
//   return a / b;
// }

// try {
  
//   console.log(divide(10, 2));
//   console.log(divide(10,0));
//   console.log(divide("Welcome", "Home"));  
  
   
// } catch (err) {
//   console.log("Caught:", err.message);
// }


// export const PI = 3.14;

// export function add(a, b) {
//   return a + b;
// }

// export function subtract(a, b) {
//   return a - b;
// }

// // Or export at the bottom
// function multiply(a, b) {
//   return a * b;
// }

// function divide(a,b){
//   return a /b;
// }

// export {multiply};

// export default divide;
 

// console.log(a);       
// var a = 1;

// console.log
// let b = 2;

// console.log(c);      
// const c = 3;      

// greet();             
// function greet() { console.log("Hi"); }

// var score = 90;
// let level = 5;
// {
//   console.log(mark);
//   let mark = 87;
//   console.log(mark);
//}

// const item = "Laptop";
// const price = 60000;
// const tax = 0.18;

// const sentence = `The ${item} costs ₹${price} + ₹${price * tax} GST = ₹${price + (price * tax)}.`;

// console.log(sentence);












//---------------Counter private stat-------------------------
function makeCounter() {
  let count = 0;                      
  return function () {
  count++;                          
  return count;
};
}
const c = makeCounter();
console.log(c());     
console.log(c());     
console.log(c());     
//console.log(count)

//-----------------Private variables--------------------------------
function createAccount(initial) {
let balance = initial;              
return {
  deposit:    (amt) => balance += amt,
  withdraw:   (amt) => balance -= amt,
  getBalance: ()    => balance,
  };
}
const acc = createAccount(1000);
acc.deposit(500);
console.log(acc.getBalance());   
acc.balance;


//---------------------Memoization------------------------
function memoize(fn) {
const cache = {};                   
return function (n) {
if (n in cache) return cache[n];
cache[n] = fn(n);                 
return cache[n];
};
}
  

const slowSquare = (n) => { console.log("computing..."); return n * n; };
const fastSquare = memoize(slowSquare);
fastSquare(5);   
fastSquare(5); 


(function () {
const secret = "hidden";            
console.log("IIFE ran");
})();
// // IIFE with parameters
// →
// var → logs?
// Immediately Invoked Function Expression
// Basic IIFE — runs once, creates a private scope
// not visible outside
(function (city) {
console.log(`Greetings from ${city}`);
})("Jaipur");
// Arrow IIFE (modern)
(() => {
const x = 42;
console.log(x);
})();