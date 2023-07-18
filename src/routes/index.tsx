import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import App from "../App";
import NotFound from "../page/NotFound";
import Login from "../page/Login";
import Signup from "../page/Signup";
import AllBook from "../page/AllBook";
import BookDetails from "../page/BookDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-book",
        element: <AllBook />,
      },
      {
        path: "/book-details/:slug",
        element: <BookDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default routes;
