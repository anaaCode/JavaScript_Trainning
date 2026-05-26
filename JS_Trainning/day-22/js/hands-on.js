// Task 1: Map vs Object
const products = new Map([
  ["pen",  50],
  ["book", 200],
  ["bag",  800],
]);

for (const [item, price] of products) {
  console.log(`${item}: ₹${price}`);
}

console.log(products.has("book")); // true
console.log(products.get("pen"));  // 50
products.delete("pen");
console.log(products.size);        // 2

const obj  = Object.fromEntries(products);
console.log(obj); // { book: 200, bag: 800 }

const map2 = new Map(Object.entries(obj));
console.log(map2.get("book")); // 200

// Task 2: Deduplicate with Set
const ids = [101, 102, 103, 101, 104, 102, 105];
const uniqueIds = [...new Set(ids)];
console.log(uniqueIds);        // [101, 102, 103, 104, 105]
console.log(uniqueIds.length); // 5

const mixed = [1, "1", 1, true, 1n];
const uniqueMixed = [...new Set(mixed)];
console.log(uniqueMixed);        // [1, "1", true, 1n]
console.log(uniqueMixed.length); // 4

// Task 3: Cache with Map
function memoize(fn) {
  const cache = new Map();
  return function (n) {
    if (cache.has(n)) return cache.get(n);
    const result = fn(n);
    cache.set(n, result);
    console.log("cache.size:", cache.size);
    return result;
  };
}

function expensiveSquare(n) {
  console.log("computing...");
  return n * n;
}

const square = memoize(expensiveSquare);
console.log(square(5)); // "computing..." cache.size: 1 → 25
console.log(square(5)); // (cache hit) → 25
console.log(square(3)); // "computing..." cache.size: 2 → 9

// Bonus: WeakMap for Private Data
const meta = new WeakMap();
function attach(obj, data)  { meta.set(obj, data); }
function getData(obj)       { return meta.get(obj); }

let btn1 = { id: "btn-submit" };
let btn2 = { id: "btn-cancel" };

attach(btn1, { lastClick: Date.now(), clicks: 3 });
attach(btn2, { lastClick: Date.now(), clicks: 1 });

console.log(getData(btn1)); // { lastClick: ..., clicks: 3 }
console.log(getData(btn2)); // { lastClick: ..., clicks: 1 }

btn1 = null; // WeakMap entry for original btn1 is eventually GC'd