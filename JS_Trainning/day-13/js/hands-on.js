// Task 1: Predict the var hoist
console.log(name);  // undefined — var is hoisted with value undefined
var name = "Priya";
console.log(name);  // Priya

// Task 2: Trigger the TDZ
// console.log(city); // ReferenceError: Cannot access 'city' before initialization
// let city = "Jaipur";

let city = "Jaipur";
console.log(city);  // Jaipur
// TDZ = Temporal Dead Zone

// Task 3: Function declaration vs expression
sayHi();   // works — function declaration is fully hoisted
// greet(); // TypeError: greet is not a function
function sayHi() { console.log("Hi"); }
var greet = function () { console.log("Hello"); };
// Function declarations are fully hoisted.
// var greet is hoisted as undefined — calling undefined() = TypeError.

// Bonus: Trace the Call Stack
function multiply(a, b) {
    console.trace();
    return a * b;
}
function square(n) { return multiply(n, n); }
function printSquare(n) { console.log(square(n)); }

printSquare(5);  // 25
// multiply(5,5), square(5), printSquare(5), Global EC