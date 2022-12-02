import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts, setCategory } from "../../store/products/actions";
import "./ProductCategory.css";
import { LogoScaleLoader } from "../common/Loader";
import { useParams } from "react-router-dom";
import ProductTile from "./ProductTile";
import { usePageTitle } from "../../utils/reactHooks";

function ProductCategory() {
  let { category } = useParams();
  usePageTitle(category);
  let dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const is_loading = useSelector(
    (state) =>
      !state.products.products || state.products.loading.includes("products")
  );
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
    dispatch(setCategory(encodeURIComponent(category)));
  }, [category, dispatch]);
  React.useEffect(() => {
    dispatch(loadProducts(loaderState.limit, !loaderState.load_extra));
  }, [category, dispatch, loaderState.limit, loaderState.load_extra]);
  React.useEffect(() => {
    if (products instanceof Error) {
      alert("Cannot load the data");
    }
  }, [products]);
  if (products instanceof Error) {
    return <p>Something went wrong</p>;
  }
  return (
    <>
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
    </>
  );
}

export default ProductCategory;
