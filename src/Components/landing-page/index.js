import React from "react";
import Navbar from "./Navbar";
import TopSection from "./TopSection";
import Category from "./Category";
import AboutUs from "./AboutUs";
import "../../App.css";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <TopSection />
      <Category />
      <AboutUs />
    </div>
  );
}
