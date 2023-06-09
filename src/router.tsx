import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { homeLoader } from "./utils/loaders";


const router = createBrowserRouter([{
  path: '/',
  loader: homeLoader,
  element: <Home />
}]);

export default router
