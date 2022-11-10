/**
 *
 * @param {RequestInfo|URL} url
 * @param {RequestInit?} init
 * @returns {Promise<Response>}
 */
export function fetchWithCookie(url, init) {
  init = init ?? {};
  init.credentials = "include";
  return fetch(url, init);
}

/**
 *
 * @param {RequestInfo|URL} url
 * @param {RequestInit?} init
 * @returns {Promise<any>}
 */
export async function fetchJsonWithCookie(
  url,
  init,
  passthrough_error = false
) {
  let res = await fetchWithCookie(url, init);
  if (!res.ok && !passthrough_error) {
    let error = new Error("Request failed");
    error.res = res;
    throw error;
  }
  return await res.json();
}
