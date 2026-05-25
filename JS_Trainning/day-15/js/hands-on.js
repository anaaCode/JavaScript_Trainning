// ─── Task 1: Predict the this ─────────────────────────────────────────────────
const user = {
  name: "Priya",
  greet() { console.log(this.name); },
};

user.greet(); // "Priya"  — implicit binding, this = user

const g = user.greet;
g(); // undefined (strict) — default binding, this is lost

// Why g() lost this:
// user.greet() → implicit binding, this = user
// const g = user.greet pulls the function off the object.
// g() is a plain call → default binding → this is no longer user.

// ─── Task 2: Fix the Lost this — Three Ways ───────────────────────────────────
class Timer {
  constructor() { this.sec = 0; }
  tick() { this.sec++; console.log(this.sec); }
}

const t = new Timer();

// BUG
// setInterval(t.tick, 1000); // TypeError

// Fix 1 — .bind: permanently bind this to t
setInterval(t.tick.bind(t), 1000);

// Fix 2 — Arrow wrapper: t.tick() called as method → this = t
setInterval(() => t.tick(), 1000);

// Fix 3 — Class field arrow: this captured at construction time
class TimerArrow {
  sec = 0;
  tick = () => { this.sec++; console.log(this.sec); };
}
const ta = new TimerArrow();
setInterval(ta.tick, 1000);

// ─── Task 3: call / apply / bind ──────────────────────────────────────────────
function describe(role, city) {
  console.log(`${this.name} is a ${role} from ${city}`);
}

const u = { name: "Aarav" };

describe.call(u, "developer", "Mumbai");   // "Aarav is a developer from Mumbai"
describe.apply(u, ["developer", "Mumbai"]); // "Aarav is a developer from Mumbai"

const describeAarav = describe.bind(u, "developer");
describeAarav("Mumbai");    // "Aarav is a developer from Mumbai"
describeAarav("Bangalore"); // "Aarav is a developer from Bangalore"

// One-line difference:
// .call invokes now with listed args | .apply invokes now with array args | .bind returns a new function for later

// ─── Bonus: Arrow vs Regular Method ───────────────────────────────────────────
const team = {
  members: ["Priya", "Aarav", "Riya"],

  printRegular() {
    this.members.forEach(function (m) {
      console.log(this.members.length, m); // TypeError — this is undefined
    });
  },

  printArrow() {
    this.members.forEach((m) => {
      console.log(this.members.length, m); // works — inherits this from printArrow
    });
  },
};

// team.printRegular(); // TypeError: cannot read 'members' of undefined
team.printArrow();
// 3 Priya
// 3 Aarav
// 3 Riya

// printRegular breaks: regular callback gets its own this → undefined in strict mode.
// printArrow works: arrow inherits this from printArrow → which is team.