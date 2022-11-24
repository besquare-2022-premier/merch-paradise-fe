import React from "react";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import Header from "./Header-Footer-Sidebar/Header";
import Footer from "./Header-Footer-Sidebar/Footer";
import CommonDialogHost from "./common/dialog/CommonDialog";

function ShopPageTemplate() {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <CommonDialogHost>
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
    </CommonDialogHost>
  );
}

export default ShopPageTemplate;
