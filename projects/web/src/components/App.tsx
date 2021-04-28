import React, { useEffect } from "react";
import { Router } from "react-router";
import MainPage from "./MainPage";
import CurrentPathProvider from "../providers/CurrentPathProvider";
import { createBrowserHistory } from "history";
import { cx } from "@linaria/core";
import { css } from "@linaria/core";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: `http://${window.location.host}/graphql`,
  }),
});

const history = createBrowserHistory();

const rootStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
  font-family: "Montserrat", sans-serif;

  height: calc(var(--vh, 100vh));
`;

export default function App() {
  // Fix view height on mobile browsers (the address/bottom bars cover some of the page)
  useEffect(() => {
    const setViewHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setViewHeight);
    setViewHeight();
  }, []);

  return (
    <div
      className={cx(
        rootStyle,
        "bg-gray-700 text-white w-screen overflow-hidden"
      )}
    >
      <ApolloProvider client={client}>
        <Router history={history}>
          <CurrentPathProvider>
            <MainPage />
          </CurrentPathProvider>
        </Router>
      </ApolloProvider>
    </div>
  );
}
