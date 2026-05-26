// Exercise 1: Tag Counter with Map
const posts = [
  { title: "Post 1", tags: ["js", "react", "node"] },
  { title: "Post 2", tags: ["js", "css"] },
  { title: "Post 3", tags: ["react", "css", "js"] },
];

function tagCounter(posts) {
  const counts = new Map();
  posts.forEach(post => {
    post.tags.forEach(tag => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });
  return counts;
}

const result = tagCounter(posts);
console.log(result.get("js"));    // 3
console.log(result.get("react")); // 2
console.log(result.get("css"));   // 2
console.log(result.get("node"));  // 1

// Exercise 2: Set Operation Helpers
function union(a, b)        { return new Set([...a, ...b]); }
function intersection(a, b) { return new Set([...a].filter(x => b.has(x))); }
function difference(a, b)   { return new Set([...a].filter(x => !b.has(x))); }

const x = new Set([1, 2, 3, 4]);
const y = new Set([3, 4, 5, 6]);

console.log([...union(x, y)]);        // [1, 2, 3, 4, 5, 6]
console.log([...intersection(x, y)]); // [3, 4]
console.log([...difference(x, y)]);   // [1, 2]

// Exercise 3: Map Sorted by Value
const ages = new Map([
  ["Aarav", 22],
  ["Priya", 19],
  ["Anaya", 25],
  ["Rohan", 21],
]);

const sorted = [...ages.entries()].sort(([, ageA], [, ageB]) => ageA - ageB);
console.log(sorted);
// [["Priya", 19], ["Rohan", 21], ["Aarav", 22], ["Anaya", 25]]

for (const [name, age] of sorted) {
  console.log(`${name}: ${age}`);
}

// Exercise 4: DOM Click Tracker with WeakMap
// WeakMap is correct here because:
// - When a button is removed from the DOM and its reference dropped,
//   the WeakMap entry is GC'd automatically — no memory leak.
// - A plain Map would hold a strong reference, keeping the button
//   in memory even after it's removed from the page.

const clickCounts = new WeakMap();

function handleClick(btn) {
  const current = clickCounts.get(btn) ?? 0;
  clickCounts.set(btn, current + 1);
  console.log(`${btn.id} clicked ${clickCounts.get(btn)} time(s)`);
}

let btn1 = { id: "submit" };
let btn2 = { id: "cancel" };

handleClick(btn1); // "submit clicked 1 time(s)"
handleClick(btn1); // "submit clicked 2 time(s)"
handleClick(btn2); // "cancel clicked 1 time(s)"

btn1 = null; // WeakMap entry is eventually GC'd — no leak