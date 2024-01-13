/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";
import { ErrorPage } from "./pages/Error";

const Home = lazy(() => import("./pages/Home"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
    errorElement: <ErrorPage />
  },
]);

export default router;
