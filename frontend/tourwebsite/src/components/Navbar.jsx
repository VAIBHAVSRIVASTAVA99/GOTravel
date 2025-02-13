import React from "react";  
import { Link } from "react-router-dom";
import Image from "../assets/plane-removebg-preview.png";

const Navbar = () => {
  return (
    <div className="navbar fixed top-0 w-full z-50  ">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">      
        
        <Link to="/" className="flex items-center gap-2 text-3xl font-bold text-orange-500 transition-all">
          <img src={Image} width={50} height={50} alt="Logo" className="inline-block" />
          <span>GOTravel</span>
        </Link>

        <div className="flex gap-6">
          <Link to="/login" className="text-2xl font-bold text-white hover:text-orange-500 transition-all">Login</Link>
          <Link to="/signup" className="text-2xl font-bold text-white hover:text-orange-500 transition-all">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
