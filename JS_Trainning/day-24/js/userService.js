// userService.js — writes user objects into the shared cache
import cache from "./cache.js";

export function saveUser(id, data) {
  cache.set(`user:${id}`, data);
  console.log(`[userService] saved user:${id}`, data);
}

export function getUser(id) {
  return cache.get(`user:${id}`);
}