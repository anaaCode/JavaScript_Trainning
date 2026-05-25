// Topic 1: Every Object Has a Prototype
const user = { name: "Priya" };

// Every object literal's prototype is Object.prototype
console.log(Object.getPrototypeOf(user) === Object.prototype);  // true

// user has no .toString() of its own — but it can call one!
console.log(user.toString());  // "[object Object]"

// Why? toString lives on Object.prototype
console.log(Object.prototype.hasOwnProperty("toString"));  // true

// At the END of the chain: null
console.log(Object.getPrototypeOf(Object.prototype));      // null

// Topic 2: Object.create — Explicit prototype linking
const animal = {
  eat()   { console.log(`${this.name} is eating`); },
  sleep() { console.log(`${this.name} is sleeping`); },
};

// dog inherits from animal
const dog = Object.create(animal);
dog.name = "Bruno";
dog.eat();    // "Bruno is eating"    ← method found on animal (the prototype)
dog.sleep();  // "Bruno is sleeping"  ← same path

// Confirm the link
console.log(Object.getPrototypeOf(dog) === animal);  // true

// Own properties vs inherited
console.log(dog.hasOwnProperty("name"));  // true   ← on dog itself
console.log(dog.hasOwnProperty("eat"));   // false  ← inherited from animal

// Follow-along snippet
const a = { x: 1 };
const b = Object.create(a);
b.y = 2;
console.log(b.x);                    // 1  ← inherited from a
console.log(b.y);                    // 2  ← own
console.log(b.hasOwnProperty("x"));  // false

// Topic 3: The Prototype Chain — Read walks up · Write makes own
const grandparent = { lastName: "Sharma" };
const parent      = Object.create(grandparent);
parent.firstName  = "Priya";
const child       = Object.create(parent);
child.age         = 5;

// READ — walks up the chain
console.log(child.age);        // 5         ← own
console.log(child.firstName);  // "Priya"   ← from parent
console.log(child.lastName);   // "Sharma"  ← from grandparent
console.log(child.toString);   // ƒ         ← from Object.prototype

// WRITE — creates an own property; the prototype is untouched
child.firstName = "Anaya";
console.log(child.firstName);   // "Anaya"  ← own property now shadows parent's
console.log(parent.firstName);  // "Priya"  ← prototype unchanged

// Topic 4: hasOwnProperty vs in
const animal2 = { eat() {} };
const dog2 = Object.create(animal2);
dog2.bark = () => console.log("woof");

console.log(dog2.hasOwnProperty("bark"));   // true   — dog has its own bark
console.log(dog2.hasOwnProperty("eat"));    // false  — eat is inherited
console.log("bark" in dog2);                // true   — found on dog
console.log("eat"  in dog2);               // true   — found on animal (chain)
console.log("toString" in dog2);           // true   — found on Object.prototype

// Topic 5: Constructor Functions (Pre-ES6)
function User(name, city) {
  this.name = name;   // own property on the new object
  this.city = city;
}

// Methods go on the SHARED prototype — not duplicated per instance
User.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name} from ${this.city}`);
};

const u1 = new User("Priya", "Jaipur");
const u2 = new User("Aarav", "Mumbai");
u1.greet();  // "Hi, I'm Priya from Jaipur"
u2.greet();  // "Hi, I'm Aarav from Mumbai"

// Both share the SAME greet function reference
console.log(u1.greet === u2.greet);                              // true
console.log(Object.getPrototypeOf(u1) === User.prototype);       // true

// Inheritance — Admin extends User (pre-ES6 way)
function Admin(name, city, level) {
  User.call(this, name, city);  // borrow User's constructor
  this.level = level;
}
Admin.prototype = Object.create(User.prototype);  // chain Admin → User
Admin.prototype.constructor = Admin;              // restore constructor pointer
Admin.prototype.power = function () {
  console.log(`${this.name} has level ${this.level}`);
};

const ad = new Admin("Riya", "Bangalore", 5);
ad.greet();  // inherited from User.prototype
ad.power();  // own to Admin.prototype

// Topic 6: Don't Modify Built-in Prototypes
// DON'T do this (shown here for illustration only)
// Array.prototype.last = function () { return this[this.length - 1]; };
// Every Array everywhere now has .last — including libraries you import.
// ECMAScript may add a real .last in the future and clash with yours.
// for...in over an array can include 'last' as a key in some traversal patterns.

// SAFER alternative — a free function or a utility
function last(arr) { return arr[arr.length - 1]; }
const fruits = ["apple", "mango", "banana"];
console.log(last(fruits));  // "banana"

// Topic 7: Mental Model Summary
// Property read  → walks up the chain until found (or reaches null)
// Property write  → creates an OWN property; prototype untouched
// Method call    → method found via chain; this = the object you called on
// End of chain   → null