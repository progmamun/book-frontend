/* eslint-disable @typescript-eslint/no-unsafe-return*/

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

export const PrivateRoute = ({ children }: any) => {
  const user = useAppSelector((state) => state.user);
  if (user.accessToken) {
    return children;
  }
  return <Navigate to="/login" />;
};
