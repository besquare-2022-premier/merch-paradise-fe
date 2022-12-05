import React from "react";
import "./signupLogoContainer.css";
import LogoImage from "../../../assets/logo.svg";

export default function SignupLogoContainer() {
  return (
    <>
      <nav className="signup-navbar">
        <div className="signup-logo-container">
          <img src={LogoImage} alt="logo" />
        </div>
      </nav>
    </>
  );
}
