// Topic 1: The Iterator Protocol
const arr = ["a", "b", "c"];
const it  = arr[Symbol.iterator]();

console.log(it.next());  // { value: "a", done: false }
console.log(it.next());  // { value: "b", done: false }
console.log(it.next());  // { value: "c", done: false }
console.log(it.next());  // { value: undefined, done: true }

for (const ch of arr) console.log(ch);  // "a", "b", "c"

// Topic 2: Make an Object Iterable
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last  = this.to;
    return {
      next() {
        if (current <= last) return { value: current++, done: false };
        return { value: undefined, done: true };
      },
    };
  },
};

for (const n of range) console.log(n);  // 1, 2, 3, 4, 5
console.log([...range]);                 // [1, 2, 3, 4, 5]
const [first, ...rest] = range;
console.log(first, rest);               // 1 [2, 3, 4, 5]

// Topic 3: Generators with function*
function* simple() {
  yield 1;
  yield 2;
  yield 3;
}

const g = simple();
console.log(g.next());  // { value: 1, done: false }
console.log(g.next());  // { value: 2, done: false }
console.log(g.next());  // { value: 3, done: false }
console.log(g.next());  // { value: undefined, done: true }

for (const n of simple()) console.log(n);  // 1, 2, 3

function* rangeGen(from, to) {
  for (let i = from; i <= to; i++) yield i;
}
console.log([...rangeGen(1, 5)]);  // [1, 2, 3, 4, 5]

// Topic 4: Infinite Sequences
function* idGen() {
  let id = 1;
  while (true) yield id++;
}

const ids = idGen();
console.log(ids.next().value);  // 1
console.log(ids.next().value);  // 2
console.log(ids.next().value);  // 3

function* fib() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const f = fib();
const first10 = [];
for (let i = 0; i < 10; i++) first10.push(f.next().value);
console.log(first10);  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Topic 5: yield* — Delegating
function* a() { yield 1; yield 2; }
function* b() {
  yield 0;
  yield* a();
  yield* [10, 20];
  yield 99;
}
console.log([...b()]);  // [0, 1, 2, 10, 20, 99]

function* flatten(items) {
  for (const item of items) {
    if (Array.isArray(item)) yield* flatten(item);
    else                     yield item;
  }
}
console.log([...flatten([1, [2, [3, [4, 5]]], 6])]);  // [1, 2, 3, 4, 5, 6]

// Topic 6: Two-Way Communication — next(value)
function* dialog() {
  const name = yield "What's your name?";
  const age  = yield `Hi ${name}! How old?`;
  return `${name}, ${age}, recorded.`;
}

const d = dialog();
console.log(d.next().value);         // "What's your name?"
console.log(d.next("Priya").value);  // "Hi Priya! How old?"
console.log(d.next(25).value);       // "Priya, 25, recorded."

// Topic 7: Pagination Generator
function fetchPage(page) {
  const data = {
    1: ["pen", "book", "bag"],
    2: ["mug", "lamp", "fan"],
    3: ["chair", "desk", "rug"],
    4: ["plant", "vase"],
  };
  return Promise.resolve(data[page] || []);
}

async function* paginate() {
  let page = 1;
  while (true) {
    const items = await fetchPage(page);
    if (items.length === 0) return;
    yield* items;
    page++;
  }
}

(async () => {
  for await (const item of paginate()) {
    console.log(item);
  }
  // pen, book, bag, mug, lamp, fan, chair, desk, rug, plant, vase
})();