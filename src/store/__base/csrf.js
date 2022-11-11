import { fetchJsonWithCookie } from "../../utils/fetch";
import { getLocalData } from "../native";
import { generateAuthenticationHeader } from "./headerUtils";
import { ENDPOINT_BASE } from "../__base/config";

export async function obtainCSRF() {
  const access_token = getLocalData("ACCESS_TOKEN");
  let data = await fetchJsonWithCookie(`${ENDPOINT_BASE}/csrf`, {
    headers: access_token ? generateAuthenticationHeader(access_token) : {},
  });
  if (data.status === 0) {
    return data.token;
  } else {
    return null;
  }
}
