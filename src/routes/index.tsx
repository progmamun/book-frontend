import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import App from "../App";
import NotFound from "../page/NotFound";
import Login from "../page/Login";
import Signup from "../page/Signup";
import AllBook from "../page/AllBook";
import BookDetails from "../page/BookDetails";
import { PrivateRoute } from "./PrivateRoutes";
import AddNewBook from "../page/AddNewBook";
import EditBook from "../page/EditBook";

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
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />,
          </PrivateRoute>
        ),
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
