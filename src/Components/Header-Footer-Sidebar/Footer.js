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
            <a href="#logo">
              <img src={MpLogoImage} alt="Logo"></img>
            </a>
          </div>
          <div className="footer-module">
            <div className="module" id="module1">
              <h6>Product</h6>
              <ul>
                <li>
                  <a href="https://www.youtube.com/watch?v=IMq3j76A53w">
                    Features
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=L34Hgxe20kg">
                    Live Share
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=zI9z-Z-VpHo">
                    Video Record
                  </a>
                </li>
              </ul>
            </div>
            <div className="module" id="module2">
              <h6>Community</h6>
              <ul>
                <li>
                  <a href="https://www.youtube.com/watch?v=cKFJUhLqqr4">
                    Featured artists
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=M7sr5zv1EkI">
                    The Portal
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=6j0hMwyTZnk">
                    Live events
                  </a>
                </li>
              </ul>
            </div>
            <div className="module" id="module3">
              <h6>Company</h6>
              <ul>
                <li>
                  <a href="https://www.youtube.com/watch?v=-UHD1UX5VLc">
                    About us
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=M0UC-AtWdks">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=6ElwbjokcvM">
                    Documentation
                  </a>
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
