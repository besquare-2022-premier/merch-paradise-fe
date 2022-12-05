import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategory } from "../../store/products/actions";
import Header from "../Header-Footer-Sidebar/Header";
import Sidebar from "../Header-Footer-Sidebar/Sidebar";
import Footer from "../Header-Footer-Sidebar/Footer";
import ProductCategory from "./ProductCategory";
import StarSvg from "../../assets/star.svg";
import Star2Svg from "../../assets/star2.svg";
import Flower2Svg from "./assets/flower2.svg";
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
              <img className="v1-child" src={Flower2Svg}></img>
              <img className="v2-child" src={Flower2Svg}></img>
              <img className="v3-child" src={StarSvg}></img>
              <img className="v4-child" src={Star2Svg}></img>
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
