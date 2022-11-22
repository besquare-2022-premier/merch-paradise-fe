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
        ) : (
          <>
            <div className="products-grid">
              {products.ids.map((y) => {
                let z = products.map[y];
                return (
                  <Link to={`/product-detail/${y}`} key={y}>
                    <div className="card-list">
                      <div className="card-item-img">
                        <img
                          src={`https://cdn.merch-paradise.xyz/thumb/${z.image}`}
                          alt={z.name}
                        />
                      </div>

                      <div className="card-info">
                        <h5>{z.name}</h5>
                      </div>
                      <div class="card-footer">
                        <div class="wcf-left">
                          <p>RM {(z.price / 100).toFixed(2)}</p>
                        </div>
                        <div class="wcf-right">
                          <img
                            src="../img/assets/icon cart.svg"
                            alt="Add to cart"
                          ></img>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="more-products">
              <button>More Products</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
