import React from "react";
import "./Product.css";

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
    <div class="container">
      <div class="all-product-container">
        <section class="product-detail">
          <img src="./img/product/image 7.svg"></img>
          <div class="product-info">
            <h2>Bottle Water</h2>
            <h4>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur.
            </h4>
            <p>100 stocks left!</p>
            <div class="qty-cart d-flex">
              <div class="counter">
                <span class="down" onClick={decreaseCount}>
                  -
                </span>
                <input type="text" value={1}></input>
                <span class="up" onClick={increaseCount}>
                  +
                </span>
              </div>
              <button class="button-long">Add to Cart</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
