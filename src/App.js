import { Routes, Router, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./Components/landing-page/Navbar";
import TopSection from "./Components/landing-page/TopSection";
import Category from "./Components/landing-page/Category";
import AboutUs from "./Components/landing-page/AboutUs";
import Homepage from "./Components/Main/Homepage";
import { Register } from "./Components/Main/Register";

function App() {
  return (
    <div>
      <Navbar />
      <TopSection />
      <Category />
      <AboutUs />
      {/* <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Homepage />} />
      </Routes> */}
    </div>
  );
}

export default App;
