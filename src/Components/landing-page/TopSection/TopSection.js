import React from 'react'
import  "./TopSection.css"
import { Link } from "react-router-dom";
// import {Button} from './Button'

function TopSection() {
  return (
    <div className="top-container">
      <div className="left-container">
        <h1 className="you-want"> You Want </h1>
        <h1 className="titletwo">AUTHENTIC?</h1>

        <h1 className="sub-heading">
          <span className="sub-heading1">
            Shop at <span className="merchparadise"> Merchparadise</span>
          </span>

          <span className="sub-heading1"> today! and Join our </span>
          <span className="sub-heading1"> community</span>
        </h1>

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
        <img
          className="img-landing-page"
          src="./img/LandingPage.svg"
          alt="logo"
        />
      </div>
    </div>
  );
}

export default TopSection