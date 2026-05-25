// ── Day 20 Homework ───────────────────────────────────────────────────────

// Exercise 1: Paper Predictions — run after predicting on paper

// Snippet A
console.log("X");
Promise.resolve().then(() => console.log("Y"));   // microtask
setTimeout(() => console.log("Z"), 0);            // macrotask
console.log("W");
// Output: X, W, Y, Z

// Snippet B
setTimeout(() => console.log("t1"), 0);    // macrotask 1
setTimeout(() => console.log("t2"), 0);    // macrotask 2
Promise.resolve().then(() => console.log("p1"));  // microtask 1
Promise.resolve().then(() => console.log("p2"));  // microtask 2
// Output: p1, p2, t1, t2
// Both microtasks drain before either macrotask runs.

// Snippet C
async function run() {
  console.log("a");          // sync — runs immediately when run() is called
  await Promise.resolve();   // suspends; continuation is a microtask
  console.log("b");          // microtask continuation
}
run();
setTimeout(() => console.log("c"), 0);   // macrotask
console.log("d");                        // sync
// Output: a, d, b, c
// "b" is an await continuation (microtask) — beats "c" (macrotask)

// Exercise 2: chunk() helper
function chunk(array, fn, chunkSize) {
  function processFrom(index) {
    const end = Math.min(index + chunkSize, array.length);
    for (let i = index; i < end; i++) {
      fn(array[i], i);
    }
    if (end < array.length) {
      setTimeout(() => processFrom(end), 0);   // yield to event loop between chunks
    } else {
      console.log("chunk: all done");
    }
  }
  processFrom(0);
}

const bigArray = Array.from({ length: 100_000 }, (_, i) => i);
let sum = 0;
chunk(bigArray, (val) => { sum += val; }, 10_000);
// Processes 100k items in 10 chunks of 10k, yielding between each.
// sum will be 4999950000 when done.

// Exercise 3: Prove await is a microtask
async function awaitDemo() {
  await Promise.resolve();
  console.log("await continuation");   // microtask — runs before setTimeout
}

awaitDemo();
setTimeout(() => console.log("setTimeout"), 0);
// Output: await continuation → setTimeout

// Exercise 4: X, W, Y, Z queue table
// (Work on paper, then verify by running)
console.log("X");
Promise.resolve().then(() => console.log("Y"));
setTimeout(() => console.log("Z"), 0);
console.log("W");
// Output: X, W, Y, Z
//
// Full queue trace:
//   log X  → stack (output: X)
//   .then Y → microtask queue: [Y]
//   setTimeout Z → macrotask queue: [Z]
//   log W  → stack (output: X, W)
//   — sync done —
//   drain microtasks: Y (output: X, W, Y)
//   drain macrotask:  Z (output: X, W, Y, Z)