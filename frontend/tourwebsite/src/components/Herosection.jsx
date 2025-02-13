import React from "react";
import logo from "../assets/finalcocunnet.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative text-center">
      <div className="relative">
        <img
          src={logo}
          alt="Travel Display"
          className="w-full h-auto bg-black "
        />
        <div className="absolute inset-0  bg-opacity-70"></div>
      </div>

      <div className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
        <p className="text-4xl">
          <span className="text-orange-500">SAVE UPTO 50%</span> YOUR
        </p>
        <p className="mt-2 text-4xl">TIME IN PLANNING A TRIP</p>

        <div className="mx-auto flex justify-center max-w-xs items-center gap-x-10 mt-40 ">
  <button
    className="text-center bg-blue-500 text-white font-bold py-2 px-6 rounded-2xl shadow-lg 
               hover:text-xl transition-all duration-300"
    onClick={() => navigate("/signup")}
  >
    Make a Plan
  </button>
</div>

      </div>
    </div>
  );
};

export default HeroSection;
