//---------------------------------Task-1------------------------------------

const a = 17;
const b = 5;

console.log(a + b); // 22
console.log(a - b); // 12
console.log(a * b); // 85
console.log(a / b); // 3.4
console.log(a % b); // 2
console.log(a ** b); // 1419857

const numCheck=42;
console.log(numCheck % 2 === 0 ? "even" : "odd"); // even

//---------------------------------Task-2--------------------------------------

console.log(5 == "5");   // true 
console.log(5 === "5");  // false 

console.log(0 == false);  // true
console.log(0 === false); // false

console.log(null == undefined);  // true
console.log(null === undefined); // false


//== converts both values to the same type before comparing (loose)
//=== checks both value AND type without conversion (strict)

//----------------------------------Task-3----------------------------------------


const age = 19;
const hasLicense = true;
const hasCar = false;
console.log(age >= 18 && hasLicense); // true
console.log(hasLicense || hasCar); // true
// const hasLicense = false;
console.log(age >= 18 && hasLicense); // false 
console.log(hasLicense || hasCar);    // false 


//------------------------------------Bonus Task-------------------------------------

const mood = "adult";

console.log(mood === "adult" ? "adult" : "minor"); // adult

const username = null;

const display = username ?? "Guest";
console.log(display); // Guest

const display2 = username || "Guest";
console.log(display2); // Guest

//??  use default only if value is null or undefined or || [] use default if value is any falsy (0, false, "", null, undefined)