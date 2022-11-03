import React from "react";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <div id="footer">
      <div>
        <section id="resources">
          <div id="module">
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
          <div id="module">
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
          <div id="module">
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
        </section>
        <footer>
          <p>&copy; Merch Paradise by Premier. All rights reserved!</p>
          <div id="social-footer-icons">
            <h4>Follow us:</h4>
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
        </footer>
      </div>
    </div>
  );
}

export default Footer;
