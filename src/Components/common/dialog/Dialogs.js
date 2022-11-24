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

export function Dialog({ config }) {
  const context = React.useContext(DialogContext);
  return (
    <div className="common-dialog-blocker">
      <div className="common-dialog-main">
        <div className="common-dialog-main-dismiss">
          <button onClick={() => context.dismissDialog(config.title)}>
            Close
          </button>
        </div>
        <div className="common-dialog-main-content">{config.content}</div>
      </div>
    </div>
  );
}
