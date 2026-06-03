// homework.js  (loaded as type="module" from homework.html)

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const pipe    = (...fns) => (x) => fns.reduce     ((acc, fn) => fn(acc), x);
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);


// ─────────────────────────────────────────────
// Exercise 1: compose from scratch — verify ordering vs pipe
// ─────────────────────────────────────────────
console.log("=== Exercise 1: compose vs pipe ===");

const addOne = (x) => x + 1;
const square = (x) => x * x;
const negate = (x) => -x;

// pipe(addOne, square, negate)(5)
//   addOne → 6, square → 36, negate → -36
const withPipe    = pipe(addOne, square, negate);
console.log("pipe(addOne, square, negate)(5)    →", withPipe(5));   // -36

// compose(addOne, square, negate)(5) — RIGHT to LEFT
//   negate(5) → -5, square(-5) → 25, addOne(25) → 26
const withCompose = compose(addOne, square, negate);
console.log("compose(addOne, square, negate)(5) →", withCompose(5)); // 26

console.log("Note: compose reads right-to-left (math style).");
console.log("      pipe    reads left-to-right  (top-down style).");


// ─────────────────────────────────────────────
// Exercise 2: Refactor a mutating function into a pure version
// ─────────────────────────────────────────────
console.log("\n=== Exercise 2: Pure refactor ===");

// IMPURE — mutates original
function addTagImpure(tags, newTag) {
  tags.push(newTag);   // ← mutation
  return tags;
}

// PURE — returns a new array
function addTagPure(tags, newTag) {
  return [...tags, newTag];
}

const original = ["js", "css"];
const updated  = addTagPure(original, "html");

console.log("original after addTagPure →", original);  // ["js", "css"] — unchanged ✓
console.log("updated                   →", updated);   // ["js", "css", "html"]


// ─────────────────────────────────────────────
// Exercise 3: curry(fn) — generalised curry for N-ary functions
// ─────────────────────────────────────────────
console.log("\n=== Exercise 3: curry(fn) ===");

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);      // enough args — call the original
    }
    return (...more) => curried(...args, ...more);  // collect more args
  };
}

function add(a, b, c) { return a + b + c; }

const curriedAdd = curry(add);
console.log("curry(add)(1)(2)(3)     →", curriedAdd(1)(2)(3));      // 6
console.log("curry(add)(1, 2)(3)     →", curriedAdd(1, 2)(3));      // 6
console.log("curry(add)(1)(2, 3)     →", curriedAdd(1)(2, 3));      // 6
console.log("curry(add)(1, 2, 3)     →", curriedAdd(1, 2, 3));      // 6


// ─────────────────────────────────────────────
// Exercise 4: Pipeline — average order value (excluding GST)
// ─────────────────────────────────────────────
console.log("\n=== Exercise 4: Average order value pipeline ===");

const orders = [
  { id: 1, item: "Pen",  price: 50,  quantity: 2 },
  { id: 2, item: "Book", price: 200, quantity: 1 },
  { id: 3, item: "Bag",  price: 800, quantity: 1 },
  { id: 4, item: "Mug",  price: 150, quantity: 3 },
];

// Small pure functions
const toLineTotals = (arr) => arr.map((o) => o.price * o.quantity);
const sum          = (arr) => arr.reduce((a, b) => a + b, 0);
const average      = (arr) => sum(arr) / arr.length;
const round2       = (n)   => Math.round(n * 100) / 100;
const formatINR    = (n)   => `₹${n.toLocaleString("en-IN")}`;

// line totals: [100, 200, 800, 450]  → sum = 1550 → avg = 387.5
const avgOrderValue = pipe(
  toLineTotals,   // [100, 200, 800, 450]
  average,        // 387.5
  round2,         // 387.5
  formatINR,      // "₹387.5"
);

console.log("Average order value (excl. GST) →", avgOrderValue(orders));  // ₹387.5

// Render to page
if (typeof document !== "undefined") {
  const out = document.getElementById("hw-pipeline-output");
  if (out) {
    out.textContent = avgOrderValue(orders);
  }
}

// ─────────────────────────────────────────────
// Write results to page output elements
// ─────────────────────────────────────────────
if (typeof document !== "undefined") {
  const e1 = document.getElementById("hw-compose-output");
  if (e1) {
    const c = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
    const a1 = (x) => x + 1, sq = (x) => x * x, neg = (x) => -x;
    e1.textContent =
      "compose(addOne, square, negate)(5) → " + c(a1, sq, neg)(5) + "\n" +
      "pipe   (addOne, square, negate)(5) → " + pipe(a1, sq, neg)(5) + "\n" +
      "compose runs right→left; pipe runs left→right.";
  }

  const e2 = document.getElementById("hw-pure-output");
  if (e2) {
    const orig = ["js", "css"];
    const upd  = [...orig, "html"];
    e2.textContent =
      "original after addTagPure → " + JSON.stringify(orig) + "\n" +
      "updated                   → " + JSON.stringify(upd);
  }

  const e3 = document.getElementById("hw-curry-output");
  if (e3) {
    e3.textContent =
      "curriedAdd(1)(2)(3)   → " + curriedAdd(1)(2)(3) + "\n" +
      "curriedAdd(1, 2)(3)   → " + curriedAdd(1, 2)(3) + "\n" +
      "curriedAdd(1)(2, 3)   → " + curriedAdd(1)(2, 3) + "\n" +
      "curriedAdd(1, 2, 3)   → " + curriedAdd(1, 2, 3);
  }
}