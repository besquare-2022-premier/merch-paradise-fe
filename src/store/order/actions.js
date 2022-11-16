import { fetchJsonWithCookie } from "../../utils/fetch";
import { getLocalData } from "../native";
import { ACCESS_TOKEN } from "../native/common_keys";
import { ENDPOINT_BASE } from "../__base/config";
import { generateAuthenticationHeader } from "../__base/headerUtils";

/**
 * get user orders
 */
export function loadOrders(page = 1, limit = 50) {
  if (limit <= 0) {
    throw new Error("invalid limits");
  }
  return async function (dispatch, getState) {
    dispatch({ type: "orders/loading" });
    const access_token = getLocalData(ACCESS_TOKEN);
    if (!access_token) {
      dispatch({ type: "user/wipe" });
      return;
    }
    try {
      let res = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/orders?page=${page}&limit=${limit}`,
        {
          headers: { ...generateAuthenticationHeader(access_token) },
        }
      );
      let { results } = res;
      let data = { ids: [], map: {} };
      const { ids, map } = data;
      for (const orders of results) {
        ids.push(orders.order_id);
        map[orders.order_id] = orders;
      }
      dispatch({ type: "orders/update", data });
    } catch (e) {
      dispatch({ type: "orders/failed", error: e });
    }
  };
}
