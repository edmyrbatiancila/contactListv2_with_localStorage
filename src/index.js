import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Theme accentColor="iris">
      <App />
    </Theme>
  </React.StrictMode>
);
