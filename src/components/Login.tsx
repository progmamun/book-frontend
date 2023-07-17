import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <Link to="/">
              <h1 className="mb-8 text-3xl text-center">Login</h1>
            </Link>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>

            <button
              type="submit"
              className="w-full text-center py-3 rounded text-black bg-green-500 hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link
              className="no-underline border-b border-blue text-blue"
              to="/signup/"
            >
              Sign Up
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
}
