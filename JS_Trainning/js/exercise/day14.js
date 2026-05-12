//------------------Task-1  Build a Counter--------------------------------

function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}


const counter1 = makeCounter();


const counter2 = makeCounter();

console.log(counter1());
console.log(counter1());
console.log(counter1());

console.log(counter2());
console.log(counter2()); 
//---------------------------Task-2 Fix the var-in-Loop Bug---------------------------------

for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}

for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}


//---------------------------- Task-3 Private Bank Balance------------------------------------

function createAccount(initial) {
  let balance = initial;

  return {
    deposit(amount) {
      balance += amount;
    },

    withdraw(amount) {
      balance -= amount;
    },

    getBalance() {
      return balance;
    }
  };
}

const account = createAccount(1000);

account.deposit(500);
account.withdraw(200);

console.log(account.getBalance());

console.log(account.balance);

//------------------------------Bonus Task-Build a Memoizer------------------------------

function memoize(fn) {
  const cache = {};

  return function (n) {

    if (n in cache) {
      return cache[n];
    }

    cache[n] = fn(n);

    return cache[n];
  };
}

function expensiveSquare(n) {
  console.log("computing...");
  return n * n;
}

const fastSquare = memoize(expensiveSquare);

console.log(fastSquare(5));
console.log(fastSquare(5));
console.log(fastSquare(10));
console.log(fastSquare(5));

