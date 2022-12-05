import React from "react";
import "./signupLogoContainer.css";
import LogoImage from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function SignupLogoContainer() {
  return (
    <>
      <nav className="signup-navbar">
        <div className="signup-logo-container">
          <Link to="/">
            <img src={LogoImage} alt="logo" />
          </Link>
        </div>
      </nav>
    </>
  );
}
