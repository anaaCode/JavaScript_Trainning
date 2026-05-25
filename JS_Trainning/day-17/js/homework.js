// Exercise 1: Vehicle Hierarchy
class Vehicle {
  constructor(brand) { this.brand = brand; }
  start() { console.log(`${this.brand} starting...`); }
}

class Car extends Vehicle {
  constructor(brand, doors) {
    super(brand);
    this.doors = doors;
  }
  start() {
    super.start();
    console.log("Car-specific check");
  }
}

class Bike extends Vehicle {
  constructor(brand) { super(brand); }
}

const car = new Car("Toyota", 4);
car.start();
// "Toyota starting..."
// "Car-specific check"

const bike = new Bike("Royal Enfield");
bike.start();  // "Royal Enfield starting..."

// Exercise 2: Counter with static count
class Counter {
  #count = 0;
  static count = 0;

  constructor() { Counter.count++; }

  inc() { this.#count++; }
  dec() {
    if (this.#count === 0) throw new Error("Cannot go below zero");
    this.#count--;
  }
  get value() { return this.#count; }
}

const c1 = new Counter();
const c2 = new Counter();
const c3 = new Counter();
console.log(Counter.count);  // 3

// Exercise 3: Temperature class
class Temperature {
  #celsius;
  constructor(celsius) { this.celsius = celsius; }

  get celsius() { return this.#celsius; }
  set celsius(value) {
    if (value < -273.15) throw new Error("Below absolute zero");
    this.#celsius = value;
  }
  get fahrenheit() { return this.#celsius * 9/5 + 32; }
}

const t = new Temperature(100);
console.log(t.celsius);     // 100
console.log(t.fahrenheit);  // 212

try {
  t.celsius = -300;
} catch (e) {
  console.log(e.message);  // "Below absolute zero"
}

// Exercise 4: ValidationError as a class
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name  = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (typeof age !== "number") throw new ValidationError("age", "Must be a number");
  if (age < 0)                 throw new ValidationError("age", "Must be non-negative");
  if (age > 150)               throw new ValidationError("age", "Must be under 150");
}

try {
  validateAge(-5);
} catch (e) {
  console.log(e instanceof ValidationError);  // true
  console.log(e.name);                        // "ValidationError"
  console.log(e.field, e.message);            // "age" "Must be non-negative"
}
