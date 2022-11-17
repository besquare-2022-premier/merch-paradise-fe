import React from "react";
import Navbar from "./Navbar/Navbar";
import TopSection from "./TopSection/TopSection";
import Category from "./Category/Category";
import AboutUs from "./AboutUs/AboutUs";
import Decoration from "./Decoration/Decoration";
import "../../App.css";

export default function LandingPage() {
  return (
    <div>
     <Decoration/>
      <Navbar/>
      <TopSection />
      <Category />
      <AboutUs />
    </div>
  );
}
