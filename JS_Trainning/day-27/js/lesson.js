// Day 27 – Performance & Best Practices (lesson)
// Advanced JS · Session 15 of 15 — FINAL

// ─────────────────────────────────────────────
// Topic 1: Debounce vs Throttle
// ─────────────────────────────────────────────

// DEBOUNCE — waits until the user stops firing events, then fires ONCE.
// Use for: search-as-you-type, autosave, window resize handlers.

// function debounce(fn, delay) {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn.apply(this, args), delay);
//   };
// }

// THROTTLE — fires at most once per N ms, no matter how many events arrive.
// Use for: scroll, mousemove, drag handlers.

// function throttle(fn, delay) {
//   let lastCall = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - lastCall < delay) return;
//     lastCall = now;
//     fn.apply(this, args);
//   };
// }

// Usage — search input with 300 ms debounce:
// const handleSearch = debounce((q) => {
//   console.log("searching for:", q);   // only fires after typing stops for 300ms
// }, 300);
// input.addEventListener("input", (e) => handleSearch(e.target.value));

// Usage — scroll throttled to 100 ms:
// const onScroll = throttle(() => {
//   console.log("scroll at", window.scrollY);
// }, 100);
// window.addEventListener("scroll", onScroll);

// Follow-along — how many times does this fire?
// const log = debounce(() => console.log("fired"), 100);
// log(); log(); log();   // ← timer reset each time
// // wait 200ms
// log();
// Answer: TWICE — once after the first burst settles, once after the final call settles.


// ─────────────────────────────────────────────
// Topic 2: Memory Leaks — The Big Four
// ─────────────────────────────────────────────

// 1. Forgotten globals
// function leaky() {
//   user = { name: "Priya" };   // no let/const → attaches to globalThis
// }
// FIX: always declare with let/const. Use "use strict" or ES modules (strict by default).

// 2. Forgotten timers / intervals
// const id = setInterval(() => doStuff(), 1000);
// // If the component owning this never calls clearInterval(id), it leaks.
// FIX: always pair setInterval/setTimeout with a cleanup call.
// clearInterval(id);

// 3. Detached DOM nodes held by event listeners
// const btn = document.querySelector("#save");
// btn.addEventListener("click", () => doSave());
// btn.remove();
// // btn is removed from DOM but the listener still holds a reference in JS.
// FIX: remove the listener before removing the element, or use AbortController:
// const ctrl = new AbortController();
// btn.addEventListener("click", handler, { signal: ctrl.signal });
// ctrl.abort();   // cleanly removes the listener

// 4. Closures holding large data
// function makeHandler(largeData) {
//   return function () {
//     return largeData.length;   // closure keeps largeData alive forever
//   };
// }
// FIX: extract only what you need; don't let closures capture references unnecessarily.
// function makeHandler(largeData) {
//   const len = largeData.length;   // capture only the scalar
//   return function () { return len; };
// }


// ─────────────────────────────────────────────
// Topic 3: Garbage Collection
// ─────────────────────────────────────────────

// JS uses TRACING GC (mark-and-sweep).
//   • From roots (globals, call stack, active closures) the engine walks every
//     reachable object. Anything not reached is eligible for collection.
//   • Modern engines use GENERATIONAL GC:
//       Young generation — short-lived objects, collected frequently and fast.
//       Old  generation  — long-lived objects, collected less often.
// You don't call the GC directly. You control it by controlling REACHABILITY.
// Nullifying a reference (myRef = null) lets the engine collect that object
// when nothing else points to it.


// ─────────────────────────────────────────────
// Topic 4: Chrome DevTools Performance Tab
// ─────────────────────────────────────────────

// Key sections in the Performance panel:
//   Frames  → each browser frame; aim for 60 fps (≤ 16.7 ms/frame)
//   Main    → call stack over time — find long tasks and slow functions
//   Network → request timing
//   Memory  → heap size and GC pauses

// User Timing API — mark your own events so they appear in recordings:
// performance.mark("compute-start");
// expensiveComputation();
// performance.mark("compute-end");
// performance.measure("compute", "compute-start", "compute-end");
// // The "compute" band appears in the DevTools Performance timeline.


// ─────────────────────────────────────────────
// Topic 5: Security — XSS, eval, Sanitisation
// ─────────────────────────────────────────────

// 1. XSS via innerHTML — all-time #1 web vulnerability
// const userComment = '<img src=x onerror="alert(\'pwned\')">';
//
// // UNSAFE — executes attacker's onerror
// commentEl.innerHTML = userComment;
//
// // SAFE — treats content as plain text, no execution
// commentEl.textContent = userComment;
//
// // If you MUST insert HTML, sanitise first (DOMPurify is the standard):
// commentEl.innerHTML = DOMPurify.sanitize(userComment);

// 2. eval() and Function constructor — never use with user input
// const userExpr = "alert('exploited')";
// // NEVER: eval(userExpr);
// // NEVER: new Function(userExpr)();
// // Both execute arbitrary code with full page privileges.

// 3. Safe JSON parsing
// const safe = JSON.parse(serverJSON);   // ✅ safe — no code execution
// // eval(serverJSON);                   // ❌ never do this

// ⚠️ React note:
//   React escapes {value} by default — safe.
//   dangerouslySetInnerHTML bypasses that — the name is the warning.
//   Always sanitise with DOMPurify before passing to dangerouslySetInnerHTML.


// ─────────────────────────────────────────────
// Topic 6: ESLint & Prettier
// ─────────────────────────────────────────────

// Without lint: ten developers, ten styles, hundreds of bug-prone patterns.
// With ESLint:
//   • catches unused vars, no-undef, prefer-const
//   • catches == vs === (coercion bugs)
//   • catches React Hooks rules violations
//   • catches accessibility issues (jsx-a11y plugin)
// Prettier auto-formats on save so you never argue about indentation.

// Quick project setup:
//   npm i -D eslint prettier eslint-config-prettier
//   npx eslint --init
//   echo '{}' > .prettierrc

// VS Code settings.json:
//   "editor.formatOnSave": true,
//   "editor.codeActionsOnSave": { "source.fixAll.eslint": true }


// ─────────────────────────────────────────────
// Topic 7: Best Practices Recap
// ─────────────────────────────────────────────

// Habit                         Why
// ───────────────────────────────────────────────────────────────
// const by default              Predictability — signals "won't change"
// === not ==                    Avoids coercion surprises
// Prefer immutable updates      Predictable change tracking
// Small, pure functions         Testable and composable
// ES modules                    Privacy, singletons, tree-shaking
// try/catch around await        Don't silently drop async failures
// Don't block the event loop    Chunk heavy work with setTimeout(0) or workers
// textContent over innerHTML    XSS is #1 web vulnerability
// ESLint + Prettier on save     Free quality — zero discipline required
// Read other people's code      Fastest growth lever after building things