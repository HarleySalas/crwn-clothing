import React from "react";

import ErrorImage from "../../assets/error-boundary.png";

import "./error-boundary.style.scss";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasErrored: true
    };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-image-overlay">
          <img
            src={ErrorImage}
            alt="Lost in space"
            className="error-image-container"
          />
          <h2 className="error-image-text">
            Sorry, this page is lost in space.
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
