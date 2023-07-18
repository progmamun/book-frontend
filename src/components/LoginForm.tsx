/* eslint-disable  @typescript-eslint/no-misused-promises*/
/* eslint-disable  @typescript-eslint/no-floating-promises*/
/* eslint-disable  @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable  @typescript-eslint/no-unsafe-member-access*/

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useSignInMutation } from "../redux/features/user/usersApi";
import { setUser } from "../redux/features/user/userSlice";
import { FaBook } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [signIn, { isSuccess, data }] = useSignInMutation();

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    signIn(formData);
  };

  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      navigate("/");
    }
  }, [isSuccess, navigate, user.accessToken, dispatch, data.data]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your email"
                  {...register("email")}
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
                  type="password"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>
              {/* {isLoading ? (
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
              )} */}
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
              >
                Login
              </button>
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
