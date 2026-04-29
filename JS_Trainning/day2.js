//---------------------TASK-1-------------------------------
// Declaring variables of different types
let myName = "Anamika";        // string
let age = 22;                 // number
let isStudent = true;         // boolean
let emptyValue = null;        // null
let notAssigned;              // undefined

// Logging value + type
console.log(myName, typeof myName);         // Anamika string
console.log(age, typeof age);               // 22 number
console.log(isStudent, typeof isStudent);   // true boolean
console.log(emptyValue, typeof emptyValue); // null object 
console.log(notAssigned, typeof notAssigned); // undefined undefined


//----------------------TASK-2---------------------------------
console.log("10" + 5);     // "105"  (string concatenation)
console.log("10" - 5);     // 5      (string → number conversion)
console.log(true + true);  // 2      (1 + 1)
console.log("" + false);   // "false" (string conversion)
console.log(null + 1);     // 1      (null → 0)

//-----------------------TASK-3-----------------------------------

const fullName = "  Anamika Kumari  ";

// Trimmed name
console.log(fullName.trim()); // "Anamika Kumari"

// ALL CAPS
console.log(fullName.trim().toUpperCase()); // "ANAMIKA KUMARI"

// Length after trimming
console.log(fullName.trim().length); // 15

// Check if includes first name
console.log(fullName.includes("Anamika")); // true

// extract just my first name

console.log(fullName.trimStart().slice(0,7));

//--------------------Bonus Type Converter-----------------------------

let str="42";
str=Number(str);
console.log((typeof(str)),str);

let num=100;
num=String(num)
console.log((typeof(num)),num);


console.log(Boolean('0')); //In JavaScript, any non-empty string is truthy


