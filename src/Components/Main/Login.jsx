import React, { useState } from "react";
import "./LogSignup.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performLogin } from "../../store/users/actions";
import ReduxStateConditional from "../common/ReduxStateConditional";
import { JumpingRabbitLoader } from "../common/Loader";
import { ValidatingInputField } from "../common/ValidatingInputField";
import { usePageTitle } from "../../utils/reactHooks";
import LogoImage from "../../assets/logo.svg";
import Ellipse19 from "./assets/ellipse_19.svg";
import VectorSvg from "./assets/vector.svg";
import Vector1Svg from "./assets/vector_1.svg";
import Login2Svg from "./assets/login2.svg";

export const Login = (props) => {
  usePageTitle("Login");
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
  const state = useSelector((state) => state.user);
  if (state.loader_state === "failed") {
    alert(state.error.message);
    dispatch({ type: "user/wipe" });
  }

  return (
    <ReduxStateConditional
      selector={(state) => state.user.data === null}
      alternative={<Navigate to="/shop#loggedin" />}
    >
      <div className="hide-mobile hide-tablet">
        <img className="ellipse-19" src={Ellipse19} alt=""></img>
        <img className="Vector1" src={VectorSvg} alt=""></img>
        <img className="VectorLine" src={Vector1Svg} alt=""></img>
      </div>
      <Link to="/">
        <img className="logo" src={LogoImage} alt="Logo"></img>
      </Link>

      <div className="login-container">
        <div className="login-form-wrapper">
          <img
            className="login2 hide-mobile hide-tablet"
            alt=""
            src={Login2Svg}
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
                <Link className="link-btn" to="/reset-password">
                  Forgot password?
                </Link>
                <div className="signup-login-button">
                  <Link
                    className="link-btn signup-button"
                    to="/register"
                    data-role="submit-button"
                  >
                    Sign Up
                  </Link>
                  <ReduxStateConditional
                    selector={(state) => state.user.loader_state !== "loading"}
                    alternative={
                      <JumpingRabbitLoader dataRole="submit-button" />
                    }
                  >
                    <button type="submit" data-role="submit-button">
                      Log In
                    </button>
                  </ReduxStateConditional>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
};
