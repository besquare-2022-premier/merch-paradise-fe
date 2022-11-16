import React from "react";
import "./Community.css";

function Community() {
  return (
    <div className="main-container">
      <p className="flow-bar">
        <button className="homepage">Homepage</button>
        <button className="product">Product</button>
        <button className="order-list">Order List</button>
      </p>
      <h1 className="title-page"> Order List</h1>
      <div className="product-cart">
        <div className="product-list">
          <div className="first">
            <input type="checkbox" className="checkbox"></input>
            <img src="/img/product/image 5.svg" className="cat"></img>
            <div className="product-details">
              <p className="product-name">Kitty T-Shirt</p>
              <p>$1000.00</p>
              <p>50 items left</p>
            </div>
          </div>
          <div className="first">
            <button className="subtract">-</button>
            <div className="number-rectangle">2</div>
            <button className="add">+</button>
            <button className="delete">X</button>
          </div>
          <div className="first">
            <p className="price"> $50.00</p>
          </div>
        </div>
        <div className="product-list">
          <div className="first">
            <input type="checkbox" className="checkbox"></input>
            <img src="/img/product/image 5.svg" className="cat"></img>
            <div className="product-details">
              <p className="product-name">Kitty T-Shirt</p>
              <p>$1000.00</p>
              <p>50 items left</p>
            </div>
          </div>
          <div className="first">
            <button className="subtract">-</button>
            <div className="number-rectangle">2</div>
            <button className="add">+</button>
            <button className="delete">X</button>
          </div>
          <div className="first">
            <p className="price"> $50.00</p>
          </div>
        </div>
        <div className="product-list">
          <div className="first">
            <input type="checkbox" className="checkbox"></input>
            <img src="/img/product/image 5.svg" className="cat"></img>
            <div className="product-details">
              <p className="product-name">Kitty T-Shirt</p>
              <p>$1000.00</p>
              <p>50 items left</p>
            </div>
          </div>
          <div className="first">
            <button className="subtract">-</button>
            <div className="number-rectangle">2</div>
            <button className="add">+</button>
            <button className="delete">X</button>
          </div>
          <div className="first">
            <p className="price"> $50.00</p>
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="checkout">
        <div className="second">
          <input type="checkbox"></input>
          <p>All</p>
        </div>
        <p>Subtotal</p>
        <h1>$100.00</h1>
      </div>
    </div>
  );
}

export default Community;
