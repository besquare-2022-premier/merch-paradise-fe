import "./Loader.css";

export function JumpingRabbitLoader(props) {
  return (
    <div className="jumping-loading-animation" data-role={props.dataRole}>
      <img src="/img/rabbit.svg" />
    </div>
  );
}

export function LogoScaleLoader() {
  return (
    <div className="scaling-loading-animation">
      <img src="/img/LOGO.svg" />
    </div>
  );
}
