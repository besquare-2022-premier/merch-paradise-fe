/**
 * Action declaration files for the user store
 */

import {
  generateAuthenticationHeader,
  generateAuthenticationWithCSRFHeader,
  generateCSRFHeader,
} from "../__base/headerUtils";
import { fetchJsonWithCookie, fetchWithCookie } from "../../utils/fetch";
import { clearLocalData, getLocalData, storeLocalData } from "../native";
import { obtainCSRF } from "../__base/csrf";
import { ACCESS_TOKEN } from "../native/common_keys";
import { ENDPOINT_BASE } from "../__base/config";
import { NO_ERROR } from "../__base/error_codes";

/**
 * get the user profile
 */
export async function getUserProfile(dispatch, getState) {
  if (getState().user.loader_state === "loading") {
    return;
  }
  dispatch({ type: "user/loading" });
  const access_token = getLocalData(ACCESS_TOKEN);
  console.log(access_token);
  if (!access_token) {
    dispatch({ type: "user/wipe" });
    return;
  }
  try {
    console.log("Updating");
    let data = await fetchJsonWithCookie(
      `${ENDPOINT_BASE}/whoami`,
      {
        headers: {
          ...generateAuthenticationHeader(access_token),
        },
      },
      true
    );
    if (data?.status) {
      if (data.status === NO_ERROR) {
        clearLocalData(ACCESS_TOKEN);
        dispatch({ type: "user/wipe" });
      } else {
        dispatch({ type: "user/failed", error: new Error(data.message) });
      }
    }
    dispatch({ type: "user/update", data });
  } catch (e) {
    dispatch({ type: "user/failed", error: e });
  }
}
/**
 * Perform the authentication
 */
export function performLogin(username, password) {
  return async function (dispatch, getState) {
    dispatch({ type: "user/loading" });
    let csrf = await obtainCSRF();
    if (!csrf) {
      dispatch({
        type: "user/failed",
        error: new Error("Cannot get CSRF"),
      });
      return;
    }
    try {
      //construct a JSON request and send to the backend
      let res = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...generateCSRFHeader(csrf),
          },
          body: JSON.stringify({ username, password }),
        },
        true
      );
      if (res.status !== NO_ERROR) {
        dispatch({
          type: "user/failed",
          error: new Error(res.message),
        });
      } else {
        //store the access token
        storeLocalData("ACCESS_TOKEN", res.token);
        dispatch({
          type: "user/done",
        });
        //chain this to the getUserProfile
        dispatch(getUserProfile);
      }
    } catch (e) {
      dispatch({ type: "user/failed", error: e });
    }
  };
}
/**
 * Log user out
 */
export async function performLogout(dispatch, getState) {
  dispatch({ type: "user/loading" });
  const access_token = getLocalData(ACCESS_TOKEN);
  if (!access_token) return;
  try {
    await fetchWithCookie(`${ENDPOINT_BASE}/auth/revoke`, {
      headers: {
        ...generateAuthenticationHeader(access_token),
      },
    });
    clearLocalData(ACCESS_TOKEN);
    dispatch({ type: "user/wipe" });
    dispatch({ type: "user/done" });
  } catch (e) {
    dispatch({ type: "user/failed", error: e });
  }
}
/**
 * Completes the signup
 * @param {string} verification_code
 * @param {any} data Refer /auth/finalize-registration for more info
 */
export function completeSignUp(verification_code, data) {
  return async function (dispatch) {
    dispatch({ type: "user/loading" });
    let csrf = await obtainCSRF();
    if (!csrf) {
      dispatch({
        type: "user/failed",
        error: new Error("Cannot get CSRF"),
      });
      return;
    }
    try {
      //construct a JSON request and send to the backend
      let res = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/auth/finalize-registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...generateCSRFHeader(csrf),
          },
          body: JSON.stringify({ ...data, verification_code }),
        },
        true
      );
      if (res.status !== NO_ERROR) {
        dispatch({
          type: "user/failed",
          error: new Error(res.message),
        });
      } else {
        //store the access token
        storeLocalData("ACCESS_TOKEN", res.token);
        //chain this to the getUserProfile
        dispatch(getUserProfile);
      }
    } catch (e) {
      dispatch({
        type: "user/failed",
        error: e,
      });
    }
  };
}
export function updateProfile(patch) {
  return async function (dispatch, getState) {
    dispatch({ type: "user/loading" });
    const access_token = getLocalData(ACCESS_TOKEN);
    if (!access_token) {
      return;
    }
    let csrf = await obtainCSRF();
    if (!csrf) {
      dispatch({
        type: "user/failed",
        error: new Error("Cannot get CSRF"),
      });
      return;
    }
    try {
      let data = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/whoami`,
        {
          headers: {
            ...generateAuthenticationWithCSRFHeader(access_token, csrf),
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(patch),
        },
        true
      );
      if (data?.status) {
        dispatch({ type: "user/failed", error: new Error(data.message) });
        return;
      }
      //the endpoint returns the new data when it is succeeded
      dispatch({ type: "user/update", data });
    } catch (e) {
      dispatch({ type: "user/failed", error: e });
    }
  };
}
export function updatePassword(params) {
  return async function (dispatch, getState) {
    dispatch({ type: "user/loading" });
    const access_token = getLocalData(ACCESS_TOKEN);
    if (!access_token) {
      return;
    }
    let csrf = await obtainCSRF();
    if (!csrf) {
      dispatch({
        type: "user/failed",
        error: new Error("Cannot get CSRF"),
      });
      return;
    }
    try {
      let data = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/whoami/change-password`,
        {
          headers: {
            ...generateAuthenticationWithCSRFHeader(access_token, csrf),
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(params),
        },
        true
      );
      if (data?.status !== 0) {
        dispatch({ type: "user/failed", error: new Error(data.message) });
        return;
      }
      //mark it as done without updating anything
      dispatch({ type: "user/done" });
    } catch (e) {
      dispatch({ type: "user/failed", error: e });
    }
  };
}
