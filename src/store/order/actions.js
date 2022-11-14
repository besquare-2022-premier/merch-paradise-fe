import { fetchJsonWithCookie } from "../../utils/fetch";
import { ENDPOINT_BASE } from "../__base/config";


/**
 * get user orders
 */
export async function loadOrders(limit = 50) {
  if (limit <= 0) {
    throw new Error("invalid limits");
  }
  return async function (dispatch, getState) {
    let { page } = getState().orders;
    dispatch({ type: "orders/loading" });
    try {
      let res = fetchJsonWithCookie(
        `${ENDPOINT_BASE}/orders?page=${page}&limit=${limit}`
      );
      let { results } = res;
      let data = { ids: [], map: {} };
      const {ids, map} = data;
      for (const orders in results) {
        ids.push(orders.orderid);
        map[orders.orderid] = entry;
      }
      dispatch({ type: "orders/update", data });
    } catch (e) {
      dispatch({ type: "orders/failed", error: e });
    }
  };
}
