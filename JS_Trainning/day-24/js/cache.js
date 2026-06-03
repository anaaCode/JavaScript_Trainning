// cache.js — singleton shared cache
// Because ES modules are evaluated once and cached by the runtime,
// every importer of this file receives the SAME Map instance.

const cache = new Map();
export default cache;