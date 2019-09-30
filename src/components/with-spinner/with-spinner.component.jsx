import React from "react";
import "./with-spinner.style.scss";

// const WithSpinner = WrappedComponent => ({ isLoading, ...props }) => {
//   return isLoading ? (
//     <div className="spinner-overlay">
//       <div className="spinner-container"></div>
//     </div>
//   ) : (
//     <WrappedComponent {...props} />
//   );
// };

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...props }) => {
    return isLoading ? (
      <div className="spinner-overlay">
        <div className="spinner-container"></div>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return Spinner;
};

export default WithSpinner;
