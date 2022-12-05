import React from "react";
import "./Navbar.css";
import LogoImage from "../../../assets/logo.svg";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={LogoImage} alt="logo" />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
