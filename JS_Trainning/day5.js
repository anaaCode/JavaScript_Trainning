//--------------Task 1------------------

for (let i = 1; i <= 10; i++) {
  console.log(`7 x ${i} = ${7 * i}`);
}    
//--------------even numbers------------------

for (let i = 2; i <= 10; i += 2) {
  console.log(`7 x ${i} = ${7 * i}`);
}

//--------------------Task-2------------------
let sum = 0;
let i = 1;

while (i <= 100) {
  sum += i;
  i++;
}

console.log(sum);

//--------------------odd numbers only------------------
let sumOdd = 0;
let j = 1;

while (j <= 100) {
  if (j % 2 !== 0) {
    sumOdd += j;
  }
  j++;
}

console.log(sumOdd);

//--------------------Task-3------------------
const names = ["Priya", "Aarav", "Riya", "Kabir", "Anaya"];

for (const name of names) {
  console.log(name);
}

let count = 0;

for (const name of names) {
  if (name.length > 4) {
    count++;
  }
}

console.log(count);

for (const ch of "Jaipur") {
  console.log(ch);
}

//--------------------Bonus Task------------------
const student = {
  name: "Anaya",
  age: 21,
  city: "Jaipur",
  course: "B.Tech"
};

for (const key in student) {
  console.log(`${key}: ${student[key]}`);
}
//--------------------Count properties------------------
let propCount = 0;

for (const key in student) {
  propCount++;
}

console.log(propCount);