import React, { useState } from "react";
import "./LogSignup.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performLogin } from "../../store/users/actions";
import ReduxStateConditional from "../common/ReduxStateConditional";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div class="login-container">
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
              {/* <label htmlFor="email">email</label> */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                id="email"
                name="email"
              />
              {/* <label htmlFor="password">password</label> */}
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
              <div className="action-buttons">
                <a className="link-btn" onClick={() => setShouldRedirect(true)}>
                  Don't have an account? Sign Up.
                </a>
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
};
