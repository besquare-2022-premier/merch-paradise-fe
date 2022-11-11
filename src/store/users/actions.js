/**
 * Action declaration files for the user store
 */

import {
  generateAuthenticationWithCSRFHeader,
  generateCSRFHeader,
} from "../__base/headerUtils";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { getLocalData, storeLocalData } from "../native";
import { obtainCSRF } from "../__base/csrf";
import { ACCESS_TOKEN } from "../native/common_keys";
import { ENDPOINT_BASE } from "../__base/config";

/**
 * get the user profile
 */
export async function getUserProfile(dispatch, getState) {
  console.log("fire");
  const access_token = getLocalData(ACCESS_TOKEN);
  if (!access_token) {
    dispatch({ type: "user/wipe" });
    return;
  }
  let csrf = await obtainCSRF();
  if (!csrf) {
    dispatch({
      type: "user/overwrite",
      data: new Error("Cannot get CSRF"),
    });
    return;
  }
  try {
    let data = await fetchJsonWithCookie(`${ENDPOINT_BASE}/whoami`, {
      headers: {
        ...generateAuthenticationWithCSRFHeader(access_token, csrf),
      },
    });
    dispatch({ type: "user/overwrite", data });
  } catch (e) {
    dispatch({ type: "user/overwrite", data: e });
  }
}
/**
 * Perform the authentication
 */
export function performLogin(username, password) {
  return async function (dispatch, getState) {
    let csrf = await obtainCSRF();
    if (!csrf) {
      dispatch({
        type: "user/overwrite",
        data: new Error("Cannot get CSRF"),
      });
      return;
    }
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
    if (res.status !== 0) {
      dispatch({
        type: "user/overwrite",
        data: new Error(res.message),
      });
    } else {
      //store the access token
      storeLocalData("ACCESS_TOKEN", res.token);
      //chain this to the getUserProfile
      dispatch(getUserProfile);
    }
  };
}
