// homework-productService.js
import store from "./homework-cache.js";

export function saveProduct(id, data) {
  store.set(`product:${id}`, data);
}

export function getProduct(id) {
  return store.get(`product:${id}`);
}