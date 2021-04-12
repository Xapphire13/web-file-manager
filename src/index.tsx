import "tailwindcss/tailwind.css";
import "@reach/listbox/styles.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const reactRoot = document.createElement("div");
document.body.append(reactRoot);
ReactDOM.render(<App />, reactRoot);
