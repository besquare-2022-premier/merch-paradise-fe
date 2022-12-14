import { fetchJsonWithCookie } from "../../utils/fetch";
import { ENDPOINT_BASE } from "../__base/config";

/**
 * Get products
 * @param {number} limit
 * @returns
 */
export function loadProducts(limit = 50, reset = true) {
  if (limit <= 0) {
    throw new Error("invalid limits");
  }
  return async function (dispatch, getState) {
    let { page, query, category, loading } = getState().products;
    if (loading.includes("products")) {
      return;
    }
    if (reset) {
      dispatch({ type: "products/updateProducts", data: null, tag: query });
    }
    dispatch({ type: "products/loading", loading: "products" });
    //perform the request
    try {
      let res = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/product/${category ?? ""}?q=${encodeURIComponent(
          query
        )}&page=${page}&limit=${limit}`
      );
      let { results } = res;
      let data = { ids: [], map: {} };
      const { ids, map } = data;
      for (const entry of results) {
        ids.push(entry.product_id);
        map[entry.product_id] = entry;
      }
      dispatch({ type: "products/updateProducts", data, tag: query });
    } catch (e) {
      dispatch({ type: "products/failed", error: e });
    }
  };
}
export function getRecommendedProducts(limit = 5) {
  if (limit <= 0) {
    throw new Error("invalid limits");
  }
  return async function (dispatch, getState) {
    let { category, loading } = getState().products;
    if (loading.includes("recommended")) {
      return;
    }
    dispatch({ type: "products/updateRecommendedProducts", data: null });
    dispatch({ type: "products/loading", loading: "recommended" });
    try {
      let res = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/product/${category ?? ""}?rnd=1&limit=${limit}`
      );
      let { results } = res;
      let data = { ids: [], map: {} };
      const { ids, map } = data;
      for (const entry of results) {
        ids.push(entry.product_id);
        map[entry.product_id] = entry;
      }
      dispatch({ type: "products/updateRecommendedProducts", data });
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
