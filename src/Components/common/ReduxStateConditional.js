import { useSelector } from "react-redux";

/**
 * Conditional renders the client based on the state from redux
 * @param {object} props
 * @param {(state:any)=>boolean} props.selector Function to determine weather the rendering shall takes place
 * @param {JSX.Element|JSX.Element[]} props.children
 * @param {JSX.Element?} props.alternative alternative element to render when the condition does not met
 */
export default function ReduxStateConditional(props) {
  if (typeof props.selector !== "function") {
    throw new Error("Invalid selector");
  }
  const ignore = !useSelector(props.selector);
  return <>{ignore ? props.alternative ?? <></> : props.children}</>;
}
