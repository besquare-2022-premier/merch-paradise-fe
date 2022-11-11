import React from "react";
import Sidebar from "../Header-Footer-Sidebar/Sidebar";
import ProductList from "./ProductList";

function Categories() {
  return (
    <section>
      <div>
        <Sidebar />
      </div>
      <div>
        <ProductList />
      </div>
    </section>
  );
}

export default Categories;
