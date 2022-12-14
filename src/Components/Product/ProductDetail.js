import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalData } from "../../store/native";
import { ACCESS_TOKEN } from "../../store/native/common_keys";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { obtainCSRF } from "../../store/__base/csrf";
import { generateAuthenticationWithCSRFHeader } from "../../store/__base/headerUtils";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader, usePageTitle } from "../../utils/reactHooks";
import { LogoScaleLoader } from "../common/Loader";
import Header from "../Header-Footer-Sidebar/Header";
import Footer from "../Header-Footer-Sidebar/Footer";
import "./Product Detail.css";
import { updateCart } from "../../store/cart/actions";
import DialogContext from "../common/dialog/DialogContext";

async function submitMessage(message, productid, product_rating) {
  let access_token = getLocalData(ACCESS_TOKEN);
  if (!access_token) {
    alert("Cannot post, unauthorized");
    return;
  }
  let csrf = await obtainCSRF();
  if (!csrf) {
    throw new Error("Cannot get token");
  }
  //construct a request to post it
  let json = await fetchJsonWithCookie(
    `${ENDPOINT_BASE}/product-review/add-review`,
    {
      headers: {
        ...generateAuthenticationWithCSRFHeader(access_token, csrf),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        product_review: message,
        productid: productid | 0,
        product_rating: product_rating | 0,
      }),
    },
    true
  );
  if (json?.status !== 0) {
    throw new Error(json.message ?? "Something went wrong!");
  } else {
    alert("Posted");
    return true;
  }
}

function ProductDetail() {
  const context = React.useContext(DialogContext);
  const user = useSelector((state) => state.user);
  const submit_handle = React.useRef();
  // const [isActive, setIsActive] = React.useState(false);
  const [value, setValue] = React.useState(1);

  let { productid } = useParams();
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const redux_dispatch = useDispatch();
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

  const [state, dispatch] = React.useReducer(
    (state, action) => {
      if (action?.refresh) {
        return {
          ...state,
          ...(action.data ?? {}),
          nonce: state.nonce + 1,
        };
      }
      //submit handler
      if (action?.submit && state.message && !submit_handle.current) {
        //side effect
        submit_handle.current = 1;
        submitMessage(state.message, product.product_id, value)
          .then((z) => {
            if (!z) return;
            dispatch({
              refresh: 1,
              data: { submission: null, message: "" },
            });
          })
          .catch(window.alert.bind(window))
          .finally(() => (submit_handle.current = 0));
        return { ...state, submission: 1 };
      }
      let state_dup = { ...state };
      state_dup[action.key] = action.value;
      return state_dup;
    },
    { nonce: 0, limit: 10 }
  );

  const reviews = useContentLoader(
    () => {
      return fetchJsonWithCookie(
        `${ENDPOINT_BASE}/product-review/${productid}?nonce=${state.nonce}`
      );
    },
    [state.nonce, productid],
    null
  );

  function updateForm(e) {
    const element = e.nativeEvent.target;
    dispatch({ key: element.name, value: element.value });
  }

  function addToCart() {
    if (!user.data) {
      context.showToast("Please login or sign up to continue");
      return;
    }
    let update = [{ product_id: productid | 0, quantity: counter }];
    redux_dispatch(updateCart(update));
  }

  usePageTitle(product?.name);

  const [counter, setCounter] = React.useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter < 2) {
    decrementCounter = () => setCounter(1);
  }

  /// NEED TO IMPLEMENT FOR COUNTER > STOCKS
  return product ? (
    <main className="container my-font">
      <div className="category-container">
        <Header />
        <div className="product-detail-container">
          <section className="product-detail">
            <img
              src={`https://cdn.merch-paradise.xyz/thumb/${product.image}`}
              alt={product.name}
            ></img>
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="description">{product.description}</p>
              <p>
                <strong>RM {(product.price / 100).toFixed(2)}</strong>
              </p>
              <div className="qty-cart">
                <div className="counter">
                  <span className="down" onClick={decrementCounter}>
                    -
                  </span>
                  <input type="text" value={counter} readOnly={true}></input>
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
            <h4 className="review-header">Reviews</h4>
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
            {/* <div> Reviews</div> */}
            <div className="review-container-v2">
              <div className="review-text-box-container">
                <div className="review-text-box">
                  <div className="frame-97">
                    <div className="review-select">
                      <select
                        className="merch-paradise-theme"
                        name="rating"
                        id="rating"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                      >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                    </div>

                    <div className="d-flex">
                      <form
                        style={{
                          width: "100%",
                          display: "flex",
                          paddingTop: "20px",
                        }}
                        onSubmit={(e) => {
                          e.preventDefault();
                          dispatch({ submit: "main" });
                        }}
                      >
                        <input
                          name="message"
                          placeholder="Enter your review"
                          value={state.message ?? ""}
                          onChange={updateForm}
                          autoComplete="off"
                        />
                        <button
                          style={{
                            textAlign: "center",
                            // width: "4%",
                            display: "inline-block",
                            color: "white",
                            background: "var(--primary-color)",
                            // borderRadius: "unset",
                            marginLeft: "3%",
                            fontWeight: "900",
                            border: "0",
                            fontSize: "20px",
                          }}
                          disabled={
                            !state.message && (state.submitting || !user.data)
                          }
                        >
                          +
                        </button>
                      </form>
                    </div>
                    <div></div>
                  </div>
                </div>
                {reviews && (
                  <>
                    {reviews.map((z, i) => (
                      <div className="review-text-box" key={i}>
                        <div className="frame-97">
                          <div className="user1">
                            <span>
                              <strong>@{z.username}</strong>
                            </span>
                            <span>{new Date(z.time).toLocaleDateString()}</span>
                          </div>
                          <div className="menu-trigger2">
                            <span className="logo1">{z.rating} Star</span>{" "}
                          </div>

                          <div className="r1">
                            <p>{z.review}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  ) : (
    <LogoScaleLoader />
  );
}

export default ProductDetail;
