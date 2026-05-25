// ── Day 18 Homework ───────────────────────────────────────────────────────

// Exercise 1: wait(ms)
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

wait(500).then(() => wait(500)).then(() => console.log("1s"));

// Exercise 2: Flaky fetchData with chain
function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve({ id, data: "payload" });
      else reject(new Error(`fetchData(${id}) failed`));
    }, 300);
  });
}

fetchData(1)
  .then((r) => { console.log("step 1:", r); return fetchData(2); })
  .then((r) => { console.log("step 2:", r); return fetchData(3); })
  .then((r) => { console.log("step 3:", r); })
  .catch((e) => { console.error("caught:", e.message); });

// Exercise 3: Timeout with Promise.race
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Priya" }), 3000); // slow on purpose
  });
}

const timeout = wait(2000).then(() => Promise.reject(new Error("timeout")));

Promise.race([fetchUser(7), timeout])
  .then((user) => console.log("got user:", user))
  .catch((err)  => console.error("race lost:", err.message));
// → "race lost: timeout"

// Exercise 4: Promise.any with flaky fetches
function flaky(id, ms, failRate) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) reject(new Error(`source ${id} failed`));
      else resolve(`data from source ${id}`);
    }, ms);
  });
}

Promise.any([
  flaky(1, 100, 0.8),
  flaky(2, 300, 0.5),
  flaky(3, 500, 0.2),
])
  .then((first) => console.log("first success:", first))
  .catch((err)  => console.error("all failed:", err.errors.map(e => e.message)));