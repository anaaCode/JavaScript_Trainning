// math/index.js — barrel file
// Re-exports all named functions from each math module in one place.
// Consumers import from "./math" instead of three separate paths.
export { add }      from "./add.js";
export { multiply } from "./multiply.js";
export { divide }   from "./divide.js";