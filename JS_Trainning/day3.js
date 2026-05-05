// console.log(10 + 3);
// console.log(10 - 3);
// console.log(10 * 3);
// console.log(10 / 3);
// console.log(10 %3 );
// console.log(2 ** 8);
// let x=4;
// console.log(x++);
// console.log(x--);
// let x=12;
// console.log(x+=5);
// x=10;
// console.log(x-=3);
// x=10;
// console.log(x*=2);
// x=10;
// console.log(x/=4);







// const x=5;
// const y="5"
// console.log(x==y);
// console.log(x === y);
// console.log(0 == false);
// console.log(0 === false);
// console.log(null == undefined);
 



// const op1=true;
// const op2=false;
// const x=5, y=2, a=10, b=20;
// console.log(x > y && a < b);
// console.log(!op1);

// let count=0;
// console.log(count ?? 10);
// console.log(count || 10);



// const age= 23;
// const status= age >= 18 ? "Adult" : "Minor";
// const status2= age <= 18 ? "Adult" : "Minor"; //op=Minor
// console.log(status);
// console.log(status2);

// const score=79;
// const result= score >= 50 ? "Pass" : "Fail";
// const resultNext= score <= 50 ? "Pass" : "Fail"; //op=Fail
// console.log(result);
// console.log(resultNext);

const customerOrder = {
  id: 123,
  customerDetails: {
    customerName: "Alice",
    address: {
      city: "New York"
    }
  }
};

console.log(customerOrder ?.customerDetails ?.city);
console.log(customerOrder ?.customerDetails ?.phone ?.number);
console.log(order?.shipping?.address?.street); 

const result = customerOrder?.customerDetails?.getName?.(); 
 
const userAge = 0;
const ageToShow = userAge ?? "Not provided";  
const ageWithOr = userAge || "Not provided";

const config = {
  retryCount: 0,      
  timeout: null,     
  enableLogging: false 
};
 
const retries = config.retryCount ?? 3;      
const timeout = config.timeout ?? 5000;     
const logging = config.enableLogging ?? true; 

 










