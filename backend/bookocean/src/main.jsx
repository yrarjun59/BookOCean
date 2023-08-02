import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./bootstrap.min.css";
import { HashRouter as Router } from "react-router-dom";
import store from "./store.js";
import "./index.css";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
