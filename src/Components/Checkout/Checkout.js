import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart/actions";
import { LOCAL_CART } from "../../store/native/common_keys";
import Header from "../Header-Footer-Sidebar/Header";
import "./Checkout.css";
import { LogoScaleLoader } from "../common/Loader";

function ItemTile({ info }) {
  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState([info.quantity]);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);

  let total = ((info.unit_price * info.quantity) / 100).toFixed(2);

  console.log(counter);
  return (
    <section className="cart-detail">
      <input type="checkbox" className="checkbox"></input>
      <div className="cart-info">
        <img
          className="product-image"
          src={`https://cdn.merch-paradise.xyz/thumb/${info.image}`}
        ></img>
        <span>{info.product_name}</span>
        <span>RM {(info.unit_price / 100).toFixed(2)}</span>
      </div>
      <div className="qty-counter">
        <span className="down" onClick={decrementCounter}>-</span>
        <input type="text" value={counter}></input>
        <span className="up" onClick={incrementCounter}>
          +
        </span>
      </div>
      <div className="remove-item">
        <span>
          <button>X</button>
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
        <p className="flow-bar">
          <button className="homepage">Homepage</button>
          <button className="product">Product</button>
          <button className="order-list">Order List</button>
        </p>
        {cart.data !== null ? (
          <>
            {cart.data.map((z) => (
              <ItemTile key={z.product_name} info={z} />
            ))}
          </>
        ) : (
          <LogoScaleLoader />
        )}
      </div>
      <hr></hr>
      <h1>Subtotal=RM {(total / 100).toFixed(2)}</h1>
    </div>
  );
}

export default Checkout;
