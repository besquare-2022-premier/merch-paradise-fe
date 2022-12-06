import React from "react";
import { usePageTitle } from "../../utils/reactHooks";
import "./OurTeam.css";
import Flower2Svg from "./assets/flower2.svg";

function AboutUs() {
  usePageTitle("AboutUs");
  return (
    <div className="container my-font">
      <div className="all-product-container">
        <div>
          <div className="company-info">
            <h1>Get in Touch!</h1>
            <div className="team-info">
              <ul>
                <li>
                  <h7>
                    <strong>Premier Sdn Bhd</strong>
                  </h7>
                </li>
                <li>03-6941092</li>
                <li>Jalan Tenokrat 5 Cyberjaya, Selangor</li>
                <li>premiersdnbhd@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="header-team">
            <img className="v1-child" src={Flower2Svg} alt=""></img>
            <h3>
              <strong>Meet the Team</strong>
            </h3>
          </div>

          <div className="team-container-grid">
            <div className="team-card">
              <div className="img-wrapper">
                <img src="/img/teams/1.png" alt="Ngeo Jia Jun"></img>
              </div>
              <h4>Ngeo Jia Jun</h4>
              <p>Back End, DevOps</p>
            </div>
            <div className="team-card">
              <div className="img-wrapper">
                <img src="/img/teams/2.png" alt="Dharisini Kanesamoorthy"></img>
              </div>
              <h4>Dharisini Kanesamoorthy</h4>
              <p>Product Design, Quality Assurance</p>
            </div>
            <div className="team-card">
              <div className="img-wrapper">
                <img src="/img/teams/3.png" alt="Amir bin Zahari"></img>
              </div>
              <h4>Amir bin Zahari</h4>
              <p>Business Intelligence, Back End</p>
            </div>
            <div className="team-card">
              <div className="img-wrapper">
                <img src="/img/teams/4.png" alt="Lashweenraj Ravinthiran"></img>
              </div>
              <h4>Lashweenraj Ravinthiran</h4>
              <p>Quality Assurance, Front End</p>
            </div>
            <div className="team-card">
              <div className="img-wrapper">
                <img
                  src="/img/teams/5.png"
                  alt="Nurul Syafiqah Binti Ab Rashid"
                ></img>
              </div>
              <h4>Nurul Syafiqah Binti Ab Rashid</h4>
              <p>Product Design, Front End</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
