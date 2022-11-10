import React, { useState } from "react";
import "./LogSignup.css";
import { Navigate } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  if (shouldRedirect) {
    return <Navigate to="/register" />;
  }

  return (
    <div class="login-container">
      <div>
        <img className="login2" src="/img/login2.svg"></img>
        <img className="logo" src="/img/LOGO.svg"></img>
        <img className="ellipse-19" src="/img/Ellipse 19.svg"></img>
        <img className="Vector1" src="/img/Vector.svg"></img>
        <img className="VectorLine" src="/img/Vector 1 (2).svg"></img>
      </div>
      <h1 className="LoginTitle">Welcome back to MerchParadise !</h1>

      <div className="auth-form-container">
        <h2>Login</h2>
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
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => setShouldRedirect(true)}>
          Don't have an account? Sign Up.
        </button>
      </div>
    </div>
  );
};
