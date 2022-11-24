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
    <section className="cart-detail">
      <div className="cart-info">
        <img
          className="product-image"
          src={`https://cdn.merch-paradise.xyz/thumb/${info.image}`}
        ></img>
        <span>{info.product_name}</span>
        <span>RM {(info.unit_price / 100).toFixed(2)}</span>
      </div>
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
          <h1>RM {total}</h1>
        </span>
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
    <div className="main-container">
      <div className="all-orders-container">
        <Header />
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
        <h1>Subtotal=RM {(total / 100).toFixed(2)}</h1>
        <span>
          <button className="checkout">Proceed</button>
        </span>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
