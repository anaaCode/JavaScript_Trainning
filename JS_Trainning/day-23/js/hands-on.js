// Task 1: Manual Iterator
function range(from, to) {
  return {
    from,
    to,
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
}

for (const n of range(3, 7)) console.log(n);  // 3, 4, 5, 6, 7
console.log([...range(1, 3)]);                 // [1, 2, 3]

// Task 2: Range Generator
// Generator version — ~2 lines of logic vs ~13 for the manual iterator above
function* rangeGen(from, to) {
  for (let i = from; i <= to; i++) yield i;
}

for (const n of rangeGen(3, 7)) console.log(n);  // 3, 4, 5, 6, 7
console.log([...rangeGen(1, 3)]);                 // [1, 2, 3]

// Task 3: Take from Infinite
function take(iter, n) {
  const result = [];
  for (const value of iter) {
    result.push(value);
    if (result.length === n) break;
  }
  return result;
}

function* naturals() {
  let n = 1;
  while (true) yield n++;
}

console.log(take(naturals(), 5));   // [1, 2, 3, 4, 5]
console.log(take(naturals(), 10));  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Bonus: Tree Walk with yield*
const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 3, children: [] }
      ]
    },
    { value: 4, children: [] }
  ]
};

function* walk(node) {
  yield node.value;
  for (const child of node.children) {
    yield* walk(child);  // recurse depth-first
  }
}

console.log([...walk(tree)]);  // [1, 2, 3, 4]