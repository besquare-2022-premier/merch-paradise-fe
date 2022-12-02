import React from "react";
import DialogContext from "./DialogContext";

export function Toast({ config }) {
  const context = React.useContext(DialogContext);
  function attachHandler(e) {
    e?.addEventListener("animationend", () => {
      context.dismissDialog("toast");
    });
  }
  return (
    <div className="common-dialog-toast" ref={attachHandler}>
      {config.content}
    </div>
  );
}