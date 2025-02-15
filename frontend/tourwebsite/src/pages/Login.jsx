import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import beachImage from "../assets/beach.jpg";
import Logo from "../assets/plane-removebg-preview.png"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`{process.env.REACT_BASE_URL}/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/itinerary-planner");
      }, 2500);
    } catch (err) {
      toast.error(err.message || "Login failed!", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="absolute top-5 left-5 flex items-center gap-2">
        <img src={Logo} alt="GOTravel Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-orange-500">GOTravel</span>
      </div>

      <div className="pt-20 min-h-screen grid grid-cols-1 lg:grid-cols-2 rounded-2xl">
        
        <div
          className="hidden lg:block bg-cover bg-center rounded-3xl m-2"
          style={{ backgroundImage: `url(${beachImage})` }}
        ></div>

        <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-xl font-bold text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-control">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-control">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
