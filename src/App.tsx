import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "./redux/features/user/userSlice";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DecodedToken extends JwtPayload {
  email: string;
}

function App() {
  const dispatch = useDispatch();

  // Retrieve the token from the cookie
  const token: string | undefined = Cookies.get("token");

  // Authenticate user
  const verifyUserToken = () => {
    if (token) {
      try {
        const decodedToken: DecodedToken = jwt_decode(token);
        // Perform any necessary checks or validations on the decoded token
        if (decodedToken && decodedToken?.email) {
          dispatch(setUser(decodedToken?.email));
        }
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  };

  useEffect(() => {
    verifyUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="max-w-5xl mx-auto">
      <ToastContainer />
      <MainLayout />
    </div>
  );
}

export default App;
