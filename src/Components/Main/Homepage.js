import React from "react";
import "./Main.css";
import ProductList from "../Product/ProductList";
import Sidebar from "../Sidebar";

function Homepage() {
  return (
    <main class="container">
      <section class="top">
        <div>
          <Sidebar />
        </div>
        <div class="slideshow-container">
          <div>
            <img class="mySlides" src="./img/banner1.svg"></img>
          </div>
        </div>
      </section>
      <section class="top-product">
        <div>
          <h2>Top Products</h2>
          <div class="cards">
            <div class="card-item">
              <img src="./img/product/image 5.svg"></img>
              <div class="card-info">
                <h4>Zebrah Bottle Water</h4>
                <p>$15.00</p>
              </div>
            </div>
            <div class="card-item">
              <img src="./img/product/image 6.svg"></img>
              <div class="card-info">
                <h4>Yinyang Bottle Water</h4>
                <p>$15.00</p>
              </div>
            </div>
            <div class="card-item">
              <img src="./img/product/image 7.svg"></img>
              <div class="card-info">
                <h4>Birdy Bottle Water</h4>
                <p>$15.00</p>
              </div>
            </div>
            <div class="card-item">
              <img src="./img/product/image 8.svg"></img>
              <div class="card-info">
                <h4>Catty Shirts</h4>
                <p>$15.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="all-product">
        <div class="container">
          <div class="product-list">
            <ProductList />
          </div>
        </div>
      </section>
      <section class="info">
        <img src="./img/info1.svg"></img>
        <div class="about-us">
          <h2>About Us</h2>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </p>
        </div>
        <img src="./img/assets/Vector1.svg"></img>
      </section>
      <section>
        <div class="join-us">
          <div class="join-us-info">
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </h4>
          </div>
          <div class="join-us-btn">
            <ul>
              <li>
                <button class="button-primary">Join Today</button>
              </li>
              <li>
                <button class="button-secondary">Contact Us</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
