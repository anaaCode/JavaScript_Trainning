document.addEventListener("DOMContentLoaded", function () {

const topic1Snippet = `let person = {
  name: "Aarav",
  age: 25,
  city: "Mumbai",
  email: "aarav@example.com"
};

console.log(person.name);      // "Aarav"
console.log(person["age"]);    // 25`;

const topic2Snippet = `let student = {
  name: "Priya",
  grade: 10
};

student.age = 16;           // Add property
student.grade = 11;         // Update property
delete student.grade;       // Remove property

console.log(student);`;

const topic3Snippet = `let calculator = {
  num1: 10,
  num2: 5,
  add: function() {
    return this.num1 + this.num2;
  },
  multiply: function() {
    return this.num1 * this.num2;
  }
};

console.log(calculator.add());      // 15
console.log(calculator.multiply()); // 50`;

document.querySelector("#topic1Code code").textContent = topic1Snippet;
document.querySelector("#topic2Code code").textContent = topic2Snippet;
document.querySelector("#topic3Code code").textContent = topic3Snippet;

console.log("=== Day 8: Objects ===");
const user = { name: "Riya", age: 23, city: "Jaipur" };
console.log(user.name);
const { name, age } = user;
console.log(name, age);
console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

});