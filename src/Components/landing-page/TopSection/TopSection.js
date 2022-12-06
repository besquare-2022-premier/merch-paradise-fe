import React from "react";
import "./TopSection.css";
import { Link } from "react-router-dom";
import LandingPageImage from "./assets/LandingPage.svg";

function TopSection() {
  return (
    <div className="top-container">
      <div className="left-container">
        <p className="you-want"> You Want </p>
        <p className="authentic">AUTHENTIC?</p>

        <p className="sub-heading">
          <span className="sub-heading1">
            Shop at <span className="merchparadise"> Merchparadise</span>
          </span>

          <span className="sub-heading1"> today! And join our </span>
          <span className="sub-heading1"> community</span>
        </p>

        <div className="landing-page-btn">
          <button className="sign-up-btn">
            <Link to="/register">Sign up</Link>
          </button>
          <br />
          <button className="shopnow">
            <Link to="/shop">Shop Now</Link>
          </button>
        </div>
      </div>
      <div className="right-container">
        <img className="img-landing-page" src={LandingPageImage} alt="logo" />
      </div>
    </div>
  );
}

export default TopSection;
