// Task 1: Inspect a Prototype
const arr = [1, 2, 3];

// Step 1 — the prototype of an array is Array.prototype
console.log(Object.getPrototypeOf(arr));               // Array.prototype (has push, pop, map…)

// Step 2 — the prototype of Array.prototype is Object.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(arr)));  // Object.prototype (has toString…)

// Step 3 — the end of the chain
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(arr))));  // null

// Chain diagram:
// arr  →  Array.prototype  →  Object.prototype  →  null

// Task 2: Build with Object.create
const vehicle = {
  start() { console.log(`${this.name} starting`); },
};

const car  = Object.create(vehicle);
car.name   = "Tata Nexon";

const bike = Object.create(vehicle);
bike.name  = "Royal Enfield";

car.start();   // "Tata Nexon starting"
bike.start();  // "Royal Enfield starting"

// name is own, start is inherited
console.log(car.hasOwnProperty("name"));    // true
console.log(car.hasOwnProperty("start"));   // false
console.log("name"  in car);                // true  — found on car
console.log("start" in car);                // true  — found on vehicle (chain)

// Task 3: Constructor Function Inheritance
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log("Hi, I'm " + this.name);
};

function Student(name, school) {
  Person.call(this, name);  // borrow Person's constructor
  this.school = school;
}

// Link Student.prototype → Person.prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function () {
  console.log(this.name + " studies at " + this.school);
};

const riya = new Student("Riya", "IIT Delhi");
riya.greet();  // "Hi, I'm Riya"
riya.study();  // "Riya studies at IIT Delhi"

// Confirm chain
console.log(Object.getPrototypeOf(riya) === Student.prototype);       // true
console.log(Object.getPrototypeOf(Student.prototype) === Person.prototype);  // true

// Bonus: hasOwnProperty vs in
const dogObj = Object.create({ species: "Canis" });
dogObj.name = "Bruno";

// Predictions and results:
console.log(dogObj.hasOwnProperty("name"));     // true   — name is own
console.log(dogObj.hasOwnProperty("species"));  // false  — species is inherited
console.log("name" in dogObj);                  // true   — found on dogObj
console.log("species" in dogObj);               // true   — found on prototype
console.log("toString" in dogObj);              // true   — found on Object.prototype

// Rule: use hasOwnProperty (or Object.hasOwn) to check only direct properties;
//       use 'in' when you want to check the whole chain including inherited ones.