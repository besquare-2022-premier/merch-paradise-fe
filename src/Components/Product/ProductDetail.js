import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader, usePageTitle } from "../../utils/reactHooks";
import { LogoScaleLoader } from "../common/Loader";
import Header from "../Header-Footer-Sidebar/Header";
import Footer from "../Header-Footer-Sidebar/Footer";
import "./Product Detail.css";

function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

function ProductDetail() {
  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = React.useState(false);
  const onClick = () => setIsActive(!isActive);

  let { productid } = useParams();
  const products = useSelector((state) => state.products);
  console.log(products);
  const navigate = useNavigate();
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
  usePageTitle((product?.name ? `${product.name} -` : "") + " Merch paradise");
  return product ? (
    <div className="container">
      <div className="all-product-container">
        <Header />
        <section className="product-detail">
          <img
            src={`https://cdn.merch-paradise.xyz/thumb/${product.image}`}
          ></img>
          <div className="product-info">
            <h2>{product.name}</h2>
            <h4>{product.description}</h4>
            <p>Stock : {product.stock}</p>
            <div className="qty-cart d-flex">
              <div className="counter">
                <span className="down" onClick={decreaseCount}>
                  -
                </span>
                <input type="text" value={1}></input>
                <span className="up" onClick={increaseCount}>
                  +
                </span>
              </div>
              <button className="button-long">Add to Cart</button>
            </div>
          </div>
        </section>
        <section className="review-container">
          <div className="review-title">
            <h2>Reviews</h2>
          </div>
          <div className="post-review">
            <div className="star-rating"></div>
            <input placeholder="Enter your review..."></input>
            <button className="button-primary">Add Review</button>
          </div>
          <div className="view-review">
            <div className="star-rating"></div>
            <p>@username</p>
            <p>
              Omg! i was looking for this, but the shops racked up the price,
              thank you MP u guys always save the day!
            </p>
          </div>
        </section>
        <div> Reviews</div>
        <div className="review-container-v2">
          <div className="review-text-box-container">
            <button onClick={onClick} className="menu-trigger">
              <span>User</span>{" "}
            </button>

            <div
              ref={dropdownRef}
              className={`test ${isActive ? "active" : "inactive"}`}
            >
              <h2>hello</h2>
            </div>
            <div className="review-text-box">
              <div className="frame-97">
                <input
                  name="message"
                  placeholder="Enter your review"
                  className="habibi-normal-black-15px"
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  ) : (
    <LogoScaleLoader />
  );
}

export default ProductDetail;
