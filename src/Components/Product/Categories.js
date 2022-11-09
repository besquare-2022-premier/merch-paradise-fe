import React from "react";
import Sidebar from "../Sidebar";
import "./Product Detail.css";
import ProductList from "./ProductList";

function Categories() {
  return (
    <section class="all-product d-flex">
      <Sidebar />
      <div class="container">
        <div class="product-list">
          <ProductList />
        </div>
      </div>
    </section>
  );
}

export default Categories;
