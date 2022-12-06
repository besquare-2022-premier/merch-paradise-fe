import React from "react";
import "./error.css";
import ErrorImage from "./assets/500.webp";
import Reload from "./assets/reload.svg";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page-container">
          <img alt="Sad 505" src={ErrorImage} />
          <h1>Snap! The application crashed!</h1>
          <img
            className="reload-button"
            alt="Click here to refresh"
            title="Click here to refresh"
            src={Reload}
            onClick={() => document.location.reload()}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
