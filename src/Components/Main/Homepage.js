import React from "react";
import "./Homepage.css";
import ProductList from "../Product/ProductList";
import Sidebar from "../Header-Footer-Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedProducts, setQuery } from "../../store/products/actions";
import { LogoScaleLoader } from "../common/Loader";
import { Link, useLocation } from "react-router-dom";
import ReduxStateConditional from "../common/ReduxStateConditional";
import { updateCart } from "../../store/cart/actions";

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
  }, [query]);
  return (
    <main className="container my-font">
      <ReduxStateConditional
        selector={(state) => !state.products.query}
        alternative={<br />}
      >
        <section className="top">
          <div className="v6 hide-mobile hide-tablet">
            <img className="v6-child" src="./img/Ellipse 22.svg"></img>
          </div>
          <Link to="/">
            <img className="v2 hide-mobile" src="./img/hello_kitty.svg"></img>
          </Link>
          <Sidebar />
          <div className="slideshow-container hide-mobile hide-tablet">
            <div className="mySlides">
              <img src="./img/banner4.png"></img>
              <img src="./gif/Peach Red Retro Monday Email Header.gif"></img>
              <img src="./img/banner4.png"></img>
              <img src="./gif/Peach Red Retro Monday Email Header.gif"></img>
            </div>
          </div>
        </section>
        <section className="top-product">
          <div>
            <img className="v3 hide-mobile" src="./img/star2.svg"></img>
            <h2>Suggested Products</h2>
            {recommended ? (
              <div className="cards">
                {recommended.ids.map((id) => {
                  const product = recommended.map[id];
                  return (
                    <div className="card-item" key={id}>
                      <Link to={`/product-detail/${id}`}>
                        <div className="card-item-img">
                          <img
                            src={`https://cdn.merch-paradise.xyz/thumb/${product.image}`}
                            alt={product.name}
                          />
                        </div>
                      </Link>
                      <div className="card-info">
                        <p>{product.name}</p>
                      </div>

                      <div className="card-footer">
                        <div className="wcf-left">
                          <h6>RM {(product.price / 100).toFixed(2)}</h6>
                        </div>
                        <div className="wcf-right">
                          <img
                            src="../img/assets/icon cart.svg"
                            onClick={() =>
                              dispatch(
                                updateCart([
                                  {
                                    product_id: product.product_id,
                                    quantity: 1,
                                  },
                                ])
                              )
                            }
                          ></img>
                        </div>
                      </div>
                    </div>
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
            <img className="v4-child" src="./img/Ellipse 9.svg"></img>
          </div>
          <div className="product-list">
            <ProductList />
          </div>
          <div className="v5 hide-mobile hide-tablet">
            <img className="v5-child" src="./img/Ellipse 18.svg"></img>
          </div>
        </div>
      </section>
      <section className="info">
        <div className="img-container hide-mobile">
          <img src="./img/info1.svg"></img>
          {/* <img className="character-img" src="./img/char.svg"></img> */}
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
        <img className="hide-mobile" src="./img/assets/Vector1.svg"></img>
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
          <img src="./img/dividing_line1.png"></img>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
