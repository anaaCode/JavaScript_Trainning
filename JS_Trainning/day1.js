console.log('Hello, JAvaScript');
console.log(42);
console.log(3.14);
console.log(true);
console.log('Name:', 'Rahul', 'Age:', 25);
// const: cannot be reassigned 
const firstname = "Anirudh";
console.log(firstname); // Anirudh
// name = "Raj"; // TypeError: Assignment to constant variable
// let: can be reassigned 
let score = 0;
console.log(score);
score = 10;
console.log(score);
score = score + 4;
console.log(score); // 15
//  var: old, avoid in new code 

//  Declaring without a value 
let city;
console.log(city); // undefined
city = "Kochi";
console.log(city); // Kochi

//--------------------TASK-1-----------------------------
const name="Anamika";
console.log(name);

const clg="LNCT";
console.log("My College",clg);
const sbj="Math";
console.log("Subject",sbj);
const todo="Project";
console.log(todo);

//---------------------TASK-2-----------------------------

let currentMood="Focused";
console.log(currentMood);
currentMood="Curious";
console.log(currentMood);

// const currentMood="Focused";
// console.log(currentMood);
// currentMood="Curious";
// console.log(currentMood); 

//----------------------TASK-3-----------------------------

let student_name="Annaa";
let studentName="Annaa"; //camelCase
console.log(`normal value ${student_name} camelCase value ${studentName}`);

let TotalSum=999999; //PascalCase
let totalSum=999999; //camelCase
console.log(`PascalCase value ${TotalSum} camelCase value ${totalSum}`);

let maxScoredRun=289;
console.log("Highest Scored Run IN IPL", maxScoredRun);






