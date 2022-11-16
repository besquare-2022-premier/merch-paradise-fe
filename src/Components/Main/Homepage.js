import React from "react";
import "./Homepage.css";
import ProductList from "../Product/ProductList";
import Sidebar from "../Header-Footer-Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedProducts } from "../../store/products/actions";
import { LogoScaleLoader } from "../common/Loader";

function Homepage() {
  const dispatch = useDispatch();
  const recommended = useSelector((state) => state.products.recommended);
  React.useEffect(() => {
    dispatch(getRecommendedProducts(4));
  }, []);
  return (
    <main className="container">
      <section className="top">
        <div>
          <Sidebar />
        </div>
        <div className="slideshow-container">
          <div className="mySlides">
            <img src="./img/banner1.svg"></img>
            <img src="./img/banner2.jpg"></img>
            <img src="./img/banner3.jpg"></img>
            <img src="./img/banner2.jpg"></img>
          </div>
        </div>
      </section>
      <section className="top-product">
        <div>
          <h2>Top Products</h2>
          {recommended ? (
            <div className="cards">
              {recommended.ids.map((id) => {
                const product = recommended.map[id];
                return (
                  <div className="card-item" key={id}>
                    <img src={product.image} alt={product.name} />
                    <div className="card-info">
                      <h4>{product.name}</h4>
                      <p>RM {(product.price / 100).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <LogoScaleLoader />
          )}
        </div>
      </section>
      <section className="all-product">
        <div className="container">
          <div className="product-list">
            <ProductList />
          </div>
        </div>
      </section>
      <section className="info">
        <img className="hide-mobile" src="./img/info1.svg"></img>
        <div className="about-us">
          <h2>About Us</h2>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </p>
        </div>
        <img className="hide-mobile" src="./img/assets/Vector1.svg"></img>
      </section>
      <section>
        <div className="join-us">
          <div className="join-us-info">
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </h2>
          </div>
          <div className="join-us-btn">
            <ul>
              <li>
                <button className="button-primary">Join Today</button>
              </li>
              <li>
                <button className="button-secondary">Contact Us</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
