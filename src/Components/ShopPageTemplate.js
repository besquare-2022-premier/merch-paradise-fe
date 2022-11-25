import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header-Footer-Sidebar/Header";
import Footer from "./Header-Footer-Sidebar/Footer";
import CommonDialogHost from "./common/dialog/CommonDialog";
import { useSelector } from "react-redux";
import DialogContext from "../Components/common/dialog/DialogContext";

/**
 * An empty element to receive the notifications
 */
function CartNotificationListener() {
  const cart = useSelector((state) => state.cart.loader_state);
  const [should_show, dispatchShouldShow] = React.useReducer(
    (state, action) => {
      if (state.prev !== action && action === "loaded") {
        return { ...state, prev: action, should: true };
      }
      return { ...state, prev: "action", should: false };
    },
    { should: false, prev: "" }
  );
  const context = React.useContext(DialogContext);
  React.useEffect(() => {
    dispatchShouldShow(cart);
  }, [cart]);
  React.useEffect(() => {
    if (should_show.should) {
      context.showToast("Added to cart");
    }
  }, [should_show.should, context]);
  return <></>;
}

const CartNotificationListenerMemo = React.memo(CartNotificationListener);

function ShopPageTemplate() {
  return (
    <CommonDialogHost>
      <CartNotificationListenerMemo />
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </CommonDialogHost>
  );
}

export default ShopPageTemplate;
