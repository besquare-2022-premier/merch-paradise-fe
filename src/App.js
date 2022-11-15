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
import Profile from "./profile/profile";
import UserAddress from "./profile/address";
import UserOrders from "./profile/orders";

function App() {
  React.useEffect(() => {
    MainStore.dispatch(getUserProfile);
  }, []);
  return (
    <Provider store={MainStore}>
      <div>
        <Routes>
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
          <Route path="/shop" element={<ShopPageTemplate />}>
            <Route path="category" element={<Categories />} />
            <Route path="community" element={<ProductDetail />} />
            <Route path="support" element={<Checkout />} />
            <Route path="" element={<Homepage />} />
          </Route>
          <Route path="/profile" element={<ShopPageTemplate />}>
            <Route path="" element={<Profile />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
