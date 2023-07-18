/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useSignInMutation } from "../redux/features/user/usersApi";
import { setLoading } from "../redux/features/user/userSlice";
import { toast } from "react-toastify";
import { FaBook } from "react-icons/fa";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [signInMutation] = useSignInMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credential = { email, password };
      dispatch(setLoading(true));
      const response: any = await signInMutation(credential);
      console.log(response);
      if (response.data) {
        // toast.success(response?.data?.message ? "":"success");
        Cookies.set("token", response?.data?.token);
        navigate("/");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response?.error?.data?.message ? "" : "error");
      }
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error("Login-in failed:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>Log In</title>
      </Helmet> */}

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1573219093925-cea25da23f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)",
        }}
      >
        <div className="bg-white w-[800px] shadow-md rounded-lg p-8 flex">
          <div className="w-1/2 flex items-center justify-center">
            <div>
              <div className="text-center mb-4">
                <Link to="/">
                  <img
                    height="65px"
                    width="65px"
                    className="mx-auto"
                    src="https://thumbs.dreamstime.com/z/hand-book-logo-illustration-art-background-43965136.jpg?w=576"
                    alt="logo"
                  />
                </Link>
              </div>
              <p className="text-center text-gray-700 text-lg mb-4">
                <Link to="/" className="text-xl font-black">
                  Book Catalog <FaBook className="inline-block"></FaBook>
                </Link>
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Log In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  defaultValue={password}
                  type="password"
                  id="password"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                />
              </div>
              {isLoading ? (
                <button
                  disabled
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Login
                </button>
              )}
              <p className="text-gray-700 text-md mt-4">
                have not account?{" "}
                <Link to="/signup">
                  <a className="text-indigo-500 font-semibold hover:text-indigo-700">
                    Sign Up
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}