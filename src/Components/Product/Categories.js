import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategory } from "../../store/products/actions";
import Header from "../Header-Footer-Sidebar/Header";
import Sidebar from "../Header-Footer-Sidebar/Sidebar";
import Footer from "../Header-Footer-Sidebar/Footer";
import ProductCategory from "./ProductCategory";
import "./Categories.css";

function Categories() {
  let { category } = useParams();
  let dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setCategory(encodeURIComponent(category)));
    return () => {
      dispatch(setCategory(""));
    };
  }, [category, dispatch]);

  const products = useSelector((state) => state.products.products);

  return (
    <main className="container my-font">
      <div className="category-container">
        <Header />
        <div className="category-h2">
          <h1 className="category">{category}</h1>
        </div>
        <section className="categories-container">
          <Sidebar />
          <div className="product-container">
            <div className="v1 hide-mobile hide-tablet">
              <img className="v1-child" src="../img/flower2.svg"></img>
              <img className="v2-child" src="../img/flower2.svg"></img>
              <img className="v3-child" src="../img/star.svg"></img>
              <img className="v4-child" src="../img/star2.svg"></img>
            </div>
            <div className="product-categories">
              <ProductCategory />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default Categories;
