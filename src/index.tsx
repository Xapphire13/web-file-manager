import "tailwindcss/tailwind.css";
import "@reach/listbox/styles.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createBrowserHistory } from "history";
import { Router } from "react-router";

const history = createBrowserHistory();

const reactRoot = document.createElement("div");
document.body.append(reactRoot);
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  reactRoot
);
