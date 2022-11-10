import React from "react";
import { SocialIcon } from "react-social-icons";
import "../Header-Footer-Sidebar/Footer.css";

function Footer() {
  return (
    <div class="container">
      <div>
        <section class="resources">
          <div class="nav-left">
            <a>
              <img src="/img/MP_logo.svg"></img>
            </a>
            <h5>Merch Paradise</h5>
          </div>
          <div class="d-flex">
            <div class="module" id="module1">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="">Features</a>
                </li>
                <li>
                  <a href="">Live Share</a>
                </li>
                <li>
                  <a href="">Cideo Record</a>
                </li>
              </ul>
            </div>
            <div class="module" id="module2">
              <h4>Community</h4>
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
            <div class="module" id="module3">
              <h4>Company</h4>
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
        <section class="social">
          <p>&copy; Merch Paradise by Premier. All rights reserved!</p>
          <div class="social-footer-icons">
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
