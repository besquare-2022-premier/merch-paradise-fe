import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/products/actions";
import "./Product List.css";
import { LogoScaleLoader } from "../common/Loader";
import ProductTile from "./ProductTile";

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
                return <ProductTile content={z} key={y} />;
              })}
            </div>
            {products.ids.length === loaderState.limit ? (
              <div className="more-products">
                <button onClick={() => updateLoaderState({ load_more: 1 })}>
                  More Products
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
