//-------------------Task 1-------------------
//--------Cart Manipulation------------
const cart=["bread","milk","eggs"];
cart.push("butter");
cart.unshift("rice");

console.log(cart);

const removeLast=cart.pop();
console.log(removeLast);
console.log(cart);

cart.splice(1,1);
console.log(cart);

//-------------------Task 2-------------------
//----------Filter Passing scores
const scores = [88, 42, 75, 60, 91, 39, 55, 70];

const passing = scores.filter(score => score >= 60);

console.log(passing);

const failing = scores.find(score => score < 60);

console.log(failing);

const allPassing = scores.every(score => score >= 60);

console.log(allPassing);

const above90 = scores.some(score => score > 90);

console.log(above90);


//-------------------Task 3-------------------
//--------------Map prices with GST----------------
const prices = [100, 250, 500, 1200, 80];

const gstPrices = prices.map(
  price => (price * 1.18).toFixed(2)
);

console.log(prices);
console.log(gstPrices);

//-------------------Bonus Task-------------------
//-------------------Reduce total price-------------------
const expenses = [250, 800, 120, 50, 1500, 75];

const total = expenses.reduce(
  (sum, expense) => sum + expense,
  0
);

console.log(total);

const highest = expenses.reduce(
  (max, expense) => expense > max ? expense : max
);

console.log(highest);

const above100Total = expenses
  .filter(expense => expense > 100)
  .reduce((sum, expense) => sum + expense, 0);

console.log(above100Total);






