// Day 25 – Functional Programming (lesson)

// ─────────────────────────────────────────────
// Topic 1: Pure Functions
// ─────────────────────────────────────────────

// A function is PURE if:
//   (1) same input → same output every time
//   (2) no side effects — no console, network, DOM, or mutation of external state

// PURE — no external state, no side effects
//   function add(a, b) { return a + b; }
//   function double(x) { return x * 2; }
//   function withGST(price, rate = 18) { return price * (1 + rate / 100); }

// IMPURE — depends on external state (multiplier could change)
//   let multiplier = 2;
//   function impureDouble(x) { return x * multiplier; }

// IMPURE — side effect (writes to console)
//   function logAndDouble(x) {
//     console.log(x);
//     return x * 2;
//   }

// IMPURE — mutates the argument
//   function addItem(arr, item) {
//     arr.push(item);   // mutates input!
//     return arr;
//   }

// PURE version — returns a NEW array instead
//   function addItemPure(arr, item) {
//     return [...arr, item];
//   }


// ─────────────────────────────────────────────
// Topic 2: Side Effects at the Edges
// ─────────────────────────────────────────────

// Rule: keep the CORE of your code pure. Push all I/O to the outermost shell.

// async function processOrder(orderId) {
//   const order = await fetchOrder(orderId);       // side effect — edge (network)

//   // ↓ pure transformations in the middle
//   const validated = validate(order);
//   const taxed     = applyTax(validated);
//   const formatted = formatForDisplay(taxed);

//   await saveOrder(formatted);                    // side effect — edge (network)
//   await sendEmail(formatted.email, formatted);   // side effect — edge (email)
// }

// Benefits of this pattern:
//   • The pure inner functions are trivially unit-testable (no mocks needed)
//   • Side effects are easy to find — they only appear at the top and bottom
//   • Easier to reason about: "this function just transforms data"


// ─────────────────────────────────────────────
// Topic 3: Higher-Order Functions
// ─────────────────────────────────────────────

// HOFs that TAKE a function
//   const nums = [1, 2, 3, 4, 5];
//   nums.map((x) => x * 2);            // [2, 4, 6, 8, 10]
//   nums.filter((x) => x % 2 === 0);   // [2, 4]
//   nums.reduce((a, b) => a + b, 0);   // 15

// HOFs that RETURN a function
//   function multiplier(factor) {
//     return (x) => x * factor;
//   }
//   const double = multiplier(2);
//   const triple = multiplier(3);
//   console.log(double(5));   // 10
//   console.log(triple(5));   // 15

// HOF that TAKES and RETURNS a function — the `once` utility
//   function once(fn) {
//     let called = false;
//     let result;
//     return (...args) => {
//       if (called) return result;
//       called = true;
//       return (result = fn(...args));
//     };
//   }
//
//   const init = once(() => "initialised");
//   console.log(init());   // "initialised"
//   console.log(init());   // "initialised" — fn NOT called again, cached result

// Follow-along — predict the output:
//   const m = (f) => (x) => f(x) * 2;
//   const inc = (x) => x + 1;
//   const incThenDouble = m(inc);
//   console.log(incThenDouble(5));   // → 12  (5+1=6, 6*2=12)


// ─────────────────────────────────────────────
// Topic 4: compose and pipe
// ─────────────────────────────────────────────

// Build them yourself — one-liners
//   const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
//   const pipe    = (...fns) => (x) => fns.reduce     ((acc, fn) => fn(acc), x);

// compose runs RIGHT→LEFT (math-style):  compose(f, g)(x) = f(g(x))
// pipe    runs LEFT→RIGHT (readable):    pipe(f, g)(x)    = g(f(x))

// Small pure functions
//   const trim      = (s) => s.trim();
//   const lower     = (s) => s.toLowerCase();
//   const split     = (s) => s.split(/\s+/);
//   const wordCount = (arr) => arr.length;

// Build the pipeline with pipe (top-down, easy to read)
//   const countWords = pipe(trim, lower, split, wordCount);
//   console.log(countWords("  Hello World from Jaipur  "));   // 4

// Equivalent imperative version — noisier:
//   let s = "  Hello World from Jaipur  ";
//   s = s.trim();
//   s = s.toLowerCase();
//   const arr = s.split(/\s+/);
//   const count = arr.length;   // 4


// ─────────────────────────────────────────────
// Topic 5: Currying
// ─────────────────────────────────────────────

// Currying transforms fn(a, b, c) into fn(a)(b)(c)
// Each call returns a new function waiting for the next argument.

// Manual curry — verbose but clear
//   function addCurried(a) {
//     return function (b) {
//       return function (c) {
//         return a + b + c;
//       };
//     };
//   }
//   addCurried(1)(2)(3);   // 6

// Arrow shorthand — much cleaner
//   const addC = (a) => (b) => (c) => a + b + c;

// Practical — pre-fill the tax RATE, vary the PRICE later
//   const tax      = (rate) => (price) => price * (1 + rate / 100);
//   const withGST  = tax(18);   // rate fixed at 18
//   const withVAT  = tax(10);   // rate fixed at 10
//
//   console.log(withGST(1000));   // 1180
//   console.log(withVAT(1000));   // 1100


// ─────────────────────────────────────────────
// Topic 6: Partial Application
// ─────────────────────────────────────────────

// Partial application = fix SOME arguments of a function, get a new function
// for the remaining ones. Unlike currying, you can fix multiple args at once.

// Using .bind (built-in)
//   function greet(greeting, time, name) {
//     return `${greeting} ${time}, ${name}!`;
//   }
//   const sayGoodMorning = greet.bind(null, "Good", "morning");
//   console.log(sayGoodMorning("Priya"));   // "Good morning, Priya!"
//   console.log(sayGoodMorning("Aarav"));   // "Good morning, Aarav!"

// Hand-rolled partial helper
//   const partial = (fn, ...preset) => (...rest) => fn(...preset, ...rest);
//
//   const sayHelloEvening = partial(greet, "Hello", "evening");
//   console.log(sayHelloEvening("Riya"));   // "Hello evening, Riya!"

// Curry vs Partial:
//   Curry    → always ONE arg at a time; n-ary fn becomes n nested unary fns
//   Partial  → fix ANY number of args upfront; fewer restrictions on shape


// ─────────────────────────────────────────────
// Topic 7: A Real-World Pipeline
// ─────────────────────────────────────────────

// const orders = [
//   { id: 1, item: "Pen",  price: 50,  quantity: 2 },
//   { id: 2, item: "Book", price: 200, quantity: 1 },
//   { id: 3, item: "Bag",  price: 800, quantity: 1 },
//   { id: 4, item: "Mug",  price: 150, quantity: 3 },
// ];

// Small pure functions — each does ONE thing
//   const lineTotal = (o)   => o.price * o.quantity;
//   const withGST   = (amt) => amt * 1.18;
//   const round2    = (n)   => Math.round(n * 100) / 100;
//   const formatINR = (n)   => `₹${n.toLocaleString("en-IN")}`;
//   const sum       = (a, b) => a + b;

// Pipe data through — reads like a recipe
//   const grandTotal = pipe(
//     (orders) => orders.map(lineTotal),    // [100, 200, 800, 450]
//     (totals) => totals.reduce(sum, 0),    // 1550
//     withGST,                               // 1829
//     round2,                                // 1829
//     formatINR,                             // "₹1,829"
//   );
//
//   console.log(grandTotal(orders));         // "₹1,829"

// Key insight: every step is testable in isolation.
//   lineTotal({ price: 50, quantity: 2 })   // → 100  ✓
//   withGST(1550)                            // → 1829  ✓
//   round2(1829.0)                           // → 1829  ✓