// Exercise 1: typeof on a var before declaration
console.log(typeof age);  // "undefined" — var hoisted, typeof never throws
var age = 25;
console.log(typeof age);  // "number"

// Exercise 2: TDZ error
// console.log(count);
// let count = 5;  // ReferenceError: Cannot access 'count' before initialization

let count = 5;
console.log(count);  // 5

// Exercise 3: Three versions of a function
console.log(display());  // works — function declaration fully hoisted
function display() {
    console.trace();
    console.log("Hello");
}

// console.log(greet());  // TypeError: greet is not a function
var greet = function () { console.log("Hello"); };

// console.log(displayArrow());  // ReferenceError: Cannot access 'displayArrow' before initialization
const displayArrow = () => { console.log("Hello"); };

// Exercise 4: Stack trace
// installHook.js:1 console.trace
// overrideMethod    @ installHook.js:1   -- Function EC
// display           @ hw.js:13           -- Function EC
// (anonymous)       @ hw.js:11           -- Global EC