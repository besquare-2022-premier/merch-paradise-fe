import React from "react";
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
  return (
    <div className="container">
      <div className="all-product-container">
        <section className="product-detail">
          <img src="./img/product/image 7.svg"></img>
          <div className="product-info">
            <h2>Bottle Water</h2>
            <h4>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur.
            </h4>
            <p>100 stocks left!</p>
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
      </div>
    </div>
  );
}

export default ProductDetail;
