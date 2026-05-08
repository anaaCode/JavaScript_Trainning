import { PI, add, multiply } from "../script.js";

console.log(PI);              // 3.14159
console.log(add(2, 3));       // 5
console.log(multiply(4, 5));  // 20

// Rename on import with `as`
import { add as sum } from "../script.js";
console.log(sum(10, 20));     // 30

// Bring everything in as a namespace
import * as math from "../script.js";
console.log(math.add(1, 2));  // 3
console.log(math.PI);