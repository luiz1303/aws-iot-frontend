import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      autoClose={5000}
      position="top-left"
      hideProgressBar={false}
      closeButton={false}
      closeOnClick={true}
      pauseOnHover={false}
      draggable={true}
    />
  );
};

export default Toast;
