// // console.log(10 + 3);
// // console.log(10 - 3);
// // console.log(10 * 3);
// // console.log(10 / 3);
// // console.log(10 %3 );
// // console.log(2 ** 8);
// // let x=4;
// // console.log(x++);
// // console.log(x--);
// // let x=12;
// // console.log(x+=5);
// // x=10;
// // console.log(x-=3);
// // x=10;
// // console.log(x*=2);
// // x=10;
// // console.log(x/=4);







// // const x=5;
// // const y="5"
// // console.log(x==y);
// // console.log(x === y);
// // console.log(0 == false);
// // console.log(0 === false);
// // console.log(null == undefined);
 



// // const op1=true;
// // const op2=false;
// // const x=5, y=2, a=10, b=20;
// // console.log(x > y && a < b);
// // console.log(!op1);

// // let count=0;
// // console.log(count ?? 10);
// // console.log(count || 10);



// // const age= 23;
// // const status= age >= 18 ? "Adult" : "Minor";
// // const status2= age <= 18 ? "Adult" : "Minor"; //op=Minor
// // console.log(status);
// // console.log(status2);

// // const score=79;
// // const result= score >= 50 ? "Pass" : "Fail";
// // const resultNext= score <= 50 ? "Pass" : "Fail"; //op=Fail
// // console.log(result);
// // console.log(resultNext);

// const customerOrder = {
//   id: 123,
//   customerDetails: {
//     customerName: "Alice",
//     address: {
//       city: "New York"
//     }
//   }
// };

// console.log(customerOrder ?.customerDetails ?.city);
// console.log(customerOrder ?.customerDetails ?.phone ?.number);
// console.log(order?.shipping?.address?.street); 

// const result = customerOrder?.customerDetails?.getName?.(); 
 
// const userAge = 0;
// const ageToShow = userAge ?? "Not provided";  
// const ageWithOr = userAge || "Not provided";

// const config = {
//   retryCount: 0,      
//   timeout: null,     
//   enableLogging: false 
// };
 
// const retries = config.retryCount ?? 3;      
// const timeout = config.timeout ?? 5000;     
// const logging = config.enableLogging ?? true; 




document.addEventListener("DOMContentLoaded", function () {

const topic1Snippet = `console.log(10 + 5);   // Addition: 15
console.log(10 - 5);   // Subtraction: 5
console.log(10 * 5);   // Multiplication: 50
console.log(10 / 5);   // Division: 2
console.log(10 % 3);   // Modulus (remainder): 1`;

const topic2Snippet = `console.log(5 == "5");    // Equal to: true
console.log(5 === "5");   // Strictly equal: false
console.log(5 != "5");    // Not equal: false
console.log(5 > 3);       // Greater than: true
console.log(5 <= 5);      // Less than or equal: true`;

const topic3Snippet = `console.log(true && false);  // AND: false
console.log(true || false);  // OR: true
console.log(!true);          // NOT: false`;

document.querySelector("#topic1Code code").textContent = topic1Snippet;
document.querySelector("#topic2Code code").textContent = topic2Snippet;
document.querySelector("#topic3Code code").textContent = topic3Snippet;

console.log("=== Day 3: Operators ===");
console.log(10 + 5);
console.log(10 - 5);
console.log(10 * 5);
console.log(10 / 5);
console.log(10 % 3);
console.log(2 ** 3);
console.log(5 == "5");
console.log(5 === "5");
console.log(5 != 3);
console.log(5 > 3);
console.log(true && false);
console.log(true || false);
console.log(!true);
console.log(10 > 5 ? "yes" : "no");

});

 










