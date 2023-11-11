import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth/login");
  };
  return (
    <div className="w-full flex justify-between items-center p-4 bg-[#151e2d]">
      <Link
        to="/"
        className="border boreder-white rounded-xl p-1 text-lg md:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-200 to-sky-700 bg-clip-text text-transparent">
        MyBlog
      </Link>
      <div className="flex gap-3 md:gap-10 items-center">
        {!cookies.access_token ? (
          <Link
            className="flex items-center gap-3 bg-gradient-to-r from-[#253551] to-[#10497c] text-gray-300 hover:scale-95 duration-300 p-2 rounded-xl"
            to="/auth/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="md:w-5 w-4 h-4 md:h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <div className="font-bold md:inline-flex hidden">Create Blog</div>
          </Link>
        ) : (
          <Link
            className="flex items-center gap-3 bg-gradient-to-r from-[#253551] to-[#10497c] text-gray-300 hover:scale-95 duration-300 p-2 rounded-xl"
            to="/blog/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="md:w-5 w-4 h-4 md:h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <div className="font-bold md:inline-flex hidden">Create Blog</div>
          </Link>
        )}
        {!cookies.access_token ? (
          <Link
            to="/auth/login"
            className="bg-gradient-to-r from-[#253551] to-[#10497c] text-gray-300 hover:scale-95 duration-300 font-bold p-2 rounded-xl text-xs md:text-lg">
            Login
          </Link>
        ) : (
          <div
            onClick={logout}
            className="bg-gradient-to-r from-[#253551] to-[#10497c] text-gray-300 hover:scale-95 duration-300 font-bold p-2 rounded-xl text-xs md:text-lg cursor-pointer ">
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
