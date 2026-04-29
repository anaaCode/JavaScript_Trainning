//--------------------Task-1------------------
const marks = 72;
if (marks < 0 || marks > 100) {
  console.log("Invalid marks");
} else if (marks >= 90) {
  console.log("A");
} else if (marks >= 75) {
  console.log("B");
} else if (marks >= 60) {
  console.log("C");
} else {
  console.log("F");
}

//--------------------Task-2------------------

const day = "Wednesday";

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday");
    break;

  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;

  default:
    console.log("Invalid day");
}

//--------------------Task-3------------------
if (0) console.log("truthy"); else console.log("falsy"); // falsy
if ("0") console.log("truthy"); else console.log("falsy"); // truthy
if ("") console.log("truthy"); else console.log("falsy"); // falsy
if (" ") console.log("truthy"); else console.log("falsy"); // truthy
if (null) console.log("truthy"); else console.log("falsy"); // falsy
if (undefined) console.log("truthy"); else console.log("falsy"); // falsy
if (NaN) console.log("truthy"); else console.log("falsy"); // falsy
if ([]) console.log("truthy"); else console.log("falsy"); // truthy
if ({}) console.log("truthy"); else console.log("falsy"); // truthy
if ("false") console.log("truthy"); else console.log("falsy"); // truthy

//--------------------Task-4------------------
function canCommentNested(user) {
  if (user) {
    if (!user.isBanned) {
      if (user.age >= 13) {
        console.log("Comment allowed");
      }
    }
  }
}

function canComment(user) {
  if (!user) return;
  if (user.isBanned) return;
  if (user.age < 13) return;

  console.log("Comment allowed");
}

console.log("Nested:");
canCommentNested({ name: "Aarav", isBanned: false, age: 20 });
canCommentNested({ name: "Aarav", isBanned: true, age: 20 });
canCommentNested(null);

console.log("Guard Clauses:");
canComment({ name: "Aarav", isBanned: false, age: 20 });
canComment({ name: "Aarav", isBanned: true, age: 20 });
canComment(null);