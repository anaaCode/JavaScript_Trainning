// Day 26 – Design Patterns (lesson)

// ─────────────────────────────────────────────
// Topic 1: Why Patterns?
// ─────────────────────────────────────────────

// Patterns are recurring solutions to recurring problems.
// They give a SHARED VOCABULARY — saying "use pub-sub" instantly
// conveys structural intent. They are idioms, not features.

// Key principles:
//   • Don't force-fit — the pattern serves the problem, not the other way round
//   • Some are language-solved — ES modules give you Module + Singleton for free
//   • Patterns evolve — classic Observer is now Redux / RxJS-shaped


// ─────────────────────────────────────────────
// Topic 2: Module Pattern
// ─────────────────────────────────────────────

// CLASSIC closure-based module (pre-ES6)
// const counter = (function () {
//   let count = 0;                    // private — captured in closure
//
//   function increment() { count++; }
//   function get()       { return count; }
//
//   return { increment, get };        // public API
// })();
//
// counter.increment();
// counter.increment();
// console.log(counter.get());         // 2
// console.log(counter.count);         // undefined — count is private!

// MODERN ES-module equivalent:
// counter.js
//   let count = 0;
//   export function increment() { count++; }
//   export function get()       { return count; }
//   // count is NOT exported → private


// ─────────────────────────────────────────────
// Topic 3: Observer (Pub/Sub)
// ─────────────────────────────────────────────

// Subject notifies subscribers — no tight coupling between emitter and listeners.

// function createEmitter() {
//   const listeners = new Map();
//
//   return {
//     on(event, callback) {
//       if (!listeners.has(event)) listeners.set(event, new Set());
//       listeners.get(event).add(callback);
//     },
//     off(event, callback) {
//       listeners.get(event)?.delete(callback);
//     },
//     emit(event, ...args) {
//       listeners.get(event)?.forEach((cb) => cb(...args));
//     },
//   };
// }
//
// const bus = createEmitter();
// function onUserSignup(user) { console.log("welcome email →", user.email); }
//
// bus.on("user:signup", onUserSignup);
// bus.on("user:signup", (user) => console.log("audit log →", user.id));
// bus.emit("user:signup", { id: 1, email: "priya@example.com" });
// // welcome email → priya@example.com
// // audit log → 1

// Follow-along — predict the output:
//   const bus = createEmitter();
//   const f = () => console.log("a");
//   bus.on("x", f);
//   bus.on("x", () => console.log("b"));
//   bus.emit("x");     // a  b
//   bus.off("x", f);
//   bus.emit("x");     // b  (only — f was removed)


// ─────────────────────────────────────────────
// Topic 4: Factory Pattern
// ─────────────────────────────────────────────

// A function that creates objects — hides construction from the caller.

// Class-based factory:
// class Car   { constructor() { this.kind = "car"; } }
// class Bike  { constructor() { this.kind = "bike"; } }
// class Truck { constructor() { this.kind = "truck"; } }
//
// function vehicleFactory(type) {
//   switch (type) {
//     case "car":   return new Car();
//     case "bike":  return new Bike();
//     case "truck": return new Truck();
//     default:      throw new Error(`Unknown vehicle: ${type}`);
//   }
// }
// const v = vehicleFactory("car");   // v.kind === "car"

// Closure-based factory (no class needed):
// function createUser(name, role = "user") {
//   return {
//     name,
//     role,
//     greet() { return `Hi, I'm ${this.name} (${this.role})`; },
//   };
// }
// console.log(createUser("Priya").greet());          // Hi, I'm Priya (user)
// console.log(createUser("Aarav", "admin").greet()); // Hi, I'm Aarav (admin)


// ─────────────────────────────────────────────
// Topic 5: Singleton
// ─────────────────────────────────────────────

// Ensures exactly ONE instance of something exists in the whole app.

// Classic via private static field:
// class Logger {
//   static #instance = null;
//
//   constructor() {
//     if (Logger.#instance) return Logger.#instance;
//     Logger.#instance = this;
//     this.logs = [];
//   }
//
//   log(msg) { this.logs.push(msg); console.log("[LOG]", msg); }
// }
//
// const a = new Logger();
// const b = new Logger();
// a.log("hello");
// console.log(a === b);    // true — same instance
// console.log(b.logs);     // ["hello"]

// Modern equivalent — just export an instance:
// logger.js
//   class Logger { ... }
//   export default new Logger();   // evaluated ONCE; every import shares it

// ⚠️ Warning: Singletons hide global state — hard to mock in tests.
//    Use sparingly, for true app-wide resources (logging, config, DB connection).


// ─────────────────────────────────────────────
// Topic 6: ES6 Proxy
// ─────────────────────────────────────────────

// Wraps an object and intercepts property operations via traps.

// const target = { name: "Priya", age: 25 };
//
// const handler = {
//   get(obj, prop) {
//     console.log(`reading ${prop}`);
//     return prop in obj ? obj[prop] : `?? unknown: ${prop}`;
//   },
//   set(obj, prop, value) {
//     if (prop === "age" && typeof value !== "number") {
//       throw new TypeError("age must be a number");
//     }
//     obj[prop] = value;
//     return true;   // ← required; returning false causes a TypeError
//   },
// };
//
// const user = new Proxy(target, handler);
// console.log(user.name);      // reading name → "Priya"
// console.log(user.unknown);   // reading unknown → "?? unknown: unknown"
// user.age = 26;               // ok
// // user.age = "old";         // throws TypeError

// Practical: tiny reactive system
// function reactive(obj, onChange) {
//   return new Proxy(obj, {
//     set(target, prop, value) {
//       target[prop] = value;
//       onChange(prop, value);
//       return true;
//     },
//   });
// }
//
// const state = reactive({ count: 0 }, (key, val) =>
//   console.log(`state.${key} changed to ${val}`)
// );
// state.count = 1;   // state.count changed to 1
// state.count = 5;   // state.count changed to 5

// Proxy traps cheat-sheet:
//   get              → property read
//   set              → property write
//   has              → `in` operator
//   deleteProperty   → delete keyword
//   ownKeys          → Object.keys / for…in


// ─────────────────────────────────────────────
// Topic 7: Picking the Right Pattern
// ─────────────────────────────────────────────

// Need                           → Pattern
// ─────────────────────────────────────────────
// Group code, hide internals     → Module (or ES module)
// Many parts react to changes    → Observer / pub-sub
// Choose object type at runtime  → Factory
// Exactly one shared instance    → Singleton (or exported instance)
// Intercept reads/writes         → Proxy
// Replace inheritance            → Plain functions + objects

// Real-world:
//   Redux              → Observer + pure reducers
//   Vue 3 reactivity   → Proxy
//   jQuery             → Module
//   Node events        → Observer
//   Express middleware → Pipe / Composition