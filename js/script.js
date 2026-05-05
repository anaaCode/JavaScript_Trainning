// console.log("welcome");
// marks = 95
// if (marks >= 90) console.log("Grade A");
// else if (marks >= 75) console.log("Grade B");
// else if (marks >= 60) console.log("Grade C");

// else console.log("Grade D");

// if (0) {console.log()};
 

// if ("0") { console.log()}
// if ([]) { console.log()}
// if (null) { console.log() }
// if (NaN) { console.log() }
// if ("false") { console.log()}


// const fruits = ["apple", "banana", "mango"];

// for (let i = 0; i < fruits.length; i++) {
//   console.log(fruits[i]);
// }

// const str = "Priya";

// for (let i = 0; i < str.length; i++) {
//   console.log(str[i]);
// }


// const s = { name: "Aarav", age: 22 };

// const keys = Object.keys(s);

// for (let i = 0; i < keys.length; i++) {
//   console.log(keys[i]);
// }


// for (let i = 0; i < keys.length; i++) {
//   console.log(s[keys[i]]);}

// for (let i = 1; i <= 10; i++) {
//   console.log(`7 x ${i} = ${7 * i}`);
// }


// for (let i = 1; i <= 10; i++) {
//   if (i % 2 !== 0) continue; // skip odd numbers
//   console.log(`7 x ${i} = ${7 * i}`);
// }
// for (let i = 2; i <= 10; i += 2) {
//   console.log(`7 x ${i} = ${7 * i}`);
// }

//------------day6-------------------------
// function add(a, b) { return a + b; }
// console.log(add(5, 3));

// function silent() { console.log("hi"); }
// const x = silent();
// console.log(x);

// const greet = function(name) {
//   return "Hello, " + name;
// };

// console.log(greet("Anamika"));


// const add = (a, b) => {
//   return a + b;
// };
// function addNormal(a, b) {
//   return a + b;
// }


// const add2 = (a, b) => a + b;

// function add2Normal(a, b) {
//   return a + b;
// }


// const square = x => x * x;
// function squareNormal(x) {
//   return x * x;
// }

// const greet = () => "Hello!";

// console.log(add(2, 3));
// console.log(addNormal(2, 3));
// console.log(add2(4,5));
// console.log(add2Normal(4,5));
// console.log(squareNormal(5));

// console.log(square(4));
// console.log(greet());


const user = { name: "Priya", age: 24, "favourite color": "blue" };
// console.log(user.name);              
// console.log(user.age);               

// const field = "name";
// console.log(user[field]);           


// console.log(user["favourite color"]); 


// console.log(user.email);           



// const u = { a: 1, b: 2 };
// const { a, b } = u;
// console.log(a, b);
// const { phone = "N/A" } = u;
// console.log(phone);


// const user={name:"Anaya",age:21,city:"Jaiput";
// }

// const bankAccount = {
//   holder: "Aarav",
//   balance: 5000,

//   deposit(amount) {
//     this.balance += amount;
//     return this.balance;
//   },

//   withdraw(amount) {
//     if (amount > this.balance) {
//       return "Insufficient funds";
//     }

//     this.balance -= amount;
//     return this.balance;
//   }
// };

// console.log(bankAccount.deposit(1000));
// console.log(bankAccount.withdraw(2000));
// console.log(bankAccount.withdraw(10000));


// const address1 = `MI Road
// Jaipur 302001
// Rajasthan`;

// const address2 = "MI Road Jaipur 302001 Rajasthan";

// const address3 = `MI Road\nJaipur 302001\nRajasthan`;
// console.log(address1);
// console.log(address2);
// console.log(address3);


const showInfo = ({ name = "Guest", role = "User" } = {}) =>
  `${role}: ${name}`;
console.log(showInfo());               
console.log(showInfo({ name: "Riya" })); 
console.log(showInfo({ role: "Admin" }));
console.log(showInfo({ name: "ABC", role: "Manager" }));




