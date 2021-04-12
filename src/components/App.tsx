import React from "react";
import { Router } from "react-router";
import MainPage from "./MainPage";
import CurrentPathProvider from "../providers/CurrentPathProvider";
import { createBrowserHistory } from "history";
import { cx } from "@linaria/core";
import { css } from "@linaria/core";

const history = createBrowserHistory();

const rootStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
  font-family: "Montserrat", sans-serif;
`;

export default function App() {
  return (
    <div className={cx(rootStyle, "bg-gray-700 text-white w-screen h-screen ")}>
      <Router history={history}>
        <CurrentPathProvider>
          <MainPage />
        </CurrentPathProvider>
      </Router>
    </div>
  );
}
