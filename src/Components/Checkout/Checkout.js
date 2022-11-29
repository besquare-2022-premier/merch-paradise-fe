import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../../store/cart/actions";
import Header from "../Header-Footer-Sidebar/Header";
import "./Checkout.css";
import { LogoScaleLoader } from "../common/Loader";
import Footer from "../Header-Footer-Sidebar/Footer";

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

function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    console.log("Load");
    dispatch(getCart);
  }, []);
  React.useEffect(() => {
    console.log(cart);
    if (cart.data) {
      setTotal(cart.data.reduce((p, d) => p + d.unit_price * d.quantity, 0));
    } else {
      setTotal(0);
    }
  }, [cart]);

  return (
    <main className="container my-font">
      <div className="main-container">
        <Header />
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
        <h4>
          <strong>Subtotal : RM {(total / 100).toFixed(2)}</strong>
        </h4>
        <span>
          <button className="button-primary">Proceed</button>
        </span>
      </div>
      <Footer />
    </main>
  );
}

export default Checkout;
