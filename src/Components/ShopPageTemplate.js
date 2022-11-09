import React from "react";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import Header from "./Header-Footer-Sidebar/Header";
import Footer from "./Header-Footer-Sidebar/Footer";

function ShopPageTemplate() {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <div className="App">
      {/* {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )} */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default ShopPageTemplate;
