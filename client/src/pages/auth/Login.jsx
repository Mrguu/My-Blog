import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [_, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password,
      });
      setCookie("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("invalid username or password! Please try again.");
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-center bg-[#253551] p-3 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-3 md:p-5 rounded-xl bg-gradient-to-r from-[#253551] to-[#646464] gap-10 shadow-2xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-sky-700 text-gradient bg-clip-text text-transparent text-center">
          Login
        </h1>
        <input
          className="p-2 placeholder-sky-900 w-11/12 md:w-[300px] bg-sky-300 rounded-lg outline-none"
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="p-2 placeholder-sky-900 w-11/12 md:w-[300px] bg-sky-300 rounded-lg outline-none"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="w-11/12 bg-gradient-to-r to-[#253551] from-[#10497c] hover:from-[#253551] hover:to-[#10497c] text-white rounded-lg font-bold text-xl p-2">
          Login
        </button>
        <p className="text-xs text-white text-center">
          Don't have an account!
          <Link to="/auth/register" className=" text-blue-900 font-bold">
            Register
          </Link>
        </p>
        {error && (
          <div className="text-red-500 text-xs md:text-sm text-center">
            {error}
          </div>
        )}
      </form>
      <div className="p-3 flex flex-col items-start rounded-xl gap-5 w-5/6 md:w-1/3 bg-gradient-to-r from-[#253551] to-[#646464] shadow-2xl text-white">
        <h1 className="font-bold text-sm md:text-md text-center">
          You can also login with this account
        </h1>
        <div className="text-xs md:text-md">
          email : <span>demo123@gmail.com</span>
        </div>
        <div className="text-xs md:text-md">
          password : <span>123456</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
