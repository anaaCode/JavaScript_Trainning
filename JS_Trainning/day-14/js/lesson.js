// Topic 1: Lexical Scope
const city = "Jaipur";

function outer() {
  const language = "Hindi";

  function inner() {
    const greeting = "Namaste";
    console.log(greeting, language, city);  // Namaste Hindi Jaipur
  }

  inner();
}

outer();

// Topic 2: Scope Chain
const a = "global a";

function outerFn() {
  const b = "outer b";

  function innerFn() {
    const c = "inner c";
    console.log(a);   // "global a"
    console.log(b);   // "outer b"
    console.log(c);   // "inner c"
  }

  innerFn();
}

outerFn();
// console.log(c);  // ReferenceError — outer cannot see inner's variables

// Topic 3: Closure
function makeGreeter(name) {
  return function () {
    console.log(`Namaste, ${name}!`);
  };
}

const greetPriya = makeGreeter("Priya");
const greetAarav = makeGreeter("Aarav");

greetPriya();  // Namaste, Priya!
greetAarav();  // Namaste, Aarav!

// Topic 4: Counter
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const c = makeCounter();
console.log(c());  // 1
console.log(c());  // 2
console.log(c());  // 3
// console.log(count);  // ReferenceError — count is private

// Bank account
function createAccount(initial) {
  let balance = initial;
  return {
    deposit:    (amt) => balance += amt,
    withdraw:   (amt) => balance -= amt,
    getBalance: ()    => balance,
  };
}

const acc = createAccount(1000);
acc.deposit(500);
console.log(acc.getBalance());  // 1500
console.log(acc.balance);       // undefined — private

// Memoize
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (n in cache) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}

const slowSquare = (n) => { console.log("computing..."); return n * n; };
const fastSquare = memoize(slowSquare);

fastSquare(5);  // computing... 25
fastSquare(5);  // 25 (from cache)

// Topic 5: var-in-loop bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 3, 3, 3

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Logs: 0, 1, 2

// Topic 6: IIFE
(function () {
  const secret = "hidden";
  console.log("IIFE ran");
})();

(function (city) {
  console.log(`Greetings from ${city}`);
})("Jaipur");

const counterModule = (function () {
  let count = 0;
  return {
    inc: () => ++count,
    get: () => count,
  };
})();

counterModule.inc();
counterModule.inc();
console.log(counterModule.get());  // 2