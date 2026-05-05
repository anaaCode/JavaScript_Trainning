// -----------Question-1-----------------

const person = { first: "Priya", last: "Sharma", city: "Jaipur" };

const sentence = `${person.first} ${person.last} from ${person.city}`;

console.log(sentence);

// -----------Question-2-----------------
const nums = [1, 2, 3, 4, 5, 6];

const [head, ...tail] = nums;

console.log(head); 
console.log(tail); 
// -----------Question-3-----------------

function multiply(...nums){
    return nums.reduce((acc,i)=> acc*i,1);
}


//--------------------question-4------------------
const user = { name: "Anaya", age: 21 };

const updatedUser = { ...user, age: 22 };

console.log(user);        
console.log(updatedUser); 