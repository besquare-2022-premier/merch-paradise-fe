import React from "react";
// import "./Checkout.css";

function Checkout() {
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
                
              </div>
              <button class="button-long">Add to Cart</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
