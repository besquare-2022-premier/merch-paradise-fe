import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Components/Main/Homepage";
import "./Components/Main/LogSignup.css";
import { Login } from "./Components/Main/Login";
import { Register } from "./Components/Main/Register";

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/categories" element={<Homepage />} />
          <Route exact path="/community" element={<Homepage />} />
          <Route exact path="/support" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}


export default App;
