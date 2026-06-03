// ─────────────────────────────────────────────
// Topic 1: Named vs Default Exports
// ─────────────────────────────────────────────

// utils.js — named exports (many per file, auto-completable, tree-shakeable)
//   export function formatPrice(p) { return `₹${p}`; }
//   export function gst(p, rate = 18) { return p * rate / 100; }
//   export const TAX_RATE = 18;

// main.js — named import
//   import { formatPrice, gst, TAX_RATE } from "./utils.js";
//   console.log(formatPrice(100));   // ₹100
//   console.log(gst(100));           // 18
//   console.log(TAX_RATE);           // 18

// Card.js — single default export (one "hero" per file)
//   export default function Card({ title }) { return title; }

// main.js — any name works on default import (common bug source!)
//   import Card     from "./Card.js";      // ✓ conventional
//   import Whatever from "./Card.js";      // ✓ also valid — confusing!

// Comparison
//   Named   → auto-completable, rename tracked, many per file, better tree-shaking
//   Default → one per file, rename is manual, best for a single "main" export


// ─────────────────────────────────────────────
// Topic 2: Aliasing & Namespace Imports
// ─────────────────────────────────────────────

// Rename on import
//   import { formatPrice as fp } from "./utils.js";
//   fp(100);   // same as formatPrice(100)

// Rename on export (re-export alias)
//   export { formatPrice as format } from "./utils.js";

// Namespace — pull EVERYTHING under one object
//   import * as utils from "./utils.js";
//   console.log(utils.formatPrice(100));   // ₹100
//   console.log(utils.gst(100));           // 18
//   console.log(utils.TAX_RATE);           // 18

// Follow-along — predict the output:
//   utils.js:   export const a = 1;  export const b = 2;
//   main.js:    import * as u from "./utils.js";
//               console.log(u.a + u.b);   // → 3
//               console.log(u.c);          // → undefined  (c doesn't exist)

// ⚠️ Namespace defeats tree-shaking when you access by computed key:
//   utils[someName]()  — bundler can't know which exports are unused


// ─────────────────────────────────────────────
// Topic 3: Barrel Files — Single Import Path
// ─────────────────────────────────────────────

// components/index.js — the barrel
//   export { default as Button } from "./Button.js";
//   export { default as Card }   from "./Card.js";
//   export { default as Modal }  from "./Modal.js";
//   export * from "./hooks.js";                        // re-export ALL named
//   export { useForm, useDebounce } from "./hooks.js"; // selective re-export

// App.js — one clean import instead of three separate paths
//   import { Button, Card, Modal } from "./components";

// Without a barrel you'd need:
//   import Button from "./components/Button.js";
//   import Card   from "./components/Card.js";
//   import Modal  from "./components/Modal.js";

// ⚠️ A poorly tree-shaken barrel can pull in code you didn't use.
//    Modern bundlers usually handle it; be careful inside libraries.


// ─────────────────────────────────────────────
// Topic 4: Dynamic import()
// ─────────────────────────────────────────────

// Static — loaded and evaluated before any code in this file runs
//   import { gst } from "./utils.js";

// Dynamic — returns a Promise, loaded on demand
//   async function showSettings() {
//     const { Settings } = await import("./Settings.js");
//     Settings.render();
//   }

// Conditional — only download the big library when the user needs it
//   button.addEventListener("click", async () => {
//     const Chart = await import("./BigChartLibrary.js");
//     Chart.draw();
//   });

// React.lazy uses dynamic import() under the hood:
//   const Settings = React.lazy(() => import("./Settings.js"));


// ─────────────────────────────────────────────
// Topic 5: Live Bindings & Singletons
// ─────────────────────────────────────────────

// counter.js
//   export let count = 0;
//   export function inc() { count++; }

// main.js
//   import { count, inc } from "./counter.js";
//   console.log(count);   // 0
//   inc();
//   console.log(count);   // 1  ← live binding — sees the updated value
//
//   count = 99;           // TypeError — imports are read-only bindings

// Singleton — every importer of the same module gets the SAME instance
// cache.js
//   const cache = new Map();
//   export default cache;

// userService.js — writes to the shared cache
//   import cache from "./cache.js";
//   cache.set("user:1", { name: "Priya" });

// productService.js — writes to the same cache
//   import cache from "./cache.js";
//   cache.set("product:1", { name: "Pen" });

// main.js — sees both writes
//   import cache from "./cache.js";
//   console.log(cache.get("user:1"));      // { name: "Priya" }
//   console.log(cache.get("product:1"));   // { name: "Pen" }


// ─────────────────────────────────────────────
// Topic 6: Circular Dependencies
// ─────────────────────────────────────────────

// a.js
//   import { fromB } from "./b.js";
//   export const fromA = "I am A";
//   console.log("a sees fromB =", fromB);   // may be undefined at first run

// b.js
//   import { fromA } from "./a.js";
//   export const fromB = "I am B";
//   console.log("b sees fromA =", fromA);   // may be undefined

// Symptom: one import reads as undefined.
// Fix 1 — Extract shared value to a third module (shared.js) both import from.
// Fix 2 — Lazy access: read the value inside a function, not at module top level.
// Fix 3 — ESLint plugin `import/no-cycle` catches these automatically.


// ─────────────────────────────────────────────
// Topic 7: Bundlers — Webpack, Vite, Rollup
// ─────────────────────────────────────────────

// What every bundler does (steps):
//   1. Read entry file (e.g. main.js)
//   2. Walk the import graph — find every imported module recursively
//   3. Tree-shake — drop exports that are never imported anywhere
//   4. Combine + minify — merge into one or more output bundles
//   5. Split chunks — each dynamic import() becomes a separate lazy chunk
//   6. Generate sourcemaps — map minified code back to original source

// Tool comparison:
//   Vite    → lightning-fast dev server (esbuild), Rollup for production builds
//   Webpack → mature, huge plugin ecosystem, best for large established apps
//   Rollup  → cleanest tree-shaking, smallest output, ideal for library authoring
//   esbuild → raw speed, simpler config, used inside Vite
//   Parcel  → zero-config, great for simple projects