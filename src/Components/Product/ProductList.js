import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/products/actions";
import "./Product List.css";
import { LogoScaleLoader } from "../common/Loader";
import { Link } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const query = useSelector((state) => state.products.query);
  React.useEffect(() => {
    dispatch(loadProducts(12));
  }, [dispatch, query]);
  return (
    <div>
      <div className="all-product-container">
        <h2>All Products {query ? `for ${query}` : ""}</h2>
        {!products ? (
          <div style={{ height: "20vh", width: "20vw" }}>
            <LogoScaleLoader />
          </div>
        ) : products.ids.length > 0 ? (
          <>
            <div className="products-grid">
              {products.ids.map((y) => {
                let z = products.map[y];
                return (
                  <div className="card-list">
                    <Link to={`/product-detail/${y}`} key={y}>
                      <div className="card-item-img">
                        <img
                          src={`https://cdn.merch-paradise.xyz/thumb/${z.image}`}
                          alt={z.name}
                        />
                      </div>
                    </Link>
                    <div className="card-info">
                      <h4>{z.name}</h4>
                    </div>

<<<<<<< HEAD
                      <div className="card-info">
                        <p>{z.name}</p>
                      </div>
                      <div class="card-footer">
                        <div class="wcf-left">
                          <h6>RM {(z.price / 100).toFixed(2)}</h6>
                        </div>
                        <div class="wcf-right">
=======
                    <div class="card-footer">
                      <div class="wcf-left">
                        <p>RM {(z.price / 100).toFixed(2)}</p>
                      </div>
                      <div class="wcf-right">
                        <Link to={`/checkout`}>
>>>>>>> 859c1e9f447d7c2d57d6ba4939e4c5dce3eb681e
                          <img
                            src="../img/assets/icon cart.svg"
                            alt="Add to cart"
                          ></img>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="more-products">
              <button>
                <h6>More Products</h6>
              </button>
            </div>
          </>
        ) : (
          <p>No result found</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
