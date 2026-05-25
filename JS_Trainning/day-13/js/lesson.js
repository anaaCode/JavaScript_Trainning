console.log(a);        // undefined          ← var hoisted with undefined
var a = 1;

// console.log(b);        // ReferenceError     ← let hoisted, but in TDZ
// let b = 2;

// console.log(c);        // ReferenceError     ← const hoisted, but in TDZ
// const c = 3;

greet();               // "Hi"               ← function declaration: full body hoisted
function greet() { console.log("Hi"); }

console.log(score);    // undefined           ← var: no error but not what you wanted
var score = 90;

// console.log(level);  // ReferenceError: Cannot access 'level' before initialization
// let level = 5;

{
  // console.log(mark);  // would throw — mark is in TDZ here
  let mark = 87;
  console.log(mark);    // 87 ← TDZ has ended
}

sayHi();               // "Hi" ← full body hoisted
function sayHi() { console.log("Hi"); }

// greet2();           // TypeError: greet2 is not a function
var greet2 = function () { console.log("Hello"); };

// welcome();          // ReferenceError: Cannot access 'welcome' before initialization
const welcome = function () { console.log("Welcome"); };

// shout();            // ReferenceError
const shout = () => console.log("HEY");