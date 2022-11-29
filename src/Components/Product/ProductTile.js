import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart } from "../../store/cart/actions";

function ProfileTile({ content }) {
  const dispatch = useDispatch();
  return (
    <div className="card-list">
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

      <div class="card-footer">
        <div class="wcf-left">
          <h6>RM {(content.price / 100).toFixed(2)}</h6>
        </div>
        <div class="wcf-right">
          <img
            src="../img/assets/icon cart.svg"
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

export default React.memo(ProfileTile, (prevProp, newProps) => {
  return (
    prevProp.product_id === newProps.product_id &&
    prevProp.name === newProps.name &&
    prevProp.image === newProps.image &&
    prevProp.price === newProps.price
  );
});
