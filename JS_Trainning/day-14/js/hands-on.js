// Task 1: makeCounter
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter2());  // 1 — independent
console.log(counter1());  // 3

// count lives in the closure — makeCounter's scope.
// It persists between calls because the returned function holds a reference to it.

// Task 2: Fix the var-in-loop bug
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 4, 4, 4

for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 1, 2, 3
// var is function-scoped — ONE i shared. By setTimeout fires, loop is done, i = 4.
// let is block-scoped — each iteration gets a FRESH i.

// Task 3: Private bank balance
function createAccount(initial) {
  let balance = initial;
  return {
    deposit:    (amt) => balance += amt,
    withdraw:   (amt) => balance -= amt,
    getBalance: ()    => balance,
  };
}

const account = createAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance());  // 1300
console.log(account.balance);       // undefined — private

// Bonus: Memoizer
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (n in cache) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}

const expensiveSquare = (n) => { console.log("computing..."); return n * n; };
const fastSquare = memoize(expensiveSquare);

console.log(fastSquare(5));   // computing... 25
console.log(fastSquare(5));   // 25 (from cache)
console.log(fastSquare(10));  // computing... 100
console.log(fastSquare(5));   // 25 (from cache)

// cache lives in the closure — inside memoize's scope.