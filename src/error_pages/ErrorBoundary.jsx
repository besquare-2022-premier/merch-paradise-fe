import React from "react";
import "./error.css";
import ErrorImage from "./assets/500.webp";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page-container">
          <img alt="Sad 505" src={ErrorImage} />
          <h1>Snap! The application crashed!</h1>
          <button onClick={() => document.location.reload()}>
            Click here to refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
