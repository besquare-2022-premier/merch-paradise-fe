import React from "react";
// import "./Support.css";

function Support() {
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
              <div className="counter"></div>
              <button className="button-long">Add to Cart</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Support;
