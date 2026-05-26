// Topic 1: Map — Better Keyed Storage
const m = new Map();
m.set("name", "Priya");
m.set(42, "the answer");
m.set(true, "a boolean key");

const userObj = { id: 1 };
m.set(userObj, "value associated with userObj");

console.log(m.get("name"));   // "Priya"
console.log(m.get(userObj));  // "value associated with userObj"
console.log(m.size);          // 4
console.log(m.has(42));       // true
m.delete(42);

const m2 = new Map([["a", 1], ["b", 2]]);
console.log(m2.get("a")); // 1

for (const [key, value] of m2) {
  console.log(key, value);
}

// Topic 2: Object ↔ Map Conversion
const obj = { name: "Priya", city: "Jaipur" };

const map = new Map(Object.entries(obj));
console.log(map.get("name")); // "Priya"

const back = Object.fromEntries(map);
console.log(back); // { name: "Priya", city: "Jaipur" }

for (const key of map.keys())        console.log("key:", key);
for (const val of map.values())      console.log("val:", val);
for (const [k, v] of map.entries())  console.log(k, "=", v);
map.forEach((value, key) => console.log(key, "=", value)); // value FIRST!

// Topic 3: Set — Unique Values
const s = new Set();
s.add("a");
s.add("b");
s.add("a"); // duplicate — ignored
console.log(s.size);     // 2
console.log(s.has("a")); // true
s.delete("b");

const tags = new Set(["js", "react", "js", "node", "react"]);
console.log(tags.size); // 3

const arr  = [1, 2, 2, 3, 4, 4, 5];
const uniq = [...new Set(arr)];
console.log(uniq); // [1, 2, 3, 4, 5]

const set = new Set();
set.add({ id: 1 });
set.add({ id: 1 }); // different reference — both kept
console.log(set.size); // 2

// Topic 4: Set Operations
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

const union = new Set([...a, ...b]);
console.log([...union]); // [1, 2, 3, 4]

const inter = new Set([...a].filter(x => b.has(x)));
console.log([...inter]); // [2, 3]

const diff = new Set([...a].filter(x => !b.has(x)));
console.log([...diff]);  // [1]

// Topic 5: When Map/Set vs Object/Array
const cache = new Map();
function fetchWithCache(req) {
  if (cache.has(req)) return cache.get(req);
  const result = { data: "..." };
  cache.set(req, result);
  return result;
}

const posts = [
  { tags: ["js", "react"] },
  { tags: ["js", "node"] },
];
const allTags = new Set();
posts.forEach(p => p.tags.forEach(t => allTags.add(t)));
console.log([...allTags]); // ["js", "react", "node"]

// Topic 6: WeakMap & WeakSet
const wm = new WeakMap();
let user = { id: 1, name: "Priya" };

wm.set(user, { lastSeen: Date.now() });
console.log(wm.get(user)); // { lastSeen: ... }

user = null; // entry is eventually GC'd

const dataForElement = new WeakMap();
function attachData(el, data) { dataForElement.set(el, data); }

const seen = new WeakSet();
function process(item) {
  if (seen.has(item)) return;
  seen.add(item);
  // ... do work
}