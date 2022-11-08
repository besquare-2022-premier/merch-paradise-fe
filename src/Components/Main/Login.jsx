import React, { useState } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div>
      <div>
        <img className="logo" src="./img/LOGO.svg"></img>
        <img className="ellipse-19" src="./img/Ellipse 19.svg"></img>
        <img className="Vector1" src="./img/Vector.svg"></img>
      </div>
      <h1 className="title gupter-bold-black-45px">
        Welcome back to MerchParadise !
      </h1>

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
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Sign Up.
        </button>
      </div>
    </div>
  );
};
