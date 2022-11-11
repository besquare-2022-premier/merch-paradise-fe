import React from "react";
import { Link } from "react-router-dom";
import "../Header-Footer-Sidebar/Header.css";

function Header() {
  return (
    <div className="container">
      <div className="nav-container">
        <nav className="nav">
          <div className="nav-left">
            <div className="header-logo">
              <div className="d-flex h-center">
                <img src="./img/MP_logo.svg"></img>
                <Link to="/shop">Merch Paradise</Link>
              </div>
            </div>
            <div className="menu-li">
              <ul className="menu">
                <li>
                  <Link to="/shop/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/shop/community">Community</Link>
                </li>
                <li>
                  <Link to="/shop/support">Support</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-right">
            <ul>
              <li>
                <input type="text" placeholder="Search here"></input>
              </li>
              <div className="d-flex">
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
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
