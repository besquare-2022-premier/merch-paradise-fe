import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../../store/cart/actions";
import Header from "../Header-Footer-Sidebar/Header";
import "./Checkout.css";
import { LogoScaleLoader } from "../common/Loader";
import Footer from "../Header-Footer-Sidebar/Footer";
import { Link, useNavigate } from "react-router-dom";
import { getLocalData } from "../../store/native";
import { ACCESS_TOKEN } from "../../store/native/common_keys";
import { obtainCSRF } from "../../store/__base/csrf";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { ENDPOINT_BASE } from "../../store/__base/config";

function ItemTile({ info }) {
  const dispatch = useDispatch();
  function updateItem(delta) {
    dispatch(
      updateCart([
        { product_id: info.product_id, quantity: info.quantity + delta },
      ])
    );
  }
  const incrementCounter = updateItem.bind(null, 1);
  let decrementCounter = updateItem.bind(null, -1);

  let total = ((info.unit_price * info.quantity) / 100).toFixed(2);

  return (
    <section className="container cart-detail my-font">
      <div className="cart-info">
        <div>
          <img
            className="product-image"
            src={`https://cdn.merch-paradise.xyz/thumb/${info.image}`}
          ></img>
        </div>
        <div className="product-info">
          <p>{info.product_name}</p>
          <p>
            <strong>RM {(info.unit_price / 100).toFixed(2)}</strong>
          </p>
        </div>
      </div>
      <div className="product-input">
        <div className="qty-counter">
          <span className="down" onClick={decrementCounter}>
            -
          </span>
          <input type="text" value={info.quantity}></input>
          <span className="up" onClick={incrementCounter}>
            +
          </span>
        </div>
        <div className="remove-item">
          <span>
            <button
              className="button-secondary"
              onClick={() =>
                dispatch(
                  updateCart([{ product_id: info.product_id, quantity: 0 }])
                )
              }
            >
              Remove
            </button>
          </span>
        </div>
        <div className="final-price">
          <span>
            <h6>
              <strong>RM {total}</strong>
            </h6>
          </span>
        </div>
      </div>
    </section>
  );
}

async function startCheckout(address, residence) {
  let csrf = await obtainCSRF();
  let token = getLocalData(ACCESS_TOKEN);
  let res = await fetchJsonWithCookie(`${ENDPOINT_BASE}/orders/cart/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
      "X-CSRF-Token": csrf,
    },
    body: JSON.stringify({ address, residence }),
  });
  return res.url;
}

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = React.useState(0);
  const [checkoutPromise, setCheckoutPromise] = React.useState(null);
  React.useEffect(() => {
    console.log("Load");
    dispatch(getCart);
  }, [dispatch]);
  React.useEffect(() => {
    console.log(cart);
    if (cart.data) {
      setTotal(cart.data.reduce((p, d) => p + d.unit_price * d.quantity, 0));
    } else {
      setTotal(0);
    }
  }, [cart]);
  React.useEffect(() => {
    const reveal =
      ["loading", "unintialized", "failed"].includes(user.loader_state) ||
      getLocalData(ACCESS_TOKEN) ||
      !!user.data;
    if (!reveal) {
      navigate("/login");
    }
  }, [user, navigate]);
  React.useEffect(() => {
    checkoutPromise?.then(
      (data) => {
        document.location.assign(data);
      },
      (e) => {
        alert("Cannot submit the cart");
        setCheckoutPromise(null);
      }
    );
  }, [navigate, checkoutPromise]);
  function performSubmission() {
    //try to checkout
    const { address, residence } = user.data;
    if (!address || !residence) {
      alert("Please fill in your address information before checking out");
      navigate("/profile/address");
    } else {
      setCheckoutPromise(startCheckout(address, residence));
    }
  }
  return (
    <main className="container my-font">
      <div className="category-container">
        <Header />
        <ul class="breadcrumb">
          <li>
            <Link to="/shop">Homepage</Link>
          </li>
          <li>
            <Link to="/shop">Categories</Link>
          </li>
          <li>
            <Link to="/shop">Product Detail</Link>
          </li>
          <li>My Orders</li>
        </ul>
        <h1>My Orders</h1>
        {cart.data !== null ? (
          <>
            {cart.data
              .sort((a, b) => a.product_id - b.product_id)
              .map((z) => (
                <ItemTile key={z.product_id} info={z} />
              ))}
          </>
        ) : (
          <LogoScaleLoader />
        )}
      </div>
      <hr></hr>
      <div className="subtotal">
        <h4>Subtotal : RM {(total / 100).toFixed(2)}</h4>
        <span>
          <button
            className="button-primary"
            disabled={!!checkoutPromise || !cart.data?.length}
            onClick={performSubmission}
          >
            Proceed
          </button>
        </span>
      </div>
      <Footer />
    </main>
  );
}

export default Checkout;
