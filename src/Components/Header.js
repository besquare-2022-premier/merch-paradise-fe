import React from "react";

function Header() {
  return (
    <div class="container">
      <nav>
        <div class="nav-left">
          <a>
            <img src="./img/MP_logo.svg"></img>
          </a>
          <h5>Merch Paradise</h5>
        </div>
        <div class="menu-li">
          <ul>
            <li>Categories</li>
            <li>Community</li>
            <li>Support</li>
          </ul>
        </div>
        <div class="nav-right">
          <ul>
            <li>
              <input type="text" placeholder="Search here"></input>
            </li>
            <li>
              <button class="button-secondary">Log in</button>
            </li>
            <li>
              <button class="button-primary">Register</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
