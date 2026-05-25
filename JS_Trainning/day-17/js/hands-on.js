// Task 1: Basic Class with Getter
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get area() { return this.width * this.height; }
  scale(factor) {
    this.width  *= factor;
    this.height *= factor;
  }
}

const r = new Rectangle(2, 3);
console.log(r.area);  // 6
r.scale(2);
console.log(r.area);  // 24

// Task 2: Inheritance with super
class Employee {
  constructor(name, salary) {
    this.name   = name;
    this.salary = salary;
  }
  describe() {
    console.log(`${this.name} earns ₹${this.salary}/month`);
  }
}

class Manager extends Employee {
  constructor(name, salary, team) {
    super(name, salary);
    this.team = team;
  }
  describe() {
    super.describe();
    console.log(`Leads team of ${this.team.length}`);
  }
}

const riya = new Manager("Riya", 80000, ["Priya", "Aarav", "Anaya"]);
riya.describe();
// "Riya earns ₹80000/month"
// "Leads team of 3"

// Task 3: Private Field with #
class Counter {
  #count = 0;
  inc() { this.#count++; }
  dec() {
    if (this.#count === 0) throw new Error("Count cannot go below zero");
    this.#count--;
  }
  get value() { return this.#count; }
}

const c = new Counter();
c.inc(); c.inc(); c.inc();
c.dec();
console.log(c.value);  // 2

try {
  c.dec(); c.dec(); c.dec(); c.dec();
} catch (e) {
  console.log(e.message);  // "Count cannot go below zero"
}

// Bonus: Custom Error Class
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name  = "ValidationError";
    this.field = field;
  }
}

function validateUser({ name, age }) {
  if (!name) throw new ValidationError("name", "Name is required");
  if (age < 0) throw new ValidationError("age", "Age must be non-negative");
}

try {
  validateUser({ name: "", age: 25 });
} catch (e) {
  console.log(e.field, e.message);  // "name" "Name is required"
}

try {
  validateUser({ name: "Priya", age: -1 });
} catch (e) {
  console.log(e.field, e.message);  // "age" "Age must be non-negative"
}
