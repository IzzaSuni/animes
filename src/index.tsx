import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import routes from "./router";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <React.Suspense fallback={<>loading</>}>
        <RouterProvider fallbackElement={<>loading</>} router={routes} />
      </React.Suspense>
    </ApolloProvider>
  </React.StrictMode>
);
