import React, { useState } from "react";
import logo from "./logo.svg";
import "./Components/Main/LogSignup.css";
import { Login } from "./Components/Main/Login";
import { Register } from "./Components/Main/Register";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}

export default App;
