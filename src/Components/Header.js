import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div class="container">
      <nav class="w-background">
        <div class="nav-left">
          <a>
            <img src="/img/MP_logo.svg"></img>
          </a>
          <Link to="/">
            <h5>Merch Paradise</h5>
          </Link>
        </div>
        <div class="menu-li">
          <ul>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>
        <div class="nav-right">
          <ul>
            <li>
              <input type="text" placeholder="Search here"></input>
            </li>
            <li>
              <button class="button-secondary">
                <Link to="/login">Log in</Link>
              </button>
            </li>
            <li>
              <button class="button-primary">
                <Link to="/register">Register</Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
