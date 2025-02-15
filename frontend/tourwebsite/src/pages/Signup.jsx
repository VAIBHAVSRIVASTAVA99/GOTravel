import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mountainImage from "../assets/mountain.jpeg";
import Logo from "../assets/plane-removebg-preview.png";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("REACT_APP_BASE_URL/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success("Signup successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/itinerary-planner");
        }, 2500);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="absolute top-5 left-10 flex items-center gap-2">
              <img src={Logo} alt="GOTravel Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-orange-500">GOTravel</span>
            </div>
      <div className="pt-20  min-h-screen grid grid-cols-1 lg:grid-cols-2 rounded-2xl">
        <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </div>

        <div
          className="hidden lg:block bg-cover bg-center rounded-3xl m-2"
          style={{ backgroundImage: `url(${mountainImage})` }}
        ></div>
      </div>
    </>
  );
};

export default Signup;
