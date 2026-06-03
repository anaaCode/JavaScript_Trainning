// homework-barrel/arrayUtils.js
export function unique(arr) {
  return [...new Set(arr)];
}

export function flatten(arr) {
  return arr.flat(Infinity);
}

export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}