//-----------------------Task-1 multiplier(factor)

function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));
console.log(double(10));

console.log(triple(5));
console.log(triple(10));


// ------------------Task-2 var-in-loop bug with for...of and let-----------------------------

const numbers = [10, 20, 30];

for (let num of numbers) {
  setTimeout(() => console.log(num), 100);
}


//--------------------Task-3: Bank account with transactionCount-------------------------------

function createAccount(initial) {
  let balance = initial;
  let transactionCount = 0;

  return {
    deposit(amount) {
      balance += amount;
      transactionCount++;
    },

    withdraw(amount) {
      balance -= amount;
      transactionCount++;
    },

    getBalance() {
      return balance;
    },

    getTransactionCount() {
      return transactionCount;
    }
  };
}

const account = createAccount(1000);

account.deposit(500);
account.withdraw(200);

console.log(account.getBalance());
console.log(account.getTransactionCount());


//------------------------------Task-4 once(fn)--------------------------------------

function once(fn) {
  let hasRun = false;
  let result;

  return function (...args) {

    if (!hasRun) {
      result = fn(...args);
      hasRun = true;
    }

    return result;
  };
}

function greet(name) {
  console.log("Function executed");
  return `Hello ${name}`;
}

const greetOnce = once(greet);

console.log(greetOnce("Anamika"));
console.log(greetOnce("Priya"));
console.log(greetOnce("Aarav"));