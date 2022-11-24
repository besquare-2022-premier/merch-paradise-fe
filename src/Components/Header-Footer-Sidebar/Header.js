import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { performLogout } from "../../store/users/actions";
import ReduxStateConditional from "../common/ReduxStateConditional";
import "../Header-Footer-Sidebar/Header.css";

function Header() {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  //we need to do it manually as it breaks android
  const updateQuery = React.useCallback(
    (e) => {
      if (e.code === "Enter") {
        //submit the stuffs
        if (searchTerm) {
          navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
        }
      }
    },
    [searchTerm]
  );
  const search_box = React.useRef(null);
  React.useEffect(() => {
    const { current } = search_box;
    if (current) {
      current.addEventListener("keyup", updateQuery);
    }
    return () => current.removeEventListener("keyup", updateQuery);
  }, [search_box.current, updateQuery]);
  return (
    <div className="container my-font">
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
                <input
                  type="text"
                  placeholder="Search here"
                  onChange={handleChange}
                  ref={search_box}
                ></input>
              </li>
              <li>
                <ReduxStateConditional
                  selector={(state) => state.user.data === null}
                  alternative={
                    <ul className="bag-user-icon">
                      <li>
                        <Link to="/checkout">
                          <img src="../img/assets/bag.svg" alt="cart"></img>
                        </Link>
                      </li>
                      <li className="user-icon" tabIndex={0}>
                        <img src="../img/assets/user.svg"></img>

                        <div className={`profile-dropdown `}>
                          <ul>
                            <li>
                              <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                              <a
                                to="javascript:;void(0)"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to logout?"
                                    )
                                  ) {
                                    dispatch(performLogout);
                                    alert(
                                      "You are going to be logged out soon?"
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
