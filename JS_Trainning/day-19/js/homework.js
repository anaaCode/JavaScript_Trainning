// ── Day 19 Homework ───────────────────────────────────────────────────────

// Exercise 1: Convert .then chains to async/await
function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve({ id, data: "payload" });
      else reject(new Error(`fetchData(${id}) failed`));
    }, 300);
  });
}

async function runChain() {
  try {
    const r1 = await fetchData(1);
    console.log("step 1:", r1);
    const r2 = await fetchData(2);
    console.log("step 2:", r2);
    const r3 = await fetchData(3);
    console.log("step 3:", r3);
  } catch (err) {
    console.error("caught:", err.message);
  }
}

runChain();

// Exercise 2: fetchAllUsers — parallel vs sequential
function fetchUser(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: `User ${id}` }), 500)
  );
}

async function fetchAllUsers(ids) {
  const t0 = Date.now();
  const users = await Promise.all(ids.map((id) => fetchUser(id)));   // parallel
  console.log("parallel:", Date.now() - t0, "ms");   // ~500ms
  return users;
}

async function fetchAllUsersSeq(ids) {
  const t0 = Date.now();
  const users = [];
  for (const id of ids) {
    users.push(await fetchUser(id));   // one at a time
  }
  console.log("sequential:", Date.now() - t0, "ms");   // ~2000ms
  return users;
}

fetchAllUsers([1, 2, 3, 4]).then(console.log);
fetchAllUsersSeq([1, 2, 3, 4]).then(console.log);

// Exercise 3: withTimeout helper using Promise.race
function withTimeout(promise, ms) {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), ms)
  );
  return Promise.race([promise, timer]);   // whichever settles first wins
}

function slowFetch(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: "Priya" }), 1000)   // takes 1s
  );
}

async function runWithTimeout() {
  try {
    const user = await withTimeout(slowFetch(7), 500);   // 500ms limit
    console.log("got user:", user);
  } catch (err) {
    console.error("error:", err.message);   // "timeout"
  }
}

runWithTimeout();

// Exercise 4: Timed for...of loop
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function timedLoop() {
  const delays = [300, 100, 200];
  for (const ms of delays) {
    await wait(ms);
    console.log(`waited ${ms}ms`);
  }
  console.log("all done");
  // Output order is always 300 → 100 → 200 (input order, not smallest-first)
  // for...of awaits each step before moving to the next
}

timedLoop();