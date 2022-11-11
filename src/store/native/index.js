/**
 * localStorage backed datastore
 */
export function storeLocalData(key, value) {
  localStorage.setItem(key, value ? JSON.stringify(value) : null);
}
export function getLocalData(key) {
  let ret = localStorage.getItem(key);
  if (ret) {
    return JSON.parse(ret);
  }
  return ret;
}
export function clearLocalData(key) {
  localStorage.removeItem(key);
}
