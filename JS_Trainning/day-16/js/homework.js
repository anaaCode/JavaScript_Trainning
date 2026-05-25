// Exercise 1: 3-level Object.create chain
const tool = {
  describe() { console.log(`${this.name} is a tool`); },
};

const vehicle = Object.create(tool);
vehicle.drive = function () { console.log(`${this.name} is driving`); };

const car = Object.create(vehicle);
car.honk = function () { console.log(`${this.name} honks!`); };

const myCar = Object.create(car);
myCar.name = "Tata Nexon";

// All three methods reachable from myCar via the chain
myCar.describe();  // "Tata Nexon is a tool"     ← from tool
myCar.drive();     // "Tata Nexon is driving"     ← from vehicle
myCar.honk();      // "Tata Nexon honks!"         ← from car

// Chain: myCar → car → vehicle → tool → Object.prototype → null

// Exercise 2: Shape → Circle inheritance
function Shape(name) {
  this.name = name;
}

Shape.prototype.describe = function () {
  console.log(`I am a shape called ${this.name}`);
};

function Circle(name, radius) {
  Shape.call(this, name);  // inherit own properties
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
  const a = Math.PI * this.radius * this.radius;
  console.log(`Area of ${this.name}: ${a.toFixed(2)}`);
};

const c1 = new Circle("C1", 5);
c1.describe();  // "I am a shape called C1"
c1.area();      // "Area of C1: 78.54"

console.log(Object.getPrototypeOf(c1) === Circle.prototype);        // true
console.log(Object.getPrototypeOf(Circle.prototype) === Shape.prototype);  // true

// Exercise 3: Inspect a built-in prototype
// Five lesser-known String.prototype methods:
// 1. String.prototype.padStart(targetLength, padString)
console.log("5".padStart(3, "0"));  // "005"

// 2. String.prototype.padEnd(targetLength, padString)
console.log("hi".padEnd(5, "."));   // "hi..."

// 3. String.prototype.repeat(count)
console.log("ab".repeat(3));        // "ababab"

// 4. String.prototype.at(index)  — supports negative indices
console.log("hello".at(-1));        // "o"

// 5. String.prototype.trimStart()
console.log("   hello".trimStart()); // "hello"

// Exercise 4: chainOf(obj) — returns every prototype in the chain
function chainOf(obj) {
  const chain = [];
  let current = Object.getPrototypeOf(obj);
  while (current !== null) {
    chain.push(current);
    current = Object.getPrototypeOf(current);
  }
  chain.push(null);
  return chain;
}

const sample = Object.create(Object.create({ base: true }));
console.log(chainOf(sample));
// [ {base: true}, Object.prototype, null ]

const student = new Circle("Test", 3);
console.log(chainOf(student));
// [ Circle.prototype, Shape.prototype, Object.prototype, null ]