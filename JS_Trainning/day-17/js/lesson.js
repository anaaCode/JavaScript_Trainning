// Topic 1: Class Syntax Basics
class User {
  constructor(name, city) {
    this.name = name;
    this.city = city;
  }
  greet() {
    console.log(`Hi, I'm ${this.name} from ${this.city}`);
  }
}

const a = new User("Priya", "Jaipur");
const b = new User("Aarav", "Mumbai");
a.greet();  // "Hi, I'm Priya from Jaipur"
b.greet();  // "Hi, I'm Aarav from Mumbai"

console.log(typeof User);          // "function"
console.log(a.greet === b.greet);  // true — shared via prototype

// Topic 2: Getters and Setters
class Product {
  constructor(name, priceInPaise) {
    this.name = name;
    this._priceInPaise = priceInPaise;
  }
  get priceInRupees() { return this._priceInPaise / 100; }
  set priceInRupees(rupees) {
    if (rupees < 0) throw new Error("Price cannot be negative");
    this._priceInPaise = rupees * 100;
  }
  get priceWithGST() { return this.priceInRupees * 1.18; }
}

const p = new Product("Notebook", 5000);
console.log(p.priceInRupees);  // 50
console.log(p.priceWithGST);   // 59
p.priceInRupees = 100;
console.log(p.priceInRupees);  // 100

// Topic 3: extends and super
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(`${this.name} makes a sound`); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    super.speak();
    console.log(`${this.name} barks!`);
  }
}

const d = new Dog("Bruno", "Labrador");
d.speak();
console.log(d instanceof Dog);     // true
console.log(d instanceof Animal);  // true

// Topic 4: static Methods
class MathUtils {
  static gst(amount, rate = 18) { return amount * (rate / 100); }
  static format(amount) { return `₹${amount.toFixed(2)}`; }
}

console.log(MathUtils.gst(1000));    // 180
console.log(MathUtils.format(1180)); // "₹1180.00"

class UserFactory {
  constructor(name) { this.name = name; }
  static fromEmail(email) { return new UserFactory(email.split("@")[0]); }
}
const u = UserFactory.fromEmail("priya@example.com");
console.log(u.name);  // "priya"

// Topic 5: Private Fields with #
class BankAccount {
  #balance;
  #transactions = [];
  constructor(initial) { this.#balance = initial; }
  deposit(amt) { this.#balance += amt; this.#transactions.push({ type: "deposit", amt }); }
  withdraw(amt) {
    if (amt > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amt;
    this.#transactions.push({ type: "withdraw", amt });
  }
  get balance() { return this.#balance; }
  get history() { return [...this.#transactions]; }
}

const acc = new BankAccount(1000);
acc.deposit(500);
acc.withdraw(200);
console.log(acc.balance);   // 1300
console.log(acc.history);

// Topic 6: Custom Error Classes
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}
class ValidationError extends AppError {
  constructor(field, message) {
    super(message, "VALIDATION_FAILED");
    this.field = field;
  }
}

function validateAge(age) {
  if (age < 0)   throw new ValidationError("age", "Must be non-negative");
  if (age > 150) throw new ValidationError("age", "Must be under 150");
}

try {
  validateAge(-5);
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(`[${e.code}] ${e.field}: ${e.message}`);
    // "[VALIDATION_FAILED] age: Must be non-negative"
  }
}
