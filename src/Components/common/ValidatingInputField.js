import React from "react";
import "./ValidatingInputField.css";
export function ValidatingInputField(props) {
  const [everFocused, setEverFocused] = React.useState(false);
  const [focusing, setFocusing] = React.useState(false);
  const valid = (props.valid ?? true) || !everFocused || focusing;
  return (
    <div
      style={props.style}
      className="validating-field"
      state={valid ? "valid" : "error"}
      data-name={props.name}
    >
      <input
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
