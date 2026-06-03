// heavy.js — simulates a "heavy" module loaded on demand via dynamic import()
// In a real app this might be a chart library, PDF renderer, etc.

console.log("[heavy.js] module evaluated — loaded on demand!");

export function compute() {
  return "computed!";
}

export function heavyTask(n = 1000) {
  // Simulate some CPU work so the lazy-load feel is visible
  let result = 0;
  for (let i = 0; i < n; i++) result += Math.sqrt(i);
  return `heavyTask done (n=${n}, result=${result.toFixed(2)})`;
}