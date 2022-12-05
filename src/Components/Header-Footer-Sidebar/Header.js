import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { performLogout } from "../../store/users/actions";
import DialogContext from "../common/dialog/DialogContext";
import ReduxStateConditional from "../common/ReduxStateConditional";
import "../Header-Footer-Sidebar/Header.css";
import CartCounter from "./cart-counter";
import MpLogoImage from "./assets/mp_logo.svg";
import UserIcon from "./assets/user.svg";
import BagIcon from "./assets/bag.svg";

function Header() {
  const [open, setOpen] = React.useState(false);
  const profileIconRef = React.useRef(null);
  const [isActive, setIsActive] = React.useState(false);
  const userIconOnclick = () => {
    if (isActive) {
      profileIconRef.current?.blur();
    }
    setIsActive(!isActive);
  };
  const [searchTerm, setSearchTerm] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dialog = React.useContext(DialogContext);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <div className="container my-font">
      <div className="nav-container">
        <nav className="nav" state={open ? "opened" : ""}>
          <div className="header-logo">
            <img src={MpLogoImage} alt="logo"></img>
            <Link to="/shop">Merch Paradise</Link>
            <label className="menu-icon" onClick={() => setOpen(!open)}>
              <span className="navicon" data-role="open"></span>
              <span data-role="close"></span>
            </label>
          </div>
          <div className="search-input">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
              />
              <input type="submit" style={{ display: "none" }} />
            </form>
          </div>

          <div className="menu-li">
            <ul className="menu">
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
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Search here"
                    onChange={handleChange}
                  />
                  <input type="submit" style={{ display: "none" }} />
                </form>
              </li>
              <li>
                <ReduxStateConditional
                  selector={(state) => state.user.data === null}
                  alternative={
                    <ul className="bag-user-icon">
                      <li>
                        <Link to="/checkout" style={{ position: "relative" }}>
                          <img src={BagIcon} alt="cart"></img>
                          <CartCounter />
                        </Link>
                      </li>
                      <li
                        className="user-icon"
                        tabIndex={0}
                        ref={profileIconRef}
                      >
                        <img
                          onClick={userIconOnclick}
                          src={UserIcon}
                          alt="User avatar"
                        ></img>
                        <div className={`profile-dropdown`}>
                          <ul>
                            <li>
                              <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                              <a
                                href="#logout"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    window.confirm(
                                      "Are you sure you want to logout?"
                                    )
                                  ) {
                                    dispatch(performLogout);
                                    dialog.showToast(
                                      "You are going to be logged out soon"
                                    );
                                  }
                                }}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  }
                >
                  <li>
                    <Link to="/login">
                      <button className="button-secondary">Log in</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <button className="button-primary">Register</button>
                    </Link>
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
