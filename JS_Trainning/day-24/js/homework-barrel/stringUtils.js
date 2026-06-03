// homework-barrel/stringUtils.js
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str, max = 20) {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

export function isPalindrome(str) {
  const s = str.toLowerCase().replace(/\s/g, "");
  return s === [...s].reverse().join("");
}