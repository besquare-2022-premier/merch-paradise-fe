import React, { useState } from "react";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div>
      <img className="logo2" src="./img/LOGO.svg" />
      <img className="Vector2" src="./img/heart.svg"></img>
      <img className="Vector3" src="./img/star.svg"></img>

      <h1 className="title2">
        Welcome !<br /> to MerchParadise
      </h1>
      <div className="auth-form-container">
        <h2>Personal Details</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <input
              value={name}
              name="name"
              style={{ width: "45%", marginRight: "7%", marginLeft: 0 }}
              id="name"
              placeholder="Full Name"
            />
            <input
              value={name}
              name="name"
              id="name"
              style={{ width: "45%" }}
              placeholder="Last Name"
            />{" "}
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            id="email"
            name="email"
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="Phone number"
            placeholder="Phone number"
            id="Phone number"
            name="Phone number"
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="Create password"
            placeholder="Create password"
            id="Create password"
            name="Create password"
          />
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here.
          </button>
          <button type="submit">Register</button>
        </form>
      </div>
      <img className="Vector4" src="./img/flower.svg"></img>
      <img className="heart2" src="./img/heart2.svg"></img>
    </div>
  );
};
