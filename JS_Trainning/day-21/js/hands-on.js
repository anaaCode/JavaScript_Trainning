// Task 1: Prove the Shallow Clone Bug
const orig = { name: "Priya", addr: { city: "Jaipur" } };

const copy = { ...orig };
copy.addr.city = "Mumbai";
console.log(orig.addr.city);  // "Mumbai" — BUG: orig was mutated!

const deep = structuredClone(orig);
deep.addr.city = "Delhi";
console.log(orig.addr.city);  // "Mumbai" — orig untouched (deep is independent)

// Task 2: Immutable Nested Update
const state = {
  user: {
    name: "Priya",
    prefs: { theme: "light", lang: "en" }
  }
};

const newState = {
  ...state,
  user: {
    ...state.user,
    prefs: { ...state.user.prefs, theme: "dark" }
  }
};

console.log(newState.user.prefs.theme); // "dark"
console.log(state.user.prefs.theme);    // "light" — original untouched

// Task 3: Update One Item in an Array
const tasks = [
  { id: 1, title: "Learn JS",  done: false },
  { id: 2, title: "Build app", done: false },
];

function toggleDone(tasks, id) {
  return tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
}

const t1 = toggleDone(tasks, 1);
const t2 = toggleDone(tasks, 2);

console.log(t1[0].done);    // true
console.log(t2[1].done);    // true
console.log(tasks[0].done); // false — original never mutated
console.log(tasks[1].done); // false — original never mutated

// Bonus: Safe Deep Read
const data = { user: { name: "Priya", profile: { city: null } } };

const city = data?.user?.profile?.city ?? "Unknown";
console.log(city);   // "Unknown"

const bioLen = data?.user?.profile?.bio?.length ?? 0;
console.log(bioLen); // 0

const empty = {};
console.log(empty?.user?.profile?.city ?? "Unknown"); // "Unknown"
console.log(empty?.user?.profile?.bio?.length ?? 0);  // 0