/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"))
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const router = createBrowserRouter([{
  path: '/',
  element:<Home />
},{
  path: '/blog/:id',
  element: <BlogDetail />
}]);

export default router
