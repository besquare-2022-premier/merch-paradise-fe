import { fetchJsonWithCookie } from "../../utils/fetch";
import { getLocalData } from "../native";
import { ACCESS_TOKEN } from "../native/common_keys";
import { ENDPOINT_BASE } from "../__base/config";
import { obtainCSRF } from "../__base/csrf";
import { generateAuthenticationWithCSRFHeader } from "../__base/headerUtils";

export async function clearCart(dispatch, getState) {
  const access_token = getLocalData(ACCESS_TOKEN);
  if (!access_token) {
    //TODO implement guest cart
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
    //todo deal with offline
    return;
  }
  try {
    console.log("Getting");
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
      //todo deal with offline
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
