import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader, usePageTitle } from "../../utils/reactHooks";
import { LogoScaleLoader } from "../common/Loader";
import Header from "../Header-Footer-Sidebar/Header";
import "./Product Detail.css";

function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

function ProductDetail() {
  let { productid } = useParams();
  const products = useSelector((state) => state.products);
  console.log(products);
  const navigate = useNavigate();
  const product = useContentLoader(
    async () => {
      if (`${parseInt(productid)}` !== productid) {
        throw new Error("Invalid product id");
      }
      //check if it is in the redux store
      for (const store of [products.products, products.recommended]) {
        if (store?.map[productid]) {
          //reuse it
          return store.map[productid];
        }
      }
      //or else use the one from the endpoint
      return fetchJsonWithCookie(`${ENDPOINT_BASE}/product/item/${productid}`);
    },
    [productid],
    null
  );
  React.useEffect(() => {
    if (product instanceof Error) {
      alert(product.message);
      navigate("/shop");
    }
  }, [product, navigate]);
  usePageTitle((product?.name ? `${product.name} -` : "") + " Merch paradise");
  return product ? (
    <div className="container">
      <div className="all-product-container">
        <Header />
        <section className="product-detail">
          <img
            src={`https://cdn.merch-paradise.xyz/thumb/${product.image}`}
          ></img>
          <div className="product-info">
            <h2>{product.name}</h2>
            <h4>{product.description}</h4>
            <p>Stock : {product.stock}</p>
            <div className="qty-cart d-flex">
              <div className="counter">
                <span className="down" onClick={decreaseCount}>
                  -
                </span>
                <input type="text" value={1}></input>
                <span className="up" onClick={increaseCount}>
                  +
                </span>
              </div>
              <button className="button-long">Add to Cart</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <LogoScaleLoader />
  );
}

export default ProductDetail;
