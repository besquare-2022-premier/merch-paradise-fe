import React from "react";
import Header from "../Header-Footer-Sidebar/Header";
import "./Checkout.css";

function Checkout() {
  
  return (
    <div className="main-container">
      <div className="all-orders-container">
        <Header />
        <p className="flow-bar">
          <button className="homepage">Homepage</button>
          <button className="product">Product</button>
          <button className="order-list">Order List</button>
        </p>
        <section className="orders-detail">
          <div className="order-container">
            <input type="checkbox" className="checkbox"></input>
            <img src={`https://cdn.merch-paradise.xyz/thumb/`}></img>
          </div>
          <div className="orders-info">
            <h2>-- Product Name --</h2>
            <h2>-- Price --</h2>
            <h2>-- Stock --</h2>
          </div>
          <div className="qty-counter">
            <span className="down" onClick="">
              -
            </span>
            <input type="text" value={1}></input>
            <span className="up" onClick="">
              +
            </span>
          </div>
          <div className="final-price">
            <h2>-- Final Price --</h2>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
