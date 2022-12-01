import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart/actions";
export default React.memo(function CartCounter() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCart);
  }, []);
  const cart = useSelector((state) => state.cart.data);
  return (
    <span className="cart-items-count">
      {cart?.reduce((current, value) => current + value.quantity, 0) ?? 0}
    </span>
  );
});
