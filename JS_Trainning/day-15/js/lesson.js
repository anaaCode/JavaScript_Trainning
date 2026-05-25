// ─── Topic 1: What is this? ───────────────────────────────────────────────────
function whoAmI() {
  console.log(this);
}

whoAmI(); // window/global (non-strict) OR undefined (strict)

const user = { name: "Priya", whoAmI };
user.whoAmI(); // logs the user object

const other = { name: "Aarav", whoAmI };
other.whoAmI(); // logs other — same function, different this

// ─── Topic 2: The 4 Binding Rules ─────────────────────────────────────────────
// Rule 1 — Default
function speak() { console.log(this); }
speak(); // undefined (strict) / global

// Rule 2 — Implicit
const car = {
  brand: "Tata",
  show() { console.log(this.brand); },
};
car.show(); // "Tata"

// Rule 4 — new
function User(name) { this.name = name; }
const p = new User("Anaya");
console.log(p.name); // "Anaya"

// Predict these:
const obj = {
  n: 7,
  f() { return this.n; },
};
const g = obj.f;
console.log(obj.f()); // 7   — implicit binding
console.log(g());     // undefined — default binding (this lost)

// ─── Topic 3: call / apply / bind ─────────────────────────────────────────────
function greet(city, lang) {
  console.log(`${this.name} from ${city} speaks ${lang}`);
}
const u = { name: "Priya" };

greet.call(u, "Jaipur", "Hindi");    // "Priya from Jaipur speaks Hindi"
greet.apply(u, ["Jaipur", "Hindi"]); // "Priya from Jaipur speaks Hindi"

const greetPriya = greet.bind(u, "Jaipur");
greetPriya("English"); // "Priya from Jaipur speaks English"
greetPriya("Marathi"); // "Priya from Jaipur speaks Marathi"

// Once bound, this CANNOT be re-bound
greetPriya.call({ name: "Aarav" }, "Tamil");
// still "Priya from Jaipur speaks Tamil"

// ─── Topic 4: Arrow Functions — Lexical this ──────────────────────────────────
const userObj = {
  name: "Priya",
  regular: function () { console.log(this.name); }, // "Priya"
  arrow: () => { console.log(this.name); },          // undefined
};

userObj.regular(); // "Priya"
userObj.arrow();   // undefined

// Arrow shines inside callbacks
const team = {
  members: ["Priya", "Aarav", "Riya"],
  greetAll() {
    this.members.forEach((m) => {
      console.log(`Hi ${m}, from team ${this.members.length}`);
    });
  },
};
team.greetAll();
// "Hi Priya, from team 3"
// "Hi Aarav, from team 3"
// "Hi Riya, from team 3"

// ─── Topic 5: this in Classes ─────────────────────────────────────────────────
class UserClass {
  constructor(name) { this.name = name; }
  greet() { console.log(`Hi, I'm ${this.name}`); }
}

const a = new UserClass("Priya");
const b = new UserClass("Aarav");
a.greet(); // "Hi, I'm Priya"
b.greet(); // "Hi, I'm Aarav"

const greetFn = a.greet;
// greetFn(); // TypeError — this is undefined in strict mode

// ─── Topic 6: The "Lost this" Bug & Fixes ─────────────────────────────────────
class Counter {
  constructor() { this.count = 0; }
  inc() { this.count++; console.log(this.count); }
}
const c = new Counter();

// setTimeout(c.inc, 100);        // Bug — TypeError
setTimeout(c.inc.bind(c), 100);  // Fix 1 — bind
setTimeout(() => c.inc(), 100);  // Fix 2 — arrow wrapper

class CounterArrow {
  count = 0;
  inc = () => { this.count++; console.log(this.count); };
}
const ca = new CounterArrow();
setTimeout(ca.inc, 100); // Fix 3 — class field arrow

// ─── Topic 7: Decision Tree ───────────────────────────────────────────────────
// Step 1: Arrow?           → outer scope's this
// Step 2: new?             → the new object
// Step 3: .call/.apply/.bind? → explicit value
// Step 4: obj.fn()?        → obj
// Step 5: plain fn()?      → undefined (strict) / global