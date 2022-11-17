import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import { Register } from "./Components/Main/Register";
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
import Support from "./Components/Support/Support";
import Community from "./Components/Community/Community";

function App() {
  React.useEffect(() => {
    MainStore.dispatch(getUserProfile);
  }, []);
  return (
    <Provider store={MainStore}>
      <div>
        <Routes>
          <Route exact path = "sign-up-email" element={<IndexRegister/>}/>
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="checkout" element={<Checkout />} />
          <Route exact path="categories/:category" element={<Categories />} />
          <Route exact path="product-detail/:productid" element={<ProductDetail />} />
          <Route path="/shop" element={<ShopPageTemplate />}>
            <Route path="community" element={<Community />} />
            <Route path="support" element={<Support />} />
            <Route path="" element={<Homepage />} />
          </Route>
          <Route path="/profile" element={<ShopPageTemplate />}>
            <Route path="" element={<Profile />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="change-password" element={<UserChangePassword />} />
            <Route path="orders/:orderid" element={<OrderDetails />} />
          </Route>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
