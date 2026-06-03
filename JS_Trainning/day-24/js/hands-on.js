// hands-on.js  (loaded as type="module" from hands-on.html)

// ─────────────────────────────────────────────
// Task 1: Multiple Named Exports + Barrel
// Import all three math functions from the barrel in ONE line.
// ─────────────────────────────────────────────
import { add, multiply, divide } from "./math/index.js";

console.log("=== Task 1: Barrel import ===");
console.log("add(3, 4)       →", add(3, 4));       // 7
console.log("multiply(3, 4)  →", multiply(3, 4));  // 12
console.log("divide(10, 2)   →", divide(10, 2));   // 5


// ─────────────────────────────────────────────
// Task 2: Default + Named in the Same Import Statement
// ─────────────────────────────────────────────
import Button, { ButtonStyles } from "./Button.js";

console.log("\n=== Task 2: Default + Named import ===");
console.log("ButtonStyles →", ButtonStyles);

// Render the button into the page (works in browser)
if (typeof document !== "undefined") {
  const container = document.getElementById("task2-output");
  if (container) {
    const btn = Button({ label: "Click me!", onClick: () => alert("Button works!") });
    container.appendChild(btn);
  }
}


// ─────────────────────────────────────────────
// Task 3: Dynamic import() — load heavy.js on demand
// ─────────────────────────────────────────────
console.log("\n=== Task 3: Dynamic import() ===");

async function loadAndRun() {
  console.log("Before dynamic import — heavy.js not loaded yet");
  const mod = await import("./heavy.js");   // fetched only now
  console.log("compute() →", mod.compute());
  console.log("heavyTask() →", mod.heavyTask());
}

loadAndRun();

// Wire the button in the HTML to trigger the dynamic import
if (typeof document !== "undefined") {
  const btn = document.getElementById("task3-btn");
  const out = document.getElementById("task3-output");
  if (btn && out) {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      btn.textContent = "Loading…";
      const mod = await import("./heavy.js");
      out.textContent = mod.compute();
      btn.textContent = "Loaded ✓";
    });
  }
}


// ─────────────────────────────────────────────
// Bonus: Singleton Cache
// ─────────────────────────────────────────────
import cache from "./cache.js";
import { saveUser }    from "./userService.js";
import { saveProduct } from "./productService.js";

console.log("\n=== Bonus: Singleton Cache ===");
saveUser(1, { name: "Priya",   role: "admin" });
saveProduct(42, { name: "Pen", price: 20 });

// The cache imported here is the SAME Map that both services wrote to
console.log("cache entries:", [...cache.entries()]);
// [["user:1", { name:"Priya", role:"admin" }], ["product:42", { name:"Pen", price:20 }]]

if (typeof document !== "undefined") {
  const out = document.getElementById("bonus-output");
  if (out) {
    out.textContent = JSON.stringify([...cache.entries()], null, 2);
  }
}