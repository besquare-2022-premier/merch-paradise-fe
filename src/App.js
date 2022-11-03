import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";

function App() {
  return (
    <div className="App">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
