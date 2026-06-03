// Day 26 – Design Patterns (hands-on)

// ─────────────────────────────────────────────
// Task 1: Tiny EventEmitter
// ─────────────────────────────────────────────

function createEmitter() {
  const listeners = new Map();

  return {
    on(event, callback) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(callback);
    },
    off(event, callback) {
      listeners.get(event)?.delete(callback);
    },
    emit(event, ...args) {
      listeners.get(event)?.forEach((cb) => cb(...args));
    },
  };
}

const bus = createEmitter();
const greetA = () => console.log("listener A fired");
const greetB = () => console.log("listener B fired");

bus.on("hello", greetA);
bus.on("hello", greetB);

console.log("--- first emit (both listeners) ---");
bus.emit("hello");
// listener A fired
// listener B fired

bus.off("hello", greetA);

console.log("--- second emit (B only) ---");
bus.emit("hello");
// listener B fired


// ─────────────────────────────────────────────
// Task 2: User Factory
// ─────────────────────────────────────────────

function createUser(name, role = "user") {
  return {
    name,
    role,
    canEdit() { return this.role === "admin"; },
  };
}

const u1 = createUser("Priya");
const u2 = createUser("Aarav", "admin");

console.log("--- User Factory ---");
console.log(u1.name, u1.canEdit());   // Priya false
console.log(u2.name, u2.canEdit());   // Aarav true


// ─────────────────────────────────────────────
// Task 3: Module-Singleton Cache
// ─────────────────────────────────────────────

function createCache() {
  const store = new Map();   // private

  return {
    set(key, value) { store.set(key, value); },
    get(key)        { return store.get(key); },
    has(key)        { return store.has(key); },
    get size()      { return store.size; },
  };
}

const cacheA = createCache();
const cacheB = createCache();

cacheA.set("user", "Priya");

console.log("--- Cache (independent instances) ---");
console.log(cacheA.get("user"));   // Priya
console.log(cacheB.has("user"));   // false — independent
console.log(cacheA.size);          // 1
console.log(cacheB.size);          // 0

// To make a shared singleton cache, in a module file you would write:
//   export default createCache();
// Every importer then receives the SAME instance (modules are evaluated once).


// ─────────────────────────────────────────────
// Bonus: Reactive Counter with Proxy
// ─────────────────────────────────────────────

function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      onChange(prop, value);
      return true;
    },
  });
}

const state = reactive({ count: 0 }, (key, val) =>
  console.log(`${key} → ${val}`)
);

console.log("--- Reactive Proxy ---");
state.count = 1;      // count → 1
state.count = 5;      // count → 5
state.name  = "Riya"; // name → Riya  (new property — trap fires too)