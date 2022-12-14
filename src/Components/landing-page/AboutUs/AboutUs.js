import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="center-container">
        <p className="title-about-us"> About Us </p>
        <div className="story">
          This is our story
          <img
            src="img/Presentgift.svg"
            alt="gift"
            className="shake-on-hover"
          />
        </div>
        <div className="passage">
          We love anime or game merchandise as much as the other person. We
          wanted to create a platform that creates less hassle for users, rather
          then searching through some dodgy websites. This website is the brain
          child of the group Premier.
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
