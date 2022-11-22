import { fetchJsonWithCookie } from "../../utils/fetch";
import { clearLocalData, getLocalData, storeLocalData } from "../native";
import { ACCESS_TOKEN, LOCAL_CART } from "../native/common_keys";
import { ENDPOINT_BASE } from "../__base/config";
import { obtainCSRF } from "../__base/csrf";
import {
  generateAuthenticationWithCSRFHeader,
  generateAuthenticationHeader,
} from "../__base/headerUtils";

export async function clearCart(dispatch, getState) {
  const access_token = getLocalData(ACCESS_TOKEN);
  if (!access_token) {
    clearLocalData(LOCAL_CART);
    dispatch({ type: "cart/wipe" });
    dispatch({ type: "cart/done" });
    return;
  }
  const csrf = await obtainCSRF();
  if (!csrf) {
    dispatch({ type: "cart/failed", error: new Error("Cannot get CSRF") });
    return;
  }
  try {
    await fetchJsonWithCookie(`${ENDPOINT_BASE}/orders/cart`, {
      headers: { ...generateAuthenticationWithCSRFHeader(access_token, csrf) },
      method: "DELETE",
    });
    dispatch({ type: "cart/wipe" });
    dispatch({ type: "cart/done" });
  } catch (error) {
    dispatch({
      type: "cart/failed",
      error,
    });
  }
}

/* Get Cart */

export async function getCart(dispatch, getState) {
  if (getState().cart.loader_state === "loading") {
    return;
  }
  dispatch({ type: "cart/loading" });
  const access_token = getLocalData(ACCESS_TOKEN);
  if (!access_token) {
    let cart = getLocalData(LOCAL_CART);
    let products = getState().products;
    try {
      await Promise.all(
        cart.map(async function (content) {
          let { stock } = await fetchJsonWithCookie(
            `${ENDPOINT_BASE}/product/stocks/${content.product}`
          );
          let data =
            products.data?.map[content.product] ??
            (await fetchJsonWithCookie(
              `${ENDPOINT_BASE}/product/item/${content.product}`
            ));
          content.product_name = data.name;
          content.unit_price = data.price;
          content.available = stock > 0;
        })
      );
      dispatch({ type: "cart/update", data: cart });
    } catch (e) {
      dispatch({ type: "cart/failed", error: e });
    }
    return;
  }
  try {
    let data = await fetchJsonWithCookie(
      `${ENDPOINT_BASE}/orders/cart`,
      {
        headers: {
          ...generateAuthenticationHeader(access_token),
        },
      },
      true
    );
    if (data?.status) {
      dispatch({ type: "cart/failed", error: new Error(data.message) });
    }
    dispatch({ type: "cart/update", data });
  } catch (e) {
    dispatch({ type: "cart/failed", error: e });
  }
}

export function updateCart(updates) {
  return async function (dispatch, getState) {
    if (getState().cart.loader_state === "loading") {
      return;
    }
    dispatch({ type: "cart/loading" });
    const access_token = getLocalData(ACCESS_TOKEN);
    if (!access_token) {
      let cart = getLocalData(LOCAL_CART);
      cart = [...cart, ...updates].filter((z) => z.quantity > 0);
      storeLocalData(LOCAL_CART, cart);
      dispatch({ type: "cart/update", data: cart });
      return;
    }
    const csrf = await obtainCSRF();
    if (!csrf) {
      dispatch({ type: "cart/failed", error: new Error("Cannot get CSRF") });
      return;
    }

    try {
      let data = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/orders/cart`,
        {
          headers: {
            ...generateAuthenticationWithCSRFHeader(access_token, csrf),
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(updates),
        },
        true
      );
      if (data?.status) {
        dispatch({ type: "cart/failed", error: new Error(data.message) });
      }
      dispatch({ type: "cart/update", data });
    } catch (e) {
      dispatch({ type: "cart/failed", error: e });
    }
  };
}

export function populateCart(orderid) {
  return async function (dispatch, getState) {
    if (getState().cart.loader_state === "loading") {
      return;
    }
    dispatch({ type: "cart/loading" });
    const access_token = getLocalData(ACCESS_TOKEN);
    if (!access_token) {
      dispatch({
        type: "cart/failed",
        error: new Error("Cannot get order to fulfill the request"),
      });
      return;
    }
    const csrf = await obtainCSRF();
    if (!csrf) {
      dispatch({ type: "cart/failed", error: new Error("Cannot get CSRF") });
      return;
    }

    try {
      let data = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/orders/cart/populate`,
        {
          headers: {
            ...generateAuthenticationWithCSRFHeader(access_token, csrf),
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ orderid }),
        },
        true
      );
      if (data?.status) {
        dispatch({ type: "cart/failed", error: new Error(data.message) });
      }
      dispatch({ type: "cart/update", data });
    } catch (e) {
      dispatch({ type: "cart/failed", error: e });
    }
  };
}
