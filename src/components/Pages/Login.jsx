import { useDispatch } from "react-redux";
import "./login.css"
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../../services/operations/authApi"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form,setForm] = useState({})

    const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit the form data to your backend
    setForm({email,password})
    console.log("Form Data = ",form);
    dispatch(login(email,password,navigate));

  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleFormSubmit} className="mt-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-5"
        />
        <div className="flex gap-2 items-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-5">
            Login
          </button>
          <Link to="/forgot-password">
              <p className="mt-4 bg-richblack-800 px-2 py-1 rounded text-richblack-200">Forgot Password ?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;


