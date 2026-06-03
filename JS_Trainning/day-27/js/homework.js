// Day 27 – Performance & Best Practices (homework)
// Advanced JS · Capstone Homework

// ─────────────────────────────────────────────
// Task 1: leading-edge debounce
// ─────────────────────────────────────────────

// Standard debounce fires AFTER silence. A leading-edge variant fires
// IMMEDIATELY on the first call, then ignores subsequent calls until quiet.
// Useful for "submit" buttons you want to respond instantly but prevent double-clicks.

function debounceLeading(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      fn.apply(this, args);   // fire immediately on first call
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;           // reset so next burst fires immediately again
    }, delay);
  };
}

// Test: 4 rapid calls then a gap then 2 more.
const submit = debounceLeading((label) => {
  console.log("submit →", label);
}, 300);

[1, 2, 3, 4].forEach((n) => submit(`call-${n}`));   // only call-1 fires immediately
setTimeout(() => submit("call-5"), 700);              // fires immediately (new burst)
setTimeout(() => submit("call-6"), 750);              // ignored (within the 300 ms window)

// Expected:
//   submit → call-1
//   submit → call-5


// ─────────────────────────────────────────────
// Task 2: memoize
// ─────────────────────────────────────────────

// Memoization caches the result of a pure function so identical inputs
// are only computed once. This is a performance pattern that avoids
// redundant expensive work.

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("cache hit →", key);
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Simulate an expensive computation.
function slowSquare(n) {
  // pretend this takes time
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log("--- memoize ---");
console.log(fastSquare(4));   // computed: 16
console.log(fastSquare(4));   // cache hit → [4], returns 16
console.log(fastSquare(7));   // computed: 49
console.log(fastSquare(7));   // cache hit → [7], returns 49


// ─────────────────────────────────────────────
// Task 3: Safe innerHTML wrapper
// ─────────────────────────────────────────────

// Write a setHTML(element, html) function that:
//   a) strips script tags and event attributes from `html`,
//   b) sets the result via innerHTML.
// This is a minimal manual sanitiser — in production always use DOMPurify.

function setHTML(element, html) {
  // Step 1: remove <script>...</script> blocks entirely.
  let safe = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  // Step 2: remove all on* event attributes (e.g., onerror, onclick).
  safe = safe.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, "");
  safe = safe.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, "");
  element.innerHTML = safe;
}

// Test (works in browser; in Node this section is skipped gracefully)
if (typeof document !== "undefined") {
  const div = document.createElement("div");
  setHTML(div, '<p>Hello</p><script>alert("xss")<\/script><img src=x onerror="alert(1)">');
  console.log("--- setHTML output ---");
  console.log(div.innerHTML);
  // Expected: <p>Hello</p><img src="x">  (script gone, onerror gone)
} else {
  console.log("--- setHTML test skipped (Node environment — no DOM) ---");
}


// ─────────────────────────────────────────────
// Task 4: Benchmark with performance.now()
// ─────────────────────────────────────────────

// Measure the time difference between a naive approach and an optimised one.
// Here: building a string by concatenation vs. using an array join.

function buildStringConcat(n) {
  let s = "";
  for (let i = 0; i < n; i++) s += "x";
  return s;
}

function buildStringJoin(n) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push("x");
  return arr.join("");
}

const N = 100_000;

const t0 = performance.now();
buildStringConcat(N);
const t1 = performance.now();
buildStringJoin(N);
const t2 = performance.now();

console.log("--- benchmark ---");
console.log(`concat: ${(t1 - t0).toFixed(3)} ms`);
console.log(`join  : ${(t2 - t1).toFixed(3)} ms`);
// Results vary by engine, but join is often faster for large N because
// V8 can pre-allocate the final buffer rather than reallocating on each +.


// ─────────────────────────────────────────────
// Bonus: Capstone checklist review
// ─────────────────────────────────────────────

// Review your capstone project against this list and note findings as comments.

// ✅ At least 3 source files, ES modules, fetch from a public API, render to DOM.
//    → (Your project check here)

// ✅ ESLint + Prettier configured — every save auto-formats.
//    → (Your project check here)

// ✅ Debounce on at least one input.
//    → (Which input? What delay did you choose and why?)

// ✅ Promise.all on at least one fetch.
//    → (Which endpoints? What did you gain vs sequential awaits?)

// ✅ Profiled in Chrome DevTools Performance — one improvement found and applied.
//    → (What was the bottleneck? What did you change?)

// ✅ Pushed to GitHub with a README.
//    → (Link here)

// ✅ Read 3 issues / PRs in a popular JS library (date-fns, axios, zod, etc.).
//    → (What did you learn from each one?)