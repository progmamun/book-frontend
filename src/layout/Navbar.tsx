import { Link } from "react-router-dom";
import { FaBook, FaRegHeart } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { useAppSelector } from "../redux/hook";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/user/userSlice";

export default function Navbar() {
  const { email } = useAppSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookies.remove("token");
  };
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="text-xl">
            Book Catalog <FaBook className="inline-block"></FaBook>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/all-book">All Book</Link>
            </li>
            {email && (
              <li>
                <Link to="/add-new-book">Add New</Link>
              </li>
            )}
            <li>
              <Link to="/my-reading">
                <GiNotebook></GiNotebook>
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                <FaRegHeart></FaRegHeart>
              </Link>
            </li>
          </ul>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1689648803~exp=1689649403~hmac=8221da22c9670528695687067141c28c1883ebdb1aebeb0124806842e22c3328" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Wishlist</a>
              </li>
              <li>
                <a className="justify-between">My Reading</a>
              </li>

              {email && (
                <li className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">
                  {email}
                </li>
              )}
              {email ? (
                <li onClick={handleLogout}>Sign Out</li>
              ) : (
                <>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/login">Log In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
