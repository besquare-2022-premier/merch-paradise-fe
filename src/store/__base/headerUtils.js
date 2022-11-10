export function generateAuthenticationHeader(access_token) {
  return { "X-Access-Token": access_token };
}
export function generateCSRFHeader(csrf_token) {
  return { "X-CSRF-Token": csrf_token };
}
export function generateAuthenticationWithCSRFHeader(access_token, csrf_token) {
  return { "X-CSRF-Token": csrf_token, "X-Access-Token": access_token };
}
