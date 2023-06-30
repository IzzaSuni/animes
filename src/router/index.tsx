import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const AnimeList = lazy(() => import("containers/anime-list"));
const CollectionList = lazy(() => import("containers/collection-list"));
const NotFoundPage = lazy(() => import("containers/404-not-found"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AnimeList />,
  },
  {
    path: "/collections",
    element: <CollectionList />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
