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
    dispatch(setCategory(category));
    return () => {
      dispatch(setCategory(""));
    };
  }, [category, dispatch]);

  const products = useSelector((state) => state.products.products);

  console.log(products);
  console.log(category);
  return (
    <main className="container">
      <div className="category-container">
        <Header />
        <div className="category-h2">
          <p className="category">{category}</p>
        </div>
        <section className="top">
          <Sidebar />
          <div className="product-container">
            <div className="product-categories">
              <ProductCategory />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}

export default Categories;
