import React from "react";

/**
 * @type {React.Context<{
 *  dismissDialog:()=>void,
 *  showToast:(content:JSX.Element)=>void
 * }>}
 */
const DialogContext = React.createContext({});
export default DialogContext;
