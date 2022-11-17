import React from "react";
import "./ValidatingInputField.css";
export function ValidatingInputField(props) {
  const [everFocused, setEverFocused] = React.useState(false);
  const [focusing, setFocusing] = React.useState(false);
  const valid = (props.valid ?? true) || !everFocused || focusing;
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current?.setCustomValidity(
      props.valid ? "" : props.error_message ?? "Invalid"
    );
  }, [props.valid, props.error_message]);
  return (
    <div
      style={props.style}
      className="validating-field"
      state={valid ? "valid" : "error"}
      data-name={props.name}
    >
      {!props.hide_label ? (
        <label htmlFor={props.name}>{props.placeholder}</label>
      ) : (
        <></>
      )}
      <input
        ref={ref}
        className={props.error}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        onFocus={() => {
          if (!everFocused) {
            setEverFocused(true);
          }
          setFocusing(true);
        }}
        onBlur={() => setFocusing(false)}
      />
      {!valid ? <p>{props.error_message ?? "Invalid"}</p> : <></>}
    </div>
  );
}
