import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import App from "../App";
import NotFound from "../page/NotFound";
import Login from "../page/Login";
import Signup from "../page/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home />,
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
