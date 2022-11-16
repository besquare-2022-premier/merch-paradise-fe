import React from "react";
import { Link } from "react-router-dom";
import "../Header-Footer-Sidebar/Header.css";

function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="container">
      <div className="nav-container">
        <nav className="nav" state={open ? "opened" : ""}>
          <div className="header-logo">
            <img src="./img/MP_logo.svg"></img>
            <Link to="/shop">Merch Paradise</Link>
            <label className="menu-icon" onClick={() => setOpen(!open)}>
              <span className="navicon" data-role="open"></span>
              <span data-role="close"></span>
            </label>
          </div>

          <div className="menu-li">
            <ul ul className="menu">
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
          <div className="nav-right">
            <ul ul className="menu">
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
