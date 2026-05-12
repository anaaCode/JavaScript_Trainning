sayHi();           // "Hi"      ← full body hoisted
function sayHi() {
  console.log("Hi");
}

// Function expression with var — TypeError
greet(); 
var greet = function () {
  console.log("Hello");
};

welcome(); 
const welcome = function () {
  console.log("Welcome");
};

shout();
const shout = () => console.log("HEY");