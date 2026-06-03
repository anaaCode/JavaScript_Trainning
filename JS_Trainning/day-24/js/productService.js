// productService.js — writes product objects into the shared cache
import cache from "./cache.js";

export function saveProduct(id, data) {
  cache.set(`product:${id}`, data);
  console.log(`[productService] saved product:${id}`, data);
}

export function getProduct(id) {
  return cache.get(`product:${id}`);
}