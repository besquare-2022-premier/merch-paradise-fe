import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart } from "../../store/cart/actions";
import IconCartImage from "./assets/icon_cart.svg";

function ProductTile({ content, className = "card-list" }) {
  const dispatch = useDispatch();
  return (
    <div className={className}>
      <Link to={`/product-detail/${content.product_id}`}>
        <div className="card-item-img">
          <img
            src={`https://cdn.merch-paradise.xyz/thumb/${content.image}`}
            alt={content.name}
          />
        </div>
      </Link>

      <div className="card-info">
        <p>{content.name}</p>
      </div>

      <div className="card-footer">
        <div className="wcf-left">
          <h6>RM {(content.price / 100).toFixed(2)}</h6>
        </div>
        <div className="wcf-right">
          <img
            src={IconCartImage}
            alt="Add to cart"
            onClick={() =>
              dispatch(
                updateCart([{ product_id: content.product_id, quantity: 1 }])
              )
            }
          ></img>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductTile, (prevProp, newProps) => {
  return (
    prevProp.content.product_id === newProps.content.product_id &&
    prevProp.content.name === newProps.content.name &&
    prevProp.content.image === newProps.content.image &&
    prevProp.content.price === newProps.content.price
  );
});
