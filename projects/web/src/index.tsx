import "@reach/menu-button/styles.css";
import "tailwindcss/tailwind.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// Disable @reach CSS warnings
document.documentElement.style.setProperty("--reach-dialog", "1");

const reactRoot = document.createElement("div");
document.body.append(reactRoot);
ReactDOM.render(<App />, reactRoot);
