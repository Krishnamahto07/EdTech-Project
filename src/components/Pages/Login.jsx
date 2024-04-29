import { useDispatch } from "react-redux";
// import "./login.css"
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../../services/operations/authApi"
import { BsQuestionCircle } from "react-icons/bs";

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
    <div className="flex flex-col items-center justify-center mt-10 md:w-full w-2/3 mx-auto">
      <h1 className="text-3xl font-bold text-richblack-5">Login</h1>
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md mt-5">
            Login
          </button>
          <Link to="/forgot-password">
              <p className="mt-4 bg-richblack-800 px-4 py-2 rounded text-richblack-200 flex gap-2 justify-center items-center">Forgot Password <BsQuestionCircle /></p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;


