import React from "react";
import { SocialIcon } from "react-social-icons";
import MpLogoImage from "./assets/mp_logo.svg";
import "../Header-Footer-Sidebar/Footer.css";

function Footer() {
  return (
    <div className="container my-font">
      <div>
        <section className="resources">
          <div className="footer-logo">
            <a>
              <img src={MpLogoImage}></img>
            </a>
          </div>
          <div className="footer-module">
            <div className="module" id="module1">
              <h6>Product</h6>
              <ul>
                <li>
                  <a href="">Features</a>
                </li>
                <li>
                  <a href="">Live Share</a>
                </li>
                <li>
                  <a href="">Video Record</a>
                </li>
              </ul>
            </div>
            <div className="module" id="module2">
              <h6>Community</h6>
              <ul>
                <li>
                  <a href="">Featured artists</a>
                </li>
                <li>
                  <a href="">The Portal</a>
                </li>
                <li>
                  <a href="">Live events</a>
                </li>
              </ul>
            </div>
            <div className="module" id="module3">
              <h6>Company</h6>
              <ul>
                <li>
                  <a href="">About us</a>
                </li>
                <li>
                  <a href="">Contact us</a>
                </li>
                <li>
                  <a href="">Documentation</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <hr></hr>
        <section className="social">
          <p>&copy; Merch Paradise by Premier. All rights reserved!</p>
          <div className="social-footer-icons">
            <ul>
              <li>
                <SocialIcon url="https://www.instagram.com/?hl=en" />
              </li>
              <li>
                <SocialIcon url="https://twitter.com" />
              </li>
              <li>
                <SocialIcon url="https://www.youtube.com/" />
              </li>
              <li>
                <SocialIcon url="https://www.facebook.com/" />
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer;
