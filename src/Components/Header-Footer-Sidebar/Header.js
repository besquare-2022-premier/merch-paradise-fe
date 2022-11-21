import React from "react";
import { Link } from "react-router-dom";
import ReduxStateConditional from "../common/ReduxStateConditional";
import "../Header-Footer-Sidebar/Header.css";
import { useDispatch, useSelector } from "react-redux";
import JSONDATA from "./testdata.json";
import Scroll from "./Scroll";
import { setQuery } from "../../store/products/actions";
import { LogoScaleLoader } from "../common/Loader";

function Header() {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState();
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  let dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setQuery(searchTerm));
    return () => {
      dispatch(setQuery(""));
    };
  }, [searchTerm, dispatch]);
  const products = useSelector((state) => state.products.products);

  console.log(products);

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
                <input
                  type="text"
                  placeholder="Search here"
                  onChange={handleChange}
                ></input>
                <Scroll>
                  {JSONDATA.filter((val) => {
                    if (searchTerm == "") {
                      return null;
                    } else if (val.firstname.includes(searchTerm)) {
                      return val;
                    }
                  }).map((val, key) => {
                    return (
                      <div className="users" key={key}>
                        {val.firstname}
                      </div>
                    );
                  })}
                </Scroll>
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
                      <li>
                        <Link to="/profile">
                          <img src="../img/assets/user.svg"></img>
                        </Link>
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
