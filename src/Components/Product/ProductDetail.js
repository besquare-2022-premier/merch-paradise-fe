import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader, usePageTitle } from "../../utils/reactHooks";
import { LogoScaleLoader } from "../common/Loader";
import Header from "../Header-Footer-Sidebar/Header";
import Footer from "../Header-Footer-Sidebar/Footer";
import "./Product Detail.css";
import { updateCart } from "../../store/cart/actions";

function ProductDetail() {
  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = React.useState(false);
  const onClick = () => setIsActive(!isActive);

  let { productid } = useParams();
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useContentLoader(
    async () => {
      if (`${parseInt(productid)}` !== productid) {
        throw new Error("Invalid product id");
      }
      //check if it is in the redux store
      for (const store of [products.products, products.recommended]) {
        if (store?.map[productid]) {
          //reuse it
          return store.map[productid];
        }
      }
      //or else use the one from the endpoint
      return fetchJsonWithCookie(`${ENDPOINT_BASE}/product/item/${productid}`);
    },
    [productid],
    null
  );
  React.useEffect(() => {
    if (product instanceof Error) {
      alert(product.message);
      navigate("/shop");
    }
  }, [product, navigate]);

  function addToCart() {
    let update = [{ product_id: productid | 0, quantity: counter }];
    dispatch(updateCart(update));
  }
  usePageTitle((product?.name ? `${product.name} -` : "") + " Merch paradise");

  const [counter, setCounter] = React.useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter < 2) {
    decrementCounter = () => setCounter(1);
  }
  /// NEED TO IMPLEMENT FOR COUNTER > STOCKS
  return product ? (
    <div className="container my-font">
      <div className="all-product-container">
        <Header />
        <div className="breadcrumb-container">
          <ul class="breadcrumb">
            <li>
              <a href="/shop">Homepage</a>
            </li>
            <li className="active">
              Product Detail
            </li>
          </ul>
          <span className="bg-overlay" aria-hidden="true"></span>
        </div>
        <section className="product-detail">
          <img
            src={`https://cdn.merch-paradise.xyz/thumb/${product.image}`}
          ></img>
          <div className="product-info">
            <h2>{product.name}</h2>
            <h5>{product.description}</h5>
            <h2>RM {(product.price / 100).toFixed(2)}</h2>
            <div className="qty-cart d-flex">
              <div className="counter">
                <span className="down" onClick={decrementCounter}>
                  -
                </span>
                <input type="text" value={counter}></input>
                <span className="up" onClick={incrementCounter}>
                  +
                </span>
              </div>
              <button className="button-long" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </section>
        <section className="review-container">
          <div className="review-title">{/* <h2>Reviews</h2> */}</div>
          {/* <div className="post-review">
            <div className="star-rating"></div>
            <input placeholder="Enter your review..."></input>
            <button className="button-primary">Add Review</button>
          </div> */}
          <div className="view-review">
            <div className="star-rating"></div>
            {/* <p>@username</p> */}
          </div>
        </section>
        {/* <div> Reviews</div> */}
        <div className="review-container-v2">
          <div className="review-text-box-container">
            <div
              ref={dropdownRef}
              className={`test ${isActive ? "active" : "inactive"}`}
            >
              <h2>hello</h2>
            </div>
            <div className="review-text-box">
              <div className="frame-97">
                <button onClick={onClick} className="menu-trigger">
                  <span>Star</span>{" "}
                </button>
                <div>
                  <input
                    name="message"
                    placeholder="Enter your review"
                    className="habibi-normal-black-15px"
                  />
                  <button
                    style={{
                      textAlign: "center",
                      width: "4%",
                      display: "inline-block",
                      color: "white",
                      background: "var(--primary-color)",
                      borderRadius: "unset",
                      marginLeft: "3%",
                      fontWeight: "900",
                    }}
                  >
                    +
                  </button>
                </div>
                <div></div>
              </div>
            </div>
            <div className="review-text-box">
              <div className="frame-97">
                <button onClick={onClick} className="menu-trigger2">
                  <span className="logo1">5 Stars</span>{" "}
                </button>
                <div className="user1">@userName</div>
                <div className="r1">
                  Omg! i was looking for this, but the shops racked up the
                  price, thank you MP u guys always save the day!
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="review-text-box">
              <div className="frame-97">
                <button onClick={onClick} className="menu-trigger3">
                  <span className="logo2">5 Stars</span>{" "}
                </button>

                <div className="user2">@userName</div>
                <div className="r2">
                  Omg! i was looking for this, but the shops racked up the
                  price, thank you MP u guys always save the day!
                </div>
              </div>
            </div>
            <div className="load-btn">
              <button className="load-btn-clr">Load More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LogoScaleLoader />
  );
}

export default ProductDetail;
