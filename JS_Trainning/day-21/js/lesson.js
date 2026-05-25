// Topic 1: Shallow vs Deep Clone
const original = {
  name: "Priya",
  address: { city: "Jaipur", pin: 302001 },
  hobbies: ["reading", "trekking"],
};

const a = { ...original };
a.address.city = "Mumbai";
console.log(original.address.city);          // "Mumbai" — original also changed!
console.log(a.address === original.address); // true — same nested object

const c = JSON.parse(JSON.stringify(original));
c.address.city = "Delhi";
console.log(original.address.city);          // "Mumbai" — c is independent

const tricky = { d: new Date(), m: new Map(), u: undefined };
console.log(JSON.parse(JSON.stringify(tricky))); // { d: "...", m: {} } ← lost!

// Topic 2: structuredClone
const orig2 = {
  name: "Priya",
  date: new Date(),
  nested: { city: "Jaipur" },
  scores: new Map([["math", 90]]),
};

const copy = structuredClone(orig2);
copy.nested.city = "Mumbai";
console.log(orig2.nested.city);      // "Jaipur"
console.log(copy.date instanceof Date);   // true
console.log(copy.scores instanceof Map);  // true

// Topic 3: Object.freeze and deepFreeze
const config = Object.freeze({ host: "api.example.com", port: 8080 });
config.port = 9000;
console.log(config.port); // 8080

const user3 = Object.freeze({ name: "Priya", address: { city: "Jaipur" } });
user3.name = "Anaya";           // ignored
user3.address.city = "Mumbai";  // SUCCEEDS — address itself isn't frozen
console.log(user3.address.city); // "Mumbai"

function deepFreeze(obj) {
  Object.values(obj).forEach((v) => {
    if (v && typeof v === "object") deepFreeze(v);
  });
  return Object.freeze(obj);
}

const fully = deepFreeze({ a: 1, n: { x: 2 } });
fully.n.x = 99;
console.log(fully.n.x); // 2

// Topic 4: Immutable Updates with Spread
const user = {
  name: "Priya", age: 25,
  address: { city: "Jaipur", pin: 302001 },
  hobbies: ["reading", "trekking"],
};

const u1 = { ...user, age: 26 };
console.log(u1.age, user.age); // 26  25

const u2 = { ...user, address: { ...user.address, city: "Mumbai" } };
console.log(u2.address.city, user.address.city); // "Mumbai" "Jaipur"

const u3 = { ...user, hobbies: [...user.hobbies, "swimming"] };
console.log(u3.hobbies);  // ["reading", "trekking", "swimming"]
console.log(user.hobbies); // ["reading", "trekking"]

const u4 = { ...user, hobbies: user.hobbies.filter(h => h !== "trekking") };
console.log(u4.hobbies); // ["reading"]

const tasks = [{ id: 1, done: false }, { id: 2, done: false }];
const t1 = tasks.map(t => t.id === 1 ? { ...t, done: true } : t);
console.log(t1[0].done);   // true
console.log(tasks[0].done); // false

// Topic 5: Advanced Destructuring
const { name, role = "user" } = { name: "Priya" };
console.log(name, role); // "Priya" "user"

const { name: userName, role: userRole = "user" } = { name: "Aarav" };
console.log(userName, userRole); // "Aarav" "user"

const cfg = { api: { host: "api.example.com", port: 8080 } };
const { api: { host: apiHost, port: apiPort } } = cfg;
console.log(apiHost, apiPort); // "api.example.com" 8080

const [first = "?", second = "?", ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest); // 1 2 [3, 4, 5]

function Card({ title, subtitle = "—", actions = [] }) {
  console.log(title, subtitle, actions);
}
Card({ title: "Hello", actions: ["delete"] }); // "Hello" "—" ["delete"]

// Topic 6: Computed Keys
const field = "city";
const b = { [field]: "Mumbai" };
console.log(b); // { city: "Mumbai" }

function updateField(obj, key, val) {
  return { ...obj, [key]: val };
}
const user6 = { name: "Priya", age: 25 };
console.log(updateField(user6, "age", 26));
console.log(updateField(user6, "city", "Jaipur"));

// Topic 7: Optional Chaining + Nullish Coalescing
const response = {
  user: { name: "Priya", profile: { bio: null } },
};

const city7 = response?.user?.profile?.city;
console.log(city7); // undefined

const cityOrDefault = response?.user?.profile?.city ?? "Unknown";
console.log(cityOrDefault); // "Unknown"

const upper = response?.user?.name?.toUpperCase?.();
console.log(upper); // "PRIYA"

const firstTag = response?.user?.tags?.[0] ?? "no tags";
console.log(firstTag); // "no tags"