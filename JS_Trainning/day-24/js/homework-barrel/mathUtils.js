// homework-barrel/mathUtils.js
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function roundTo(n, decimals = 2) {
  return Math.round(n * 10 ** decimals) / 10 ** decimals;
}