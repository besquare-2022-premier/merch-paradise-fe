import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/products/actions";
import "./Product List.css";
import { LogoScaleLoader } from "../common/Loader";
import { Link } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  React.useEffect(() => {
    dispatch(loadProducts(12));
  }, [dispatch]);
  return (
    <div>
      <div className="all-product-container">
        <h2>All Products</h2>
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
                        <p>{z.name}</p>
                      </div>
                      <div class="card-footer">
                        <div class="wcf-left">
                          <h6>RM {(z.price / 100).toFixed(2)}</h6>
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
              <button>
                <h6>More Products</h6>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
