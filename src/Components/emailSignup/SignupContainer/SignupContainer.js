import React from "react";
import { Navigate } from "react-router-dom";
import { ENDPOINT_BASE } from "../../../store/__base/config";
import { obtainCSRF } from "../../../store/__base/csrf";
import { generateCSRFHeader } from "../../../store/__base/headerUtils";
import { fetchJsonWithCookie } from "../../../utils/fetch";
import { JumpingRabbitLoader } from "../../common/Loader";
import { ValidatingInputField } from "../../common/ValidatingInputField";
import "./SignupContainer.css";

export default function SignupContainer() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }
  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function performSignup(e) {
    e.preventDefault();
    if (!e.nativeEvent.target.reportValidity()) {
      return false;
    }
    (async function () {
      setLoading(true);
      let csrf = await obtainCSRF();
      if (!csrf) throw new Error("Cannot get CSRF");
      //construct the request to the endpoint
      let res = await fetchJsonWithCookie(
        `${ENDPOINT_BASE}/auth/register`,
        {
          headers: {
            ...generateCSRFHeader(csrf),
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ email }),
        },
        true
      );
      alert(res.message);
    })().finally(() => setLoading(false));
  }
  return (
    <div className="main-signup-container">
      <div className="left-signup-container">
        <div className="left-container-textbox">
          <h1>Welcome to MerchParadise</h1>
        </div>

        <div className="email-signup">
          <div className="signup-input-container">
            {loading ? (
              <div style={{ height: "20vh" }}>
                <JumpingRabbitLoader />
              </div>
            ) : (
              <>
                <h2> Enter your email</h2>
                <form className="email-signup-form" onSubmit={performSignup}>
                  <ValidatingInputField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                    id="email"
                    name="email"
                    valid={!!email}
                    hide_label={true}
                    error_message="The field is mandatory >_<"
                  />
                  <div className="action-buttons">
                    <a
                      className="link-btn"
                      onClick={() => setShouldRedirect(true)}
                    >
                      Have an account? Log in.
                    </a>
                    <button type="submit">Sign up</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="right-signup-container">
        <img
          className="img-signup"
          src="./img/email-registration/signup-image.svg"
          alt="signup-img"
        />
      </div>
    </div>
  );
}
