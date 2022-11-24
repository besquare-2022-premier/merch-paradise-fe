import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/products/actions";
import "./Product List.css";
import { LogoScaleLoader } from "../common/Loader";
import { Link } from "react-router-dom";
import { updateCart } from "../../store/cart/actions";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const query = useSelector((state) => state.products.query);
  React.useEffect(() => {
    dispatch(loadProducts(12));
  }, [dispatch, query]);
  return (
    <div>
      <div className="all-product-container my-font">
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
                          onClick={() =>
                            dispatch(
                              updateCart([
                                { product_id: z.product_id, quantity: 1 },
                              ])
                            )
                          }
                        ></img>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="more-products">
              <button>More Products</button>
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
