//---------------------Practice Task------------------
//--------------------Task-1------------------
const kmToMiles = km => km * 0.621;

console.log(kmToMiles(10));
console.log(kmToMiles(50));

//--------------------Task-2------------------
const gstAmount = (price, rate = 18) => (price * rate) / 100;

console.log(gstAmount(1000));
console.log(gstAmount(500, 5));

//--------------------Task-3------------------
const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Anamika", "Sharma"));
console.log(fullName("Akanksha", "Sharma"));

//--------------------Task-4------------------
const isAdult = age => age >= 18;

console.log(isAdult(20));
console.log(isAdult(15));