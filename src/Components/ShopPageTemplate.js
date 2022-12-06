import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header-Footer-Sidebar/Header";
import Footer from "./Header-Footer-Sidebar/Footer";

function ShopPageTemplate() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default ShopPageTemplate;
