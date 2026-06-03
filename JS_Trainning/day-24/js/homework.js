// homework.js  (loaded as type="module" from homework.html)

// ─────────────────────────────────────────────
// Exercise 1: Barrel index.js for three utility modules
// Import everything from one path using export * (barrel).
// ─────────────────────────────────────────────
import {
  capitalize, truncate, isPalindrome,  // stringUtils
  unique, flatten, groupBy,            // arrayUtils
  clamp, lerp, roundTo,               // mathUtils
} from "./homework-barrel/index.js";

console.log("=== Exercise 1: Barrel imports ===");
console.log("capitalize('hello')        →", capitalize("hello"));       // Hello
console.log("truncate('A long sentence that goes on', 15) →", truncate("A long sentence that goes on", 15));
console.log("isPalindrome('racecar')    →", isPalindrome("racecar"));  // true
console.log("unique([1,2,2,3,3,3])     →", unique([1, 2, 2, 3, 3, 3]));
console.log("flatten([1,[2,[3]]])       →", flatten([1, [2, [3]]]));
console.log("groupBy products by type  →",
  groupBy([
    { name: "Pen",    type: "stationery" },
    { name: "Pencil", type: "stationery" },
    { name: "Chair",  type: "furniture"  },
  ], "type")
);
console.log("clamp(150, 0, 100)        →", clamp(150, 0, 100));  // 100
console.log("lerp(0, 100, 0.25)        →", lerp(0, 100, 0.25)); // 25
console.log("roundTo(3.14159, 3)       →", roundTo(3.14159, 3));// 3.142


// ─────────────────────────────────────────────
// Exercise 2: Dynamic import() — lazy feature
// ─────────────────────────────────────────────
console.log("\n=== Exercise 2: Dynamic import() ===");

async function loadHeavy() {
  console.log("Before import — heavy.js not fetched yet");
  const { compute, heavyTask } = await import("./heavy.js");
  console.log("compute()    →", compute());
  console.log("heavyTask()  →", heavyTask(500));
}

loadHeavy();

// Wire the lazy-load button in the HTML
if (typeof document !== "undefined") {
  const btn = document.getElementById("hw-lazy-btn");
  const out = document.getElementById("hw-lazy-output");
  if (btn && out) {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      btn.textContent = "Loading…";
      const { compute } = await import("./heavy.js");
      out.textContent = `compute() returned: "${compute()}"`;
      btn.textContent = "Loaded ✓";
    });
  }
}


// ─────────────────────────────────────────────
// Exercise 3: Singleton store shared across services
// ─────────────────────────────────────────────
import store from "./homework-cache.js";
import { saveUser,    getUser }    from "./homework-userService.js";
import { saveProduct, getProduct } from "./homework-productService.js";

console.log("\n=== Exercise 3: Singleton store ===");
saveUser(1,    { name: "Arjun",  email: "arjun@example.com" });
saveUser(2,    { name: "Sneha",  email: "sneha@example.com" });
saveProduct(10, { name: "Notebook", price: 45 });
saveProduct(11, { name: "Marker",   price: 25 });

// The store imported here is the same Map both services used
console.log("getUser(1)      →", getUser(1));
console.log("getProduct(10)  →", getProduct(10));
console.log("All store entries:");
for (const [key, value] of store) {
  console.log(" ", key, "→", value);
}

if (typeof document !== "undefined") {
  const out = document.getElementById("hw-store-output");
  if (out) {
    out.textContent = JSON.stringify([...store.entries()], null, 2);
  }
}


// ─────────────────────────────────────────────
// Exercise 4: Circular dependency — observe + fix
// (Cannot live-demo circular deps in the same file; explanation below)
// ─────────────────────────────────────────────
console.log("\n=== Exercise 4: Circular dependencies ===");
console.log(
  "Circular deps can't be shown in a single entry file.\n" +
  "Create a.js ↔ b.js manually, observe the undefined, then fix by\n" +
  "extracting the shared value to shared.js that both import from."
);