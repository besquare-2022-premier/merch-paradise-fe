import React from "react";
import { usePageTitle } from "../../utils/reactHooks";
// import "./Support.css";

function Support() {
  usePageTitle("Support");
  return (
    <div className="container my-font">
      <div className="all-product-container">
        <div>
          <div>
            <h2>Get in Touch!</h2>
          </div>
          <div>
            <div className="cool-staff">
              <img src="/img/info1.svg"></img>
              <img src="/img/info1.svg"></img>
              <img src="/img/info1.svg"></img>
              <img src="/img/info1.svg"></img>
              <img src="/img/info1.svg"></img>
            </div>
            <div>
              <ul>
                <li>
                  <h5>Premier Sdn Bhd</h5>
                </li>
                <li>03-6941092</li>
                <li>Jalan Tenokrat 5 Cyberjaya, Selangor</li>
                <li>premiersdnbhd@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
