import React from "react";
import { Link } from "react-router-dom";
import "../Header-Footer-Sidebar/Header.css";

function Header() {
  return (
    <div className="container">
      <div className="nav-container w-background">
        <nav className="nav">
          <div className="nav-left">
            <div className="header-logo">
              <div className="d-flex h-center">
                <img src="./img/MP_logo.svg"></img>
                <Link to="/shop">
                  <a>Merch Paradise</a>
                </Link>
              </div>
            </div>
            <div className="menu-li">
              <ul className="menu">
                <li>
                  <a>
                    <Link to="/shop/categories">Categories</Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="/shop/community">Community</Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="/shop/support">Support</Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-right">
            <ul>
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
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
