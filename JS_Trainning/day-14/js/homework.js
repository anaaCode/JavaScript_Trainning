// Exercise 1: multiplier
function multiplier(factor) {
  return function (n) {
    return n * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(double(10));  // 20
console.log(triple(10));  // 30

// Exercise 2: var-in-loop with for...of
for (let val of [10, 20, 30]) {
  setTimeout(() => console.log(val), 100);
}
// Logs: 10, 20, 30

// Exercise 3: Transaction count
function createAccount(initial) {
  let balance = initial;
  let transactionCount = 0;
  return {
    deposit: (amt) => { balance += amt; transactionCount++; },
    withdraw: (amt) => { balance -= amt; transactionCount++; },
    getBalance: () => balance,
    getTransactionCount: () => transactionCount,
  };
}

const account = createAccount(1000);
account.deposit(500);
account.withdraw(200);
account.deposit(100);

console.log(account.getBalance());           // 1400
console.log(account.getTransactionCount());  // 3
console.log(account.transactionCount);       // undefined — private