// ── Day 20 Hands-On ───────────────────────────────────────────────────────

// ── Task 1: Predict the Output ────────────────────────────────────────────

console.log("1");                                 // sync
setTimeout(() => console.log("2"), 0);            // macrotask
Promise.resolve().then(() => console.log("3"));   // microtask
console.log("4");                                 // sync

// ACTUAL output: 1, 4, 3, 2
// "1" → sync    (call stack, runs immediately)
// "4" → sync    (call stack, runs immediately)
// "3" → microtask (Promise.then — drains before macrotask queue)
// "2" → macrotask (setTimeout — runs after all microtasks clear)

// ── Task 2: Two Promises and a Timer ──────────────────────────────────────

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));   // scheduled when C's .then callback runs

queueMicrotask(() => console.log("E"));

console.log("F");

// ACTUAL output: A, F, C, E, D, B
//
// Queue state after sync (A, F):
//   Microtask: [C, E]
//   Macrotask: [B]
//
// C runs → schedules D:
//   Microtask: [E, D]
//   Macrotask: [B]
//
// E runs:
//   Microtask: [D]
//   Macrotask: [B]
//
// D runs → microtasks empty, move to macrotask:
//   Macrotask: [B]
//
// B runs — loop tick complete.

// ── Task 3: Block the Loop ────────────────────────────────────────────────

function blockFor(ms) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {}   // busy-wait: holds the stack the entire time
}

const start = Date.now();

setTimeout(() => {
  // Scheduled for 100ms, but blocked from running until stack clears at ~2000ms
  console.log(`timer fired at ${Date.now() - start}ms`);
}, 100);

blockFor(2000);
console.log(`after block at ${Date.now() - start}ms`);

// Output:
//   after block at ~2000ms
//   timer fired at ~2000ms   ← delay is 2000ms, not 100ms

// ── Bonus: Microtask Storm ────────────────────────────────────────────────

for (let i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(`timer ${i}`);

    if (i === 3) {
      // Three microtasks injected during timer 3's macrotask run
      Promise.resolve().then(() => console.log("micro A"));
      Promise.resolve().then(() => console.log("micro B"));
      Promise.resolve().then(() => console.log("micro C"));
    }
  }, 0);
}

// Output:
//   timer 1
//   timer 2
//   timer 3
//   micro A    ← microtask queue drains fully before timer 4 gets its turn
//   micro B
//   micro C
//   timer 4
//   timer 5
//
// If micro A, B, C each scheduled MORE microtasks, the macrotask queue
// would starve indefinitely — timer 4 and 5 would never run.
// To intentionally yield to the macrotask queue, use setTimeout(fn, 0).