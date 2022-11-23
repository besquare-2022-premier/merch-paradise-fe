import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts, setCategory } from "../../store/products/actions";
import "./ProductCategory.css";
import { LogoScaleLoader } from "../common/Loader";
import { Link, useParams } from "react-router-dom";

function mapZoned(array, zoneSize, mapper, zoneWrapper = (z) => <>{z}</>) {
  const size = Math.ceil(array.length / zoneSize);
  const indexes = Array(size)
    .fill(0)
    .map((_, i) => array.slice(i * zoneSize, (i + 1) * zoneSize));
  return indexes.map((z) => zoneWrapper(z.map(mapper)));
}

function ProductCategory() {
  let { category } = useParams();
  let dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  React.useEffect(() => {
    dispatch(setCategory(encodeURIComponent(category)));
    dispatch(loadProducts(12));
    return () => {
      dispatch(setCategory(""));
    };
  }, [category, dispatch]);
  React.useEffect(() => {
    if (products instanceof Error) {
      alert("Cannot load the shits");
    }
  }, [products]);
  if (products instanceof Error) {
    return <p>Something went wrong</p>;
  }
  return !products ? (
    <div style={{ height: "20vh", width: "20vw" }}>
      <LogoScaleLoader />
    </div>
  ) : (
    <>
      <div className="products-grid">
        {mapZoned(products.ids, 4, (y) => {
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

<<<<<<< HEAD
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
=======
              <div className="card-info">
                <h4>{z.name}</h4>
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
>>>>>>> 859c1e9f447d7c2d57d6ba4939e4c5dce3eb681e
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductCategory;
