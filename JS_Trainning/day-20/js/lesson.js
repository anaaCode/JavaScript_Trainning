// ── Day 20 Lesson ─────────────────────────────────────────────────────────

// Topic 1: JavaScript is Single-Threaded
// One call stack — async work is delegated to the runtime, not handled in parallel.

console.log("start");          // runs on the stack immediately
setTimeout(() => {
  console.log("timer");        // handed off to Web API → macrotask queue → stack later
}, 1000);
console.log("end");            // runs on the stack immediately
// Output: start → end → (1s later) timer

// Topic 2: Runtime Architecture
// Engine (stack + heap) + Web APIs + Microtask Queue + Macrotask Queue + Event Loop
// The diagram lives in the lesson HTML — refer to it while reading this code.

// Topic 3: What the Event Loop Does
// Algorithm (runs forever):
//   1. Wait for call stack to be empty
//   2. Drain ALL microtasks (even ones added during the drain)
//   3. Take ONE macrotask → run it
//   4. Repeat

// Topic 4: Why setTimeout(0) runs last
console.log("1");                                 // sync → stack
setTimeout(() => console.log("2"), 0);            // macrotask queue
Promise.resolve().then(() => console.log("3"));   // microtask queue
console.log("4");                                 // sync → stack

// Output: 1, 4, 3, 2
// Sync drains first → microtasks drain → one macrotask runs

// Topic 5: Microtask vs Macrotask — predict this before running
console.log("A");

setTimeout(() => console.log("B"), 0);            // macrotask

Promise.resolve()
  .then(() => console.log("C"))                   // microtask 1
  .then(() => console.log("D"));                  // microtask 2 (queued when C runs)

queueMicrotask(() => console.log("E"));           // microtask 3

console.log("F");

// Output: A, F, C, E, D, B
// Sync: A, F
// Microtasks: C runs → schedules D; E runs; D runs  (all before B)
// Macrotask: B

// Topic 6: Don't Block the Loop
function blockFor(ms) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {}   // busy-wait — stack is occupied the entire time
}

setTimeout(() => console.log("timer fires"), 0);
blockFor(3000);              // page is frozen for 3 seconds
console.log("after block");

// Output: (3s freeze) → "after block" → "timer fires"
// The timer callback was ready at 0ms but had nowhere to run until the stack cleared.

// Topic 7: Practical Implications

// await continuation is a microtask — same priority as .then
async function demo() {
  console.log("before await");
  await Promise.resolve();           // suspends here, schedules continuation as microtask
  console.log("after await");        // runs as microtask — before any macrotask
}
setTimeout(() => console.log("setTimeout"), 0);
demo();
// Output: before await → after await → setTimeout

// Breaking heavy work into chunks — yield to the loop between chunks
function processChunk(items, index) {
  const end = Math.min(index + 1000, items.length);
  for (let i = index; i < end; i++) {
    // do work on items[i]
  }
  if (end < items.length) {
    setTimeout(() => processChunk(items, end), 0);  // hand back control, continue next tick
  }
}