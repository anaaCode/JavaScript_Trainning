// Day 27 – Performance & Best Practices (hands-on)

// ─────────────────────────────────────────────
// Task 1: Implement debounce
// ─────────────────────────────────────────────

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Simulate a search input: 5 keystrokes 50 ms apart, then a 500 ms gap, then 2 more.
const handleSearch = debounce((q) => {
  console.log("search fired →", q);
}, 300);

// Burst 1: keystrokes 50 ms apart — only the LAST one should fire after 300 ms silence.
["r", "re", "rea", "reac", "react"].forEach((q, i) => {
  setTimeout(() => handleSearch(q), i * 50);
});

// Gap of 500 ms, then burst 2 — fires once more.
setTimeout(() => handleSearch("react hooks"), 800);
setTimeout(() => handleSearch("react hooks a"), 850);

// Expected console output (approx):
//   search fired → react          (after burst 1 settles, ~550 ms)
//   search fired → react hooks a  (after burst 2 settles, ~1150 ms)


// ─────────────────────────────────────────────
// Task 2: Implement throttle
// ─────────────────────────────────────────────

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn.apply(this, args);
  };
}

// Simulate 10 rapid "scroll" events in a tight loop — throttled to 200 ms.
const onScroll = throttle((pos) => {
  console.log("scroll handler fired at position →", pos);
}, 200);

console.log("--- throttle test ---");
for (let i = 0; i < 10; i++) {
  onScroll(i * 100);   // all called synchronously — only the FIRST gets through
}
// Expected: "scroll handler fired at position → 0"  (only once — remaining calls skipped)


// ─────────────────────────────────────────────
// Task 3: Spot the Memory Leaks
// ─────────────────────────────────────────────

// (a) setInterval(updateClock, 1000) inside a SPA component that unmounts.
//
//     LEAK — the interval keeps running after the component is gone.
//     updateClock and the component's DOM refs stay in memory.
//     FIX: return () => clearInterval(id) from useEffect (React) or call clearInterval
//     in a disconnectedCallback / cleanup function.

// (b) const handler = () => doStuff();
//     btn.addEventListener("click", handler);
//     btn.remove();
//
//     LEAK — btn is detached from the DOM but the JS listener still holds a reference
//     to it. Both btn and handler stay in memory.
//     FIX: call btn.removeEventListener("click", handler) before btn.remove(),
//     or use AbortController.

// (c) function () { msg = "hello"; }  (no let/const)
//
//     LEAK — `msg` silently becomes a global (window.msg in browsers).
//     Globals are roots, so they are never garbage collected.
//     FIX: declare with let/const. Use "use strict" (strict mode throws a ReferenceError
//     on undeclared assignments). ES modules are strict by default.

// (d) useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [])
//
//     SAFE — React calls the cleanup function (the returned arrow) when the component
//     unmounts, which clears the interval. No leak.


// ─────────────────────────────────────────────
// Bonus: Sanitise User Input
// ─────────────────────────────────────────────

// safeText strips all HTML tags, returning only the visible text content.
// Works in browser environments — relies on a temporary DOM element.
function safeText(html) {
  const div = document.createElement("div");
  div.textContent = html;   // set as text — no parsing, no execution
  return div.textContent;
}

// Test
const malicious = '<img src=x onerror="alert(1)"> hello';
const clean = safeText(malicious);

console.log("--- safeText ---");
console.log("input :", malicious);
console.log("output:", clean);
// output: <img src=x onerror="alert(1)"> hello  (tags are literal text, not parsed)

// Insert safely:
// const el = document.getElementById("output");
// el.textContent = clean;   // ← safe: no HTML parsing, no script execution
// Note: do NOT use el.innerHTML = clean even after safeText,
// because the returned string still contains tag characters as text.
// textContent always treats its value as plain text.