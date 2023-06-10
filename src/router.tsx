import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { BlogDetailLoader, homeLoader } from "./utils/loaders";
import BlogDetail from "./pages/BlogDetail";


const router = createBrowserRouter([{
  path: '/',
  loader: homeLoader,
  element: <Home />
},{
  path: '/blog/:id',
  loader: BlogDetailLoader,
  element: <BlogDetail />
}]);

export default router
