import React, { useState } from "react";
import "./LogSignup.css";
import { Link, Navigate } from "react-router-dom";
import ReduxStateConditional from "../common/ReduxStateConditional";
import { JumpingRabbitLoader } from "../common/Loader";
import { ValidatingInputField } from "../common/ValidatingInputField";
import { usePageTitle } from "../../utils/reactHooks";
import { obtainCSRF } from "../../store/__base/csrf";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { ENDPOINT_BASE } from "../../store/__base/config";
import DialogContext from "../common/dialog/DialogContext";
import { generateCSRFHeader } from "../../store/__base/headerUtils";
import LogoImage from "../../assets/logo.svg";

export const ResetPassword = (props) => {
  usePageTitle("Reset Password");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = React.useState(false);
  const dialog = React.useContext(DialogContext);
  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function sendRequest(e) {
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
        `${ENDPOINT_BASE}/auth/reset-password`,
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
      dialog.showToast(res.message);
    })().finally(() => setLoading(false));
  }

  return (
    <ReduxStateConditional
      selector={(state) => state.user.data === null}
      alternative={<Navigate to="/shop#loggedin" />}
    >
      <div className="hide-mobile hide-tablet">
        <img className="ellipse-19" src="/img/Ellipse 19.svg" alt=""></img>
        <img className="Vector1" src="/img/Vector.svg" alt=""></img>
        <img className="VectorLine" src="/img/Vector 1 (2).svg" alt=""></img>
      </div>
      <img className="logo" src={LogoImage} alt="Logo"></img>
      <div className="login-container">
        <div className="login-form-wrapper">
          <img
            className="login2 hide-mobile hide-tablet"
            src="/img/login2.svg"
            alt=""
          ></img>
          <h1 className="LoginTitle">Welcome back to MerchParadise !</h1>
          <div style={{ height: "10vh" }} />
          <div className="auth-form-container">
            <h2 className="header">Reset Password</h2>
            <form className="login-form" onSubmit={sendRequest}>
              <ValidatingInputField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                id="email"
                name="email"
                valid={!!email}
                error_message="This field is mandatory"
              />
              <div className="action-buttons">
                <Link className="link-btn" to="/register">
                  Don't have an account? Sign Up.
                </Link>
                {loading ? (
                  <JumpingRabbitLoader dataRole="submit-button" />
                ) : (
                  <button type="submit" data-role="submit-button">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
};
