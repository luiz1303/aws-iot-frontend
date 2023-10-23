import React from "react";
import ReactDOM from "react-dom/client";
import Toast from "./components/Toast";
import "./styles/index.css";
import App from "./App";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { appTheme } from "./styles/customStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={appTheme}>
    <React.StrictMode>
      <Toast />
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
