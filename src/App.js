import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import { FinaliseRegistration } from "./Components/Main/FinaliseRegistration";
import LandingPage from "./Components/landing-page";
import { Login } from "./Components/Main/Login";
import ShopPageTemplate from "./Components/ShopPageTemplate";
import Categories from "./Components/Product/Categories";
import Checkout from "./Components/Checkout/Checkout";
import ProductDetail from "./Components/Product/ProductDetail";
import Homepage from "./Components/Main/Homepage";
import { Provider } from "react-redux";
import MainStore from "./store";
import { getUserProfile } from "./store/users/actions";
import IndexRegister from "./Components/emailSignup/indexRegister";
import Profile from "./profile/profile";
import UserAddress from "./profile/address";
import UserOrders from "./profile/orders";
import OrderDetails from "./profile/order";
import UserChangePassword from "./profile/change_password";
import OurTeam from "./Components/OurTeam/OurTeam";
import Community from "./Components/Community/Community";
import CommonDialogHost from "./Components/common/dialog/CommonDialog";
import { CartNotificationListenerMemo } from "./Components/common/cart-notification-listener";
import { ResetPassword } from "./Components/Main/ResetPassword";
import NotFoundPage from "./error_pages/NotFoundPage";
import ErrorBoundary from "./error_pages/ErrorBoundary";

function App() {
  React.useEffect(() => {
    MainStore.dispatch(getUserProfile);
  }, []);
  return (
    <ErrorBoundary>
      <Provider store={MainStore}>
        <CommonDialogHost>
          <CartNotificationListenerMemo />
          <div>
            <Routes>
              <Route exact path="reset-password" element={<ResetPassword />} />
              <Route exact path="register" element={<IndexRegister />} />
              <Route
                exact
                path="finalize-sign-up"
                element={<FinaliseRegistration />}
              />
              <Route exact path="login" element={<Login />} />
              <Route exact path="checkout" element={<Checkout />} />
              <Route
                exact
                path="categories/:category"
                element={<Categories />}
              />
              <Route
                exact
                path="product-detail/:productid"
                element={<ProductDetail />}
              />
              <Route path="/shop" element={<ShopPageTemplate />}>
                <Route path="community" element={<Community />} />
                <Route path="OurTeam" element={<OurTeam />} />
                <Route path="" element={<Homepage />} />
              </Route>
              <Route path="/profile" element={<ShopPageTemplate />}>
                <Route path="" element={<Profile />} />
                <Route path="address" element={<UserAddress />} />
                <Route path="orders" element={<UserOrders />} />
                <Route
                  path="change-password"
                  element={<UserChangePassword />}
                />
                <Route path="orders/:orderid" element={<OrderDetails />} />
              </Route>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </CommonDialogHost>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
