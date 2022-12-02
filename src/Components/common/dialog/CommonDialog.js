import React from "react";
import { useLocation } from "react-router-dom";
import "./CommonDialog.css";
import DialogContext from "./DialogContext";
import { Toast } from "./Dialogs";

/**
 * The React element for showing the dialogs and toast
 */
export default function CommonDialogHost({ children }) {
  const [dialogs, dispatchDialogs] = React.useReducer((state, action) => {
    switch (action.type) {
      case "dismissDialog": {
        return state.filter((z) => z.props?.config.title !== action.id);
      }
      case "showToast": {
        state = state.filter((z) => z.props?.config.title !== "toast");
        //add the dialog to the chain
        return [...state, <Toast config={action.dialog} key={Math.random()} />];
      }
      default:
        return state;
    }
  }, []);
  const constructor = React.useMemo(() => {
    return {
      dismissDialog: function (id) {
        dispatchDialogs({ type: "dismissDialog", id });
      },
      showToast: function (content) {
        dispatchDialogs({
          type: "showToast",
          dialog: { title: "toast", content },
        });
      },
    };
  }, [dispatchDialogs]);
  const { pathname } = useLocation();
  React.useEffect(() => {
    constructor.dismissDialog("toast");
    window.scroll(0, 0);
  }, [constructor, pathname]);
  return (
    <DialogContext.Provider value={constructor}>
      <div className="common-dialog-host">
        <div className="common-dialog-popups">{dialogs}</div>
      </div>
      {children}
    </DialogContext.Provider>
  );
}
