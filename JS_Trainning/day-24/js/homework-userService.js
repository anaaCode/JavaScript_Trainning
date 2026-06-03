// homework-userService.js
import store from "./homework-cache.js";

export function saveUser(id, data) {
  store.set(`user:${id}`, data);
}

export function getUser(id) {
  return store.get(`user:${id}`);
}