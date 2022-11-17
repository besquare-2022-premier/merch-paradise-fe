import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/products/actions";
import "./Product List.css";
import { LogoScaleLoader } from "../common/Loader";

function mapZoned(array, zoneSize, mapper, zoneWrapper = (z) => <>{z}</>) {
  const size = Math.ceil(array.length / zoneSize);
  console.log(size);
  const indexes = Array(size)
    .fill(0)
    .map((_, i) => array.slice(i * zoneSize, (i + 1) * zoneSize));
  return indexes.map((z) => zoneWrapper(z.map(mapper)));
}

function ProductList() {
  // const products = useContentLoader(() =>
  //   fetchJsonWithCookie(`${ENDPOINT_BASE}/product`)
  // );
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log(products);
  React.useEffect(() => {
    dispatch(loadProducts(12));
  }, []);
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
            {mapZoned(
              products.ids,
              4,
              (y) => {
                let z = products.map[y];
                return (
                  <div className="card-list" key={y}>
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
                        <img src="../img/assets/icon cart.svg"></img>
                      </div>
                    </div>
                  </div>
                );
              },
              (z) => {
                return <div className="cards">{z}</div>;
              }
            )}
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
