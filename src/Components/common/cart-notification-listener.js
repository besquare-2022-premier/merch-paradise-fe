import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DialogContext from "./dialog/DialogContext";

/**
 * An empty element to receive the notifications
 */
function CartNotificationListener() {
  const { pathname, hash } = useLocation();
  const cart = useSelector((state) => state.cart);
  const [should_show, dispatchShouldShow] = React.useReducer(
    (state, action) => {
      const { loader_state } = action;
      if (state.prev.data === null) {
        return { ...state, prev: action, should: false };
      }
      if (
        state.prev.loader_state !== loader_state &&
        loader_state === "loaded"
      ) {
        return { ...state, prev: action, should: true };
      }
      return { ...state, prev: action, should: false };
    },
    { should: false, prev: {} }
  );
  const context = React.useContext(DialogContext);
  React.useEffect(() => {
    dispatchShouldShow(cart);
  }, [cart]);
  React.useEffect(() => {
    if (["/"].includes(pathname)) {
      return;
    }
    if (should_show.should) {
      context.showToast("Cart updated");
    }
  }, [should_show.should, context]);
  React.useEffect(() => {
    if (hash === "#loggedin") {
      let z = setTimeout(() => {
        context.showToast("Welcome");
        clearTimeout(z);
      }, 500);
    }
  }, [hash]);
  return <></>;
}

export const CartNotificationListenerMemo = React.memo(
  CartNotificationListener
);
