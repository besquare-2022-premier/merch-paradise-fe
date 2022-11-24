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
          <img className="v2 hide-mobile" src="./img/hello_kitty.svg"></img>
          <Sidebar />
          <div className="slideshow-container hide-mobile hide-tablet">
            <div className="mySlides">
              <img src="./img/banner1.svg"></img>
              <img src="./img/banner2.jpg"></img>
              <img src="./img/banner3.jpg"></img>
              <img src="./img/banner2.jpg"></img>
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

                      <div class="card-footer">
                        <div class="wcf-left">
                          <h6>RM {(product.price / 100).toFixed(2)}</h6>
                        </div>
                        <div class="wcf-right">
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
        </div>

        <div className="about-us">
          <h2>About Us</h2>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </p>
        </div>
        <img className="hide-mobile" src="./img/assets/Vector1.svg"></img>
      </section>
      <section>
        <div className="join-us-container hide-mobile">
          <img src="./img/Watery-border.svg"></img>
        </div>
        <div className="join-us">
          <div className="join-us-info">
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </h4>
          </div>
          <div className="join-us-btn">
            <ul>
              <li>
                <Link to="/register">
                  <button className="button-primary">Join Today</button>
                </Link>
              </li>
              <li>
                <button className="button-secondary">Contact Us</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
