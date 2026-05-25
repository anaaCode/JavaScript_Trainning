// Exercise 1: Deep Immutable Update
const original = {
  a: {
    b: {
      c: { value: 1, other: 42 },
    },
    sibling: "untouched",
  },
};

const updated = {
  ...original,
  a: {
    ...original.a,
    b: {
      ...original.a.b,
      c: { ...original.a.b.c, value: 99 },
    },
  },
};

console.log(updated.a.b.c.value);   // 99
console.log(original.a.b.c.value);  // 1
console.log(updated.a.sibling === original.a.sibling); // true — shared reference

// Exercise 2: deepFreeze
function deepFreeze(obj) {
  Object.values(obj).forEach((v) => {
    if (v && typeof v === "object") deepFreeze(v);
  });
  return Object.freeze(obj);
}

const config = deepFreeze({
  server: {
    host: "localhost",
    db: { port: 5432, name: "mydb" },
  },
});

config.server.host    = "remote"; // ignored
config.server.db.port = 9999;     // ignored
config.server.db.name = "changed"; // ignored

console.log(config.server.host);     // "localhost"
console.log(config.server.db.port);  // 5432
console.log(config.server.db.name);  // "mydb"

// Exercise 3: pick() Helper
function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {});
}

const user = { name: "Priya", age: 25, city: "Jaipur", role: "admin" };
console.log(pick(user, ["name", "role"])); // { name: "Priya", role: "admin" }
console.log(pick(user, ["age", "city"]));  // { age: 25, city: "Jaipur" }
console.log(user); // original untouched

// Exercise 4: updateField() with Computed Keys
function updateField(obj, key, value) {
  return { ...obj, [key]: value };
}

const user2 = { name: "Priya", age: 25, city: "Jaipur" };
const step1 = updateField(user2, "age", 26);
const step2 = updateField(step1, "city", "Mumbai");

console.log(step2); // { name: "Priya", age: 26, city: "Mumbai" }
console.log(user2); // { name: "Priya", age: 25, city: "Jaipur" } — untouched