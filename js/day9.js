const name = "Priya";
const age = 24;

// Old way — string concatenation
const msg1 = "Hello, " + name + ". You are " + age + " years old.";
console.log(msg1);

// Template literal — clean
const msg2 = `Hello, ${name}. You are ${age} years old.`;

// Multiline — no \n
const address = `MI Road
Jaipur 302001
Rajasthan`;

// Expressions inside ${...}
const total = 1180;
const summary = `Total ${total >= 1000 ? "qualifies" : "doesn't qualify"} for free shipping.`;

// Math, function calls
const taxed = `Final price: ₹${(1000 * 1.18).toFixed(2)}`;