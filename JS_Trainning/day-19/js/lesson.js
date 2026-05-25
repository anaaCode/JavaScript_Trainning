// ── Day 19 Lesson ─────────────────────────────────────────────────────────

// Topic 1: async functions always return a Promise
async function greet() {
  return "Namaste";              // plain return value — wrapped automatically
}
console.log(greet());            // Promise { "Namaste" }
greet().then((msg) => console.log(msg));  // "Namaste"

// Topic 2: await pauses the async function
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Priya" }), 500);
  });
}

async function withAwait() {
  const user = await fetchUser(7);   // pauses HERE; rest of program keeps running
  console.log("got:", user);
}
withAwait();

// Topic 3: try / catch for async errors
function fetchUserMayFail(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 0) reject(new Error("Bad id"));
      else         resolve({ id, name: "Priya" });
    }, 300);
  });
}

async function showUser(id) {
  try {
    const user = await fetchUserMayFail(id);
    console.log("got:", user);
  } catch (err) {
    console.error("failed:", err.message);
  } finally {
    console.log("done");   // runs regardless of success or failure
  }
}
showUser(7);    // got: { id: 7, name: 'Priya' } / done
showUser(-1);   // failed: Bad id                / done

// Topic 4: Sequential vs Parallel
function fetchProduct(id) {
  return new Promise((res) => setTimeout(() => res({ id, price: 100 }), 1000));
}

async function slow() {
  const t0 = Date.now();
  const a = await fetchProduct(1);   // 1s
  const b = await fetchProduct(2);   // +1s
  const c = await fetchProduct(3);   // +1s
  console.log(`slow: ${Date.now() - t0}ms`);  // ~3000ms
}

async function fast() {
  const t0 = Date.now();
  const [a, b, c] = await Promise.all([  // all start at the same time
    fetchProduct(1),
    fetchProduct(2),
    fetchProduct(3),
  ]);
  console.log(`fast: ${Date.now() - t0}ms`);  // ~1000ms
}

// Topic 5: The forEach trap
const ids = [1, 2, 3];

// BUG — forEach ignores returned Promises; logs "end" before any "got"
async function bug() {
  ids.forEach(async (id) => {
    const p = await fetchProduct(id);
    console.log("got", p);
  });
  console.log("end");   // ← appears first!
}

// FIX 1 — for...of (sequential)
async function sequential() {
  for (const id of ids) {
    const p = await fetchProduct(id);
    console.log("got", p);
  }
  console.log("end");   // ← appears last, correctly
}

// FIX 2 — Promise.all + map (parallel, preferred)
async function parallel() {
  const results = await Promise.all(ids.map((id) => fetchProduct(id)));
  results.forEach((p) => console.log("got", p));
  console.log("end");
}

// Topic 6: Top-level await — valid only in ES modules
// (async IIFE is the equivalent for regular scripts)
(async () => {
  // pretend this is top-level await in a module:
  const config = await Promise.resolve({ theme: "dark" });
  console.log("Config loaded:", config);
})();

// Topic 7: Mixing async with .then — both styles work on the same function
async function getUserName(id) {
  const user = await fetchUser(id);
  return user.name;   // resolves the outer Promise with this value
}

getUserName(7).then((name) => console.log(".then style:", name));

(async () => {
  const name = await getUserName(7);
  console.log("await style:", name);
})();