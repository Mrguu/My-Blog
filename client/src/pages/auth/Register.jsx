import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/register`, {
        username,
        email,
        password,
      });
      alert("Registion Complete!");
      navigate("/auth/login");
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#253551] p-3 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-2 md:p-5 rounded-xl bg-gradient-to-r from-[#253551] to-[#646464] gap-10 shadow-2xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-sky-700 text-gradient bg-clip-text text-transparent text-center">
          Register
        </h1>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="p-2 placeholder-sky-900 w-11/12 md:w-[300px] bg-sky-300 rounded-lg outline-none"
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="p-2 placeholder-sky-900 w-11/12 md:w-[300px] bg-sky-300 rounded-lg outline-none"
          type="email"
          placeholder="email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="p-2 placeholder-sky-900 w-11/12 md:w-[300px] bg-sky-300 rounded-lg outline-none"
          type="password"
          placeholder="password"
        />
        <button
          type="submit"
          className="w-11/12 bg-gradient-to-r to-[#253551] from-[#10497c] hover:from-[#253551] hover:to-[#10497c] text-white rounded-lg font-bold text-xl p-2">
          Register
        </button>
        <p className="text-xs text-white text-center">
          Already has an account!
          <Link to="/auth/login" className=" text-blue-900 font-bold">
            Login
          </Link>
        </p>
        {error && (
          <div className="text-red-500 text-xs md:text-sm text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
