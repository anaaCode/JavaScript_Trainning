// ─── Exercise 1: Predict All Four Bindings ────────────────────────────────────
const user = {
  name: "Priya",
  greet() { console.log(this.name); },
};

user.greet();                     // "Priya"   — implicit binding (this = user)

const fn = user.greet;
fn();                             // undefined — default binding (this lost)

user.greet.call({ name: "X" });   // "X"       — explicit binding (.call sets this)

// ─── Exercise 2: Fix a Class Method Bug — Three Ways ──────────────────────────
class Counter {
  constructor() { this.count = 0; }
  inc() { this.count++; console.log(this.count); }
}

const c = new Counter();

// Fix 1 — .bind: inc.bind(c) returns a new function permanently bound to c
setTimeout(c.inc.bind(c), 100);   // logs 1

// Fix 2 — Arrow wrapper: () => c.inc() calls inc as a method → this = c
setTimeout(() => c.inc(), 100);   // logs 1

// Fix 3 — Class field arrow: this captured at construction time → always the instance
class CounterFixed {
  count = 0;
  inc = () => { this.count++; console.log(this.count); };
}
const cf = new CounterFixed();
setTimeout(cf.inc, 100);          // logs 1

// ─── Exercise 3: apply with Spread ────────────────────────────────────────────
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

const numbers = [1, 2, 3, 4, 5];

console.log(sum.apply(null, numbers)); // 15
// null because sum doesn't use 'this' — we only care about the args

// Modern equivalent
console.log(sum(...numbers)); // 15

// .apply shines when you need to set 'this' AND unpack an array in one step.
// Before ES6 spread, .apply was the only way to pass arrays as individual args.

// ─── Exercise 4: Arrow Function and bind ──────────────────────────────────────
const f = () => console.log(this);

const bound = f.bind({ x: 1 });
bound();
// Logs: undefined (module) or window (non-strict global) — NOT { x: 1 }

// Why .bind has no effect on an arrow:
// Arrow functions capture 'this' from their enclosing lexical scope at
// definition time. That binding is permanent.
// .call, .apply, and .bind are silently ignored on arrow functions.