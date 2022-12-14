import "./Loader.css";
import rabbit from "./assets/rabbit.svg";
import LogoImage from "../../assets/logo.svg";

export function JumpingRabbitLoader(props) {
  return (
    <div className="jumping-loading-animation" data-role={props.dataRole}>
      <img src={rabbit} alt="" />
    </div>
  );
}

export function LogoScaleLoader() {
  return (
    <div className="scaling-loading-animation">
      <img src={LogoImage} alt="" />
    </div>
  );
}
