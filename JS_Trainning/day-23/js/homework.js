// Exercise 1: chunked Generator
function* chunked(arr, size) {
  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size);
  }
}

console.log([...chunked([1, 2, 3, 4, 5], 2)]);
// [[1, 2], [3, 4], [5]]

console.log([...chunked([1, 2, 3, 4, 5, 6], 3)]);
// [[1, 2, 3], [4, 5, 6]]

// Exercise 2: Infinite Primes Generator
function take(iter, n) {
  const result = [];
  for (const value of iter) {
    result.push(value);
    if (result.length === n) break;
  }
  return result;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function* primes() {
  let n = 2;
  while (true) {
    if (isPrime(n)) yield n;
    n++;
  }
}

console.log(take(primes(), 10));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

// Exercise 3: zip Generator
function* zip(a, b) {
  const iterA = a[Symbol.iterator]();
  const iterB = b[Symbol.iterator]();

  while (true) {
    const { value: va, done: doneA } = iterA.next();
    const { value: vb, done: doneB } = iterB.next();
    if (doneA || doneB) return;
    yield [va, vb];
  }
}

console.log([...zip([1, 2, 3], ["a", "b", "c"])]);
// [[1, "a"], [2, "b"], [3, "c"]]

console.log([...zip([1, 2, 3, 4], ["x", "y"])]);
// [[1, "x"], [2, "y"]]

// Exercise 4: Fibonacci with Generator + take
function* fib() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log(take(fib(), 8));
// [0, 1, 1, 2, 3, 5, 8, 13]

const [fib20] = take(fib(), 20).slice(-1);
console.log(fib20);  // 4181