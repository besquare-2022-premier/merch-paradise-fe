import React from "react";
import { Link } from "react-router-dom";
import ReduxStateConditional from "../common/ReduxStateConditional";
import "../Header-Footer-Sidebar/Header.css";

function Header() {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = React.useState(false);
  const onClick = () => setIsActive(!isActive);
  return (
    <div className="container">
      <div className="nav-container">
        <nav className="nav" state={open ? "opened" : ""}>
          <div className="header-logo">
            <img src="../img/MP_logo.svg" alt="logo"></img>
            <Link to="/shop">Merch Paradise</Link>
            <label className="menu-icon" onClick={() => setOpen(!open)}>
              <span className="navicon" data-role="open"></span>
              <span data-role="close"></span>
            </label>
          </div>

          <div className="menu-li">
            <ul ul className="menu">
              <li>
                <Link to="/shop/community">Community</Link>
              </li>
              <li>
                <Link to="/shop/support">Support</Link>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <ul className="menu">
              <li>
                <input type="text" placeholder="Search here"></input>
              </li>
              <li>
                <ReduxStateConditional
                  selector={(state) => state.user.data === null}
                  alternative={
                    <ul className="bag-user-icon">
                      <li>
                        <Link to="/checkout">
                          <img src="../img/assets/bag.svg"></img>
                        </Link>
                      </li>
                      <li className="user-icon">
                        <img
                          src="../img/assets/user.svg"
                          onClick={onClick}
                        ></img>

                        <div
                          ref={dropdownRef}
                          className={`profile-dropdown ${
                            isActive ? "active" : "inactive"
                          }`}
                        >
                          <ul>
                            <li>
                              <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                              <Link to="/login">Logout</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  }
                >
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
                </ReduxStateConditional>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
