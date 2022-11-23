import React from "react";
import EllipseTeal from "./assets/ellipse-teal.svg";
import EllipsePurple from "./assets/ellipse-purple.svg";
import HalfTeal from "./assets/half-teal.svg";
import FlowerFlower from "./assets/flowerflower.svg";
import TealCircle from "./assets/teal-circle.svg";
import "./decoration.css";

export default function Decoration() {
  return (
    <>
      <img className="circle" src={EllipseTeal} alt="circle" />
      <img className="purple" src={EllipsePurple} alt="purple" />
      <img className="half-circle" src={HalfTeal} alt="half-teal" />
      <img className="flower" src={FlowerFlower} alt="half-teal" />
      <img className="purple-2" src={EllipsePurple} alt="purple" />
      <img className="semi-purple" src={EllipsePurple} alt="purple-semi" />
      <img className="teal-circle" src={TealCircle} alt="teal-semi" />
    </>
  );
}
