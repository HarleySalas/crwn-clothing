import React from "react";
import "./with-spinner.style.scss";

const WithSpinner = WrappedComponent => ({ isLoading, ...props }) => {
  return isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  ) : (
    <WrappedComponent {...props} />
  );
};

export default WithSpinner;
