// Day 26 – Design Patterns (homework)

// ─────────────────────────────────────────────
// Task 1: once() for EventEmitter
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
    once(event, fn) {
      const wrapper = (...args) => {
        fn(...args);
        this.off(event, wrapper);   // auto-unsubscribe after first call
      };
      this.on(event, wrapper);
    },
  };
}

const bus = createEmitter();
bus.once("boot", () => console.log("booted!"));

console.log("--- once() ---");
bus.emit("boot");   // booted!
bus.emit("boot");   // (nothing)
bus.emit("boot");   // (nothing)


// ─────────────────────────────────────────────
// Task 2: Cache with TTL
// ─────────────────────────────────────────────

function cacheFactory(ttlMs) {
  const store = new Map();   // key → { value, expiresAt }

  return {
    set(key, value) {
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
    },
    get(key) {
      const entry = store.get(key);
      if (!entry) return undefined;
      if (Date.now() > entry.expiresAt) {
        store.delete(key);
        return undefined;
      }
      return entry.value;
    },
    has(key) { return this.get(key) !== undefined; },
  };
}

const cache = cacheFactory(500);   // 500 ms TTL
cache.set("token", "abc123");

console.log("--- TTL Cache ---");
console.log(cache.get("token"));   // "abc123"

setTimeout(() => {
  console.log(cache.get("token")); // undefined — expired after 500 ms
}, 600);


// ─────────────────────────────────────────────
// Task 3: Array Debugging Proxy
// ─────────────────────────────────────────────

function debugArray(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      console.log(`[GET]    ${prop}`);
      return typeof target[prop] === "function"
        ? target[prop].bind(target)
        : target[prop];
    },
    set(target, prop, value) {
      console.log(`[SET]    ${prop} = ${JSON.stringify(value)}`);
      target[prop] = value;
      return true;
    },
    deleteProperty(target, prop) {
      console.log(`[DELETE] ${prop}`);
      delete target[prop];
      return true;
    },
  });
}

console.log("--- Array Debug Proxy ---");
const arr = debugArray([1, 2, 3]);
arr.push(4);     // [GET] push → [GET] length → [SET] 3 = 4 → [SET] length = 4
arr[0] = 99;     // [SET] 0 = 99
delete arr[2];   // [DELETE] 2


// ─────────────────────────────────────────────
// Task 4: MVC / MVVM — reading task
// ─────────────────────────────────────────────

// Write your paragraph in a comment after reading about MVC/MVVM:
//
// (Your answer here — 3-5 sentences relating React's state model to MVC/MVVM)
//
// Tip: React components sit somewhere between MVVM and Component-based
// architecture. The component is both View and ViewModel; state is the Model;
// and setState() triggers re-render (the "binding"). There is no explicit
// Controller — event handling lives directly in the component or in custom
// hooks, making the coupling tighter but the file count lower.


// ─────────────────────────────────────────────
// Bonus: Vue Reactivity observations
// ─────────────────────────────────────────────

// After reading packages/reactivity/src/reactive.ts, note your observations:
//
// 1. Vue wraps objects recursively — deep reactivity by default, not just top-level.
// 2. Vue tracks which effect (computed / watchEffect) is currently running
//    (via a global `activeEffect`) and records the dep inside the `get` trap —
//    our version calls onChange unconditionally instead.
// 3. Vue uses a WeakMap to cache Proxy instances so the same raw object always
//    returns the same Proxy — prevents creating multiple proxies for one target.