import { fetchJsonWithCookie } from "../../utils/fetch";
import { ENDPOINT_BASE } from "../__base/config";

/**
 * Get products
 * @param {number} limit
 * @returns
 */
export function loadProducts(limit = 50) {
  if (limit <= 0) {
    throw new Error("invalid limits");
  }
  return async function (dispatch, getState) {
    let { page, query, category } = getState().products;
    dispatch({ type: "products/loading" });
    //perform the request
    try {
      let res = fetchJsonWithCookie(
        `${ENDPOINT_BASE}/product/${category ?? ""}?q=${encodeURIComponent(
          query
        )}&page=${page}&limit=${limit}`
      );
      let { results } = res;
      let data = { ids: [], map: {} };
      const { ids, map } = data;
      for (const entry in results) {
        ids.push(entry.product_id);
        map[entry.product_id] = entry;
      }
      dispatch({ type: "products/update", data });
    } catch (e) {
      dispatch({ type: "products/failed", error: e });
    }
  };
}
export function setQuery(query) {
  return { type: "products/setCurrentQuery", query };
}
export function setCurrentPage(page) {
  return { type: "products/setCurrentPage", page };
}
export function setCategory(category) {
  return { type: "products/setCategory", category };
}
