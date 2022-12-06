import React from "react";
import "./Homepage.css";
import ProductList from "../Product/ProductList";
import Sidebar from "../Header-Footer-Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedProducts, setQuery } from "../../store/products/actions";
import { LogoScaleLoader } from "../common/Loader";
import { Link, useLocation } from "react-router-dom";
import ReduxStateConditional from "../common/ReduxStateConditional";
import Star2Svg from "../../assets/star2.svg";
import EmailHeaderGif from "./assets/peach_red_retro_monday_email_header.gif";
import BiggerHeaderGif from "./assets/Bigger_Header.gif";
import Ellipse9 from "./assets/ellipse_9.svg";
import Ellipse18 from "./assets/ellipse_18.svg";
import Ellipse22 from "./assets/ellipse_22.svg";
import Banner4Image from "./assets/banner4.png";
import ProductTile from "../Product/ProductTile";
import HelloKitty from "./assets/hello_kitty.svg";
import DivingLine1 from "./assets/dividing_line1.png";

function Homepage() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(search).get("q"),
    [search]
  );
  const recommended = useSelector((state) => state.products.recommended);
  React.useEffect(() => {
    dispatch(setQuery(query));
    if (!query) dispatch(getRecommendedProducts(4));
  }, [query, dispatch]);
  return (
    <main className="container my-font">
      <ReduxStateConditional
        selector={(state) => !state.products.query}
        alternative={<br />}
      >
        <section className="top">
          <div className="v6 hide-mobile hide-tablet">
            <img className="v6-child" src={Ellipse22} alt=""></img>
          </div>
          <Link to="/">
            <img className="v2 hide-mobile" src={HelloKitty} alt=""></img>
          </Link>
          <Sidebar />
          <div className="slideshow-container hide-mobile hide-tablet">
            <div className="mySlides">
              <img src={EmailHeaderGif} alt=""></img>
              <img src={BiggerHeaderGif} alt=""></img>
              <img src={Banner4Image} alt=""></img>
              <img src={EmailHeaderGif} alt=""></img>
            </div>
          </div>
        </section>
        <section className="top-product">
          <div>
            <img className="v3 hide-mobile" src={Star2Svg} alt=""></img>
            <h2>Suggested Products</h2>
            {recommended ? (
              <div className="cards">
                {recommended.ids.map((id) => {
                  const product = recommended.map[id];
                  return (
                    <ProductTile
                      key={id}
                      content={product}
                      className="card-item"
                    />
                  );
                })}
              </div>
            ) : (
              <LogoScaleLoader />
            )}
          </div>
        </section>
      </ReduxStateConditional>
      <section className="all-product">
        <div className="container">
          <div className="v4 hide-mobile hide-tablet">
            <img className="v4-child" src={Ellipse9} alt=""></img>
          </div>
          <div className="product-list">
            <ProductList />
          </div>
          <div className="v5 hide-mobile hide-tablet">
            <img className="v5-child" src={Ellipse18} alt=""></img>
          </div>
        </div>
      </section>
      <section className="info">
        <div className="img-container hide-mobile">
          <img src="./img/info1.svg" alt=""></img>
        </div>

        <div className="about-us">
          <h1>About Us</h1>
          <h5>
            We love anime or game merchandise as much as the other person. We
            wanted to create a platform that creates less hassle for users,
            rather then searching through some dodgy websites. This website is
            the brain child of the group Premier.
          </h5>
        </div>
        <img
          className="hide-mobile"
          src="./img/assets/Vector1.svg"
          alt=""
        ></img>
      </section>
      <section>
        <div className="join-us">
          <div className="join-us-info">
            <h4>Join us today and get latest update for your merchandise!</h4>
          </div>
          <div className="join-us-btn">
            <ul>
              <li>
                <Link to="/register">
                  <button className="button-primary">Join Today</button>
                </Link>
              </li>
              <li>
                <Link to="/shop/support">
                  <button className="button-secondary">Contact Us</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="join-us-container">
          <img src={DivingLine1} alt=""></img>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
