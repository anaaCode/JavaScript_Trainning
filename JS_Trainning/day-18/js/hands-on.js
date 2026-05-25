// ── Day 18 Hands-On ───────────────────────────────────────────────────────

// Task 1: Sync vs Async Output
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
Promise.resolve().then(() => console.log("D"));
// Output: A, C, D, B
// Why D before B?
//   Promise .then → microtask queue (drained before next macrotask)
//   setTimeout   → macrotask queue (runs after all microtasks clear)

// Task 2: Promisify a Callback API
function delayLog(msg, ms, cb) {
  setTimeout(() => { console.log(msg); cb(null); }, ms);
}

function delayLogPromise(msg, ms) {
  return new Promise((resolve, reject) => {
    delayLog(msg, ms, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

delayLogPromise("1", 300)
  .then(() => delayLogPromise("2", 200))
  .then(() => delayLogPromise("3", 100))
  .then(() => console.log("sequence done"));

// Task 3: Promise.all in Action
function fetchPrice(item, ms) {
  const prices = { pen: 50, book: 200, bag: 800 };
  return new Promise((resolve) => {
    setTimeout(() => resolve({ item, price: prices[item] }), ms);
  });
}

const start = Date.now();
Promise.all([
  fetchPrice("pen",  300),
  fetchPrice("book", 500),
  fetchPrice("bag",  400),
]).then((results) => {
  const total   = results.reduce((sum, r) => sum + r.price, 0);
  const elapsed = Date.now() - start;
  console.log("Total:", total);        // 1050
  console.log("Time (ms):", elapsed);  // ~500 — slowest item, not sum
});

// Bonus: Promise.allSettled vs Promise.all
const ok1 = Promise.resolve("ok1");
const bad  = Promise.reject(new Error("fail"));
const ok2  = Promise.resolve("ok2");

Promise.all([ok1, bad, ok2])
  .then((v) => console.log("all:", v))
  .catch((e) => console.log("all caught:", e.message));
// → "all caught: fail"

Promise.allSettled([ok1, bad, ok2])
  .then((results) => results.forEach((r) => {
    console.log(r.status, r.value ?? r.reason?.message);
  }));
// → fulfilled ok1 | rejected fail | fulfilled ok2