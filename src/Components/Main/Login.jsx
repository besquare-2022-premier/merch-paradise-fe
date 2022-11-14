import React, { useState } from "react";
import "./LogSignup.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performLogin } from "../../store/users/actions";
import ReduxStateConditional from "../common/ReduxStateConditional";
import { JumpingRabbitLoader } from "../common/Loader";
import { ValidatingInputField } from "../common/ValidatingInputField";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.nativeEvent.target.reportValidity()) {
      return;
    }
    dispatch(performLogin(email, pass));
  };
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const state = useSelector((state) => state.user);

  if (shouldRedirect) {
    return <Navigate to="/register" />;
  }

  if (state.loader_state === "failed") {
    alert(state.error.message);
    dispatch({ type: "user/wipe" });
  }

  return (
    <ReduxStateConditional
      selector={(state) => state.user.data === null}
      alternative={<Navigate to="/shop" />}
    >
      <div className="hide-mobile hide-tablet">
        <img className="ellipse-19" src="/img/Ellipse 19.svg"></img>
        <img className="Vector1" src="/img/Vector.svg"></img>
        <img className="VectorLine" src="/img/Vector 1 (2).svg"></img>
      </div>
      <img className="logo" src="/img/LOGO.svg"></img>
      <div className="login-container">
        <div className="login-form-wrapper">
          <img
            className="login2 hide-mobile hide-tablet"
            src="/img/login2.svg"
          ></img>
          <h1 className="LoginTitle">Welcome back to MerchParadise !</h1>
          <div style={{ height: "10vh" }} />
          <div className="auth-form-container">
            <h2 className="header">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
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
              <ValidatingInputField
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                valid={!!pass}
                error_message="This field is mandatory"
              />
              <div className="action-buttons">
                <a className="link-btn" onClick={() => setShouldRedirect(true)}>
                  Don't have an account? Sign Up.
                </a>
                <ReduxStateConditional
                  selector={(state) => state.user.loader_state !== "loading"}
                  alternative={<JumpingRabbitLoader dataRole="submit-button" />}
                >
                  <button type="submit" data-role="submit-button">
                    Log In
                  </button>
                </ReduxStateConditional>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
};
