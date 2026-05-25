// ── Day 19 Hands-On ───────────────────────────────────────────────────────

// ── Task 1: Convert .then to async/await ─────────────────────────────────

function fetchUser(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: "Priya" }), 300)
  );
}
function fetchOrders(userId) {
  return new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 101 }, { id: 102 }]), 300)
  );
}

async function showOrders(id) {
  try {
    const user   = await fetchUser(id);
    const orders = await fetchOrders(user.id);
    console.log("Order count:", orders.length);   // 2
  } catch (err) {
    console.error("showOrders failed:", err.message);
  }
}

showOrders(7);

// ── Task 2: Sequential vs Parallel Timing ────────────────────────────────

function fetchPrice(id) {
  return new Promise((res) => setTimeout(() => res({ id, price: 100 }), 500));
}

async function slow() {
  const t0 = Date.now();
  const a = await fetchPrice(1);   // 500ms
  const b = await fetchPrice(2);   // +500ms
  const c = await fetchPrice(3);   // +500ms
  console.log("slow:", Date.now() - t0, "ms");   // ~1500ms
}

async function fast() {
  const t0 = Date.now();
  const [a, b, c] = await Promise.all([   // all three fire together
    fetchPrice(1),
    fetchPrice(2),
    fetchPrice(3),
  ]);
  console.log("fast:", Date.now() - t0, "ms");   // ~500ms
}

slow();
fast();

// ── Task 3: Fix the forEach Trap ──────────────────────────────────────────

const ids = [1, 2, 3];

// BUG — forEach returns immediately; "end" appears before any price
async function buggy() {
  console.log("start");
  ids.forEach(async (id) => {
    const p = await fetchPrice(id);
    console.log("got", p);   // ← too late; forEach already finished
  });
  console.log("end");         // ← appears FIRST
}

// FIX 1 — for...of: awaits each iteration in order (~1500ms)
async function withForOf() {
  console.log("start");
  for (const id of ids) {
    const p = await fetchPrice(id);
    console.log("got", p);
  }
  console.log("end");   // ← appears correctly after all prices
}

// FIX 2 — Promise.all + map: parallel and correctly awaited (~500ms)
async function withPromiseAll() {
  console.log("start");
  const results = await Promise.all(ids.map((id) => fetchPrice(id)));
  results.forEach((p) => console.log("got", p));
  console.log("end");
}

buggy();
// withForOf();
// withPromiseAll();

// ── Bonus: retry ──────────────────────────────────────────────────────────

function flaky() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve("success!");
      else reject(new Error("random failure"));
    }, 200);
  });
}

async function retry(fn, attempts) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      const result = await fn();
      console.log(`Succeeded on attempt ${i}`);
      return result;
    } catch (err) {
      lastErr = err;
      console.log(`Attempt ${i} failed: ${err.message}`);
    }
  }
  throw lastErr;   // re-throw after all attempts exhausted
}

retry(flaky, 5)
  .then((val) => console.log("Final result:", val))
  .catch((err) => console.error("All retries failed:", err.message));