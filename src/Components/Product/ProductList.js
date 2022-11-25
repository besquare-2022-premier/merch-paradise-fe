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
  const is_loading = useSelector(
    (state) =>
      !state.products.products || state.products.loading.includes("products")
  );
  const query = useSelector((state) => state.products.query);
  const [loaderState, updateLoaderState] = React.useReducer(
    (state, action) => {
      if (action.load_more) {
        return { limit: state.limit + 12, load_extra: true };
      } else if (action.reset) {
        return { limit: 12 };
      }
      return state;
    },
    { limit: 12 }
  );
  React.useEffect(() => {
    updateLoaderState({ reset: 1 });
  }, [query]);
  React.useEffect(() => {
    dispatch(loadProducts(loaderState.limit, !loaderState.load_extra));
  }, [dispatch, loaderState.limit, loaderState.load_extra, query]);
  return (
    <div>
      <div className="all-product-container my-font">
        <h2>All Products {query ? `for ${query}` : ""}</h2>
        {products?.ids.length > 0 ? (
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
            {products.ids.length === loaderState.limit ? (
              <div className="more-products">
                <button onClick={() => updateLoaderState({ load_more: 1 })}>
                  <h6>More Products</h6>
                </button>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {products?.ids.length === 0 ? <p>No result found</p> : <></>}
        {is_loading ? (
          <div>
            <div style={{ height: "20vh", width: "20vw", margin: "auto" }}>
              <LogoScaleLoader />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProductList;
