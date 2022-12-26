import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reduxStore from "./store/reduxStore";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
