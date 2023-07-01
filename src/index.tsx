import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "App";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
  headers: {
    authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI0MjNlZTU5MmUwMGJjZTM0Mzg3NmNiZjVjZjkxNWIzMzRlM2QxZWVkYjU3MDU2ZTUxYWY0ZDVlMWQ0ODFlODgwOGE0MWRmNzFlYjY5NWMwIn0.eyJhdWQiOiIxMzMxNyIsImp0aSI6IjI0MjNlZTU5MmUwMGJjZTM0Mzg3NmNiZjVjZjkxNWIzMzRlM2QxZWVkYjU3MDU2ZTUxYWY0ZDVlMWQ0ODFlODgwOGE0MWRmNzFlYjY5NWMwIiwiaWF0IjoxNjg4MTU0NjMzLCJuYmYiOjE2ODgxNTQ2MzMsImV4cCI6MTcxOTc3NzAzMywic3ViIjoiNjMzNDk3MyIsInNjb3BlcyI6W119.Bweqzve5jJ-OaGxLkOXgjSI04njMzG43fWQKSu5JwXeQVFcTsQaZm6GeO2ILcDkY5vxLvX3BwFWONkwRbwPX1zfn4XhgFMATs79jcRNoTjtFqALJo6zy1HEBDv_G7iSSavLbdBXs2-jXvLAtnZ3jw-J5maEYxwm5SYXKzGsz3r4b5TH961TYJzX-Q7D_haPcc8YJNnOJsNkFNVGoAAQ5r0wh7F_Fm3Nv8JzJofSOU6BsMODiwFLbYXQSuG3Xcu6oqlwpc7uAqjOwQIXbwjoXoSmG8uOTGNl1CFeiwKYd5pNozsDjL_jIHyTJEYwg0618K6Omv7lKF6DdWsZvR8gBjxGQFNM_PQ1x5T-TX8jkBT3Sdhec7kH3fczTGt26DaMCPP_i_rurjwwhLSbRk7PiNe2ZzfF8aohHfuU2CUI-3SinFbdRaMbkiPnmYhoeDKFztMQgtRM14SPOIDHsVIIXdp6eaGMlBIVTC76e35g8idphYWdVDaJWndKm2OI84qCKNj6ibB6C9FOcBLjsVZgE81QxeTz5ZElX4cIPFgJjZEVz5_sG5KvqJ5BOnnXPNKv2je9HEu5RDMRN-rkSwHJMa_ZNFPmTo49Dz2XctAd39J4YxW-F77mxcm814X9iWytDNyzdp2oethyuJdsyDhw0fyKjRrvhvynsjiQKjrBbS5E",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <React.Suspense fallback={<>loading</>}>
        <App />
      </React.Suspense>
    </ApolloProvider>
  </React.StrictMode>
);
