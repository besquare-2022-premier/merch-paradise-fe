import React from "react";
import { Link } from "react-router-dom";
import "../Header-Footer-Sidebar/Header.css";

function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="container">
      <div className="nav-container">
        <nav className="nav">
          <div className="d-flex h-center">
            <img src="./img/MP_logo.svg"></img>
            <Link to="/shop">Merch Paradise</Link>
          </div>

          <input class="menu-btn" type="checkbox" id="menu-btn" />
          <label class="menu-icon" for="menu-btn">
            <span class="navicon"></span>
          </label>
          <ul className="menu">
            <div className="menu-li">
              <li>
                <Link to="/shop/categories">Categories</Link>
              </li>
              <li>
                <Link to="/shop/community">Community</Link>
              </li>
              <li>
                <Link to="/shop/support">Support</Link>
              </li>

              <div className="nav-right d-flex">
                <li>
                  <input type="text" placeholder="Search here"></input>
                </li>
                <li>
                  <button className="button-secondary">
                    <Link to="/login">Log in</Link>
                  </button>
                </li>
                <li>
                  <button className="button-primary">
                    <Link to="/register">Register</Link>
                  </button>
                </li>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
