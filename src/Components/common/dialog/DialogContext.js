import React from "react";

/**
 * @type {React.Context<{
 *  showDialog:(content:JSX.Element)=>void,
 *  dismissDialog:()=>void,
 *  showToast:(id:string,content:JSX.Element)=>void
 * }>}
 */
const context = React.createContext({});
export default context;
