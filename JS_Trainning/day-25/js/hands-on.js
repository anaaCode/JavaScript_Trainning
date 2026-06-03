// hands-on.js  (loaded as type="module" from hands-on.html)

// ─────────────────────────────────────────────
// Helpers — pipe and compose defined once for use across all tasks
// ─────────────────────────────────────────────
const pipe    = (...fns) => (x) => fns.reduce     ((acc, fn) => fn(acc), x);
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);


// ─────────────────────────────────────────────
// Task 1: Pure or Impure?
// ─────────────────────────────────────────────
console.log("=== Task 1: Pure or Impure? ===");

// (1) (a, b) => a + b
//   PURE — same input always gives same output, no side effects.

// (2) () => Date.now()
//   IMPURE — output changes every call (depends on external clock).

// (3) (arr) => arr.sort()
//   IMPURE — mutates the original array in-place.

// (4) (arr) => [...arr].sort()
//   PURE — copies first, so original is untouched; same input → same output.

// (5) (x) => { console.log(x); return x; }
//   IMPURE — console.log is a side effect (writes to external I/O).

console.log("(1) (a,b) => a+b          → PURE");
console.log("(2) () => Date.now()       → IMPURE  (external clock)");
console.log("(3) (arr) => arr.sort()    → IMPURE  (mutates input)");
console.log("(4) (arr) => [...arr].sort()→ PURE");
console.log("(5) logs then returns x    → IMPURE  (console side effect)");


// ─────────────────────────────────────────────
// Task 2: pipe from Scratch
// ─────────────────────────────────────────────
console.log("\n=== Task 2: pipe from Scratch ===");

// pipe is already defined above — let's prove it works
const addOne = (x) => x + 1;
const square = (x) => x * x;
const negate = (x) => -x;

// pipe(addOne, square, negate)(5)
//   addOne(5) → 6
//   square(6) → 36
//   negate(36) → -36
const transform = pipe(addOne, square, negate);
console.log("pipe(addOne, square, negate)(5) →", transform(5));   // -36


// ─────────────────────────────────────────────
// Task 3: Curry it
// ─────────────────────────────────────────────
console.log("\n=== Task 3: Curry it ===");

const volume = (l) => (w) => (h) => l * w * h;

const lengthOf5       = volume(5);       // l fixed at 5
const lengthOf5width3 = lengthOf5(3);    // l=5, w fixed at 3
const result          = lengthOf5width3(2);  // l=5, w=3, h=2

console.log("volume(5)(3)(2) →", result);   // 30


// ─────────────────────────────────────────────
// Bonus: Real Pipeline
// ─────────────────────────────────────────────
console.log("\n=== Bonus: Real Pipeline ===");

const users = [
  { name: "priya", age: 25 },
  { name: "aarav", age: 17 },
  { name: "riya",  age: 30 },
];

// Small pure functions — each does ONE thing
const filterAdults   = (arr) => arr.filter((u) => u.age >= 18);
const capitaliseNames = (arr) => arr.map((u) => ({ ...u, name: u.name[0].toUpperCase() + u.name.slice(1) }));
const sortByAgeDesc  = (arr) => [...arr].sort((a, b) => b.age - a.age);
const toNames        = (arr) => arr.map((u) => u.name);

const processUsers = pipe(
  filterAdults,     // remove minors
  capitaliseNames,  // Priya, Riya
  sortByAgeDesc,    // oldest first
  toNames,          // just the names
);

console.log("processUsers(users) →", processUsers(users));
// ["Riya", "Priya"]

// Render results to the page
if (typeof document !== "undefined") {
  const out = document.getElementById("bonus-output");
  if (out) {
    out.textContent = JSON.stringify(processUsers(users), null, 2);
  }
}

// ─────────────────────────────────────────────
// Write results to page output elements
// ─────────────────────────────────────────────
if (typeof document !== "undefined") {
  const t1 = document.getElementById("task1-output");
  if (t1) {
    t1.textContent =
      "(1) (a,b) => a+b           → PURE\n" +
      "(2) () => Date.now()        → IMPURE  (depends on external clock)\n" +
      "(3) (arr) => arr.sort()     → IMPURE  (mutates the input array)\n" +
      "(4) (arr) => [...arr].sort()→ PURE\n" +
      "(5) logs then returns x     → IMPURE  (console.log is a side effect)";
  }

  const t2 = document.getElementById("task2-output");
  if (t2) {
    const pipe2 = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
    const addOne2 = (x) => x + 1;
    const square2 = (x) => x * x;
    const negate2 = (x) => -x;
    t2.textContent = "pipe(addOne, square, negate)(5) → " + pipe2(addOne2, square2, negate2)(5);
  }

  const t3 = document.getElementById("task3-output");
  if (t3) {
    const vol = (l) => (w) => (h) => l * w * h;
    t3.textContent = "volume(5)(3)(2) → " + vol(5)(3)(2);
  }
}