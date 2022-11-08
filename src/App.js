import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Components/Main/Homepage";
// import "./Components/Main/LogSignup.css";
import { Login } from "./Components/Main/Login";
import { Register } from "./Components/Main/Register";
import Categories from "./Components/Product/Categories";
import Checkout from "./Components/Checkout/Checkout";
import ProductDetail from "./Components/Product/ProductDetail";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <Router>
      <div className="App">
        {/* {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )} */}
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/community" element={<ProductDetail />} />
          <Route exact path="/support" element={<Checkout />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
