import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import teagardenImage from "../assets/Darjeeling-1.jpg";
import Logo from "../assets/plane-removebg-preview.png";
import { Loader2 } from "lucide-react";

const ItineraryPlanner = () => {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateSchedule = async () => {
    if (!location || !days) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      localStorage.setItem("location", location);
      localStorage.setItem("days", days);
      
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/generate-itinerary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, days }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
      } else {
        const data = await response.json();
        localStorage.setItem("itinerary", JSON.stringify(data.itinerary)); 
        navigate("/itinerary-output");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${teagardenImage})` }}
    >
      <div className="absolute top-5 left-5 flex items-center gap-2  px-3 py-2 rounded-lg ">
        <img src={Logo} alt="GOTravel Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-orange-500">GOTravel</span>
      </div>

      <div className="p-8 w-[400px] rounded-2xl backdrop-blur-md bg-white/40 shadow-2xl border border-white/30">
        <h1 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-md">
          Plan Your Perfect Trip
        </h1>

        <form className="space-y-6">
          <div className="space-y-3">
            <label className="block text-lg font-medium text-white text-center">
              Destination:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter a location"
              required
              className="w-full p-3 border border-gray-200 rounded-xl bg-white/60 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-medium text-white text-center">
              Number of Days:
            </label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
              placeholder="Enter days"
              required
              className="w-full p-3 border border-gray-200 rounded-xl bg-white/60 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          <button
            type="button"
            onClick={generateSchedule}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-medium 
                      hover:scale-105 transition-all duration-300 shadow-lg mt-2 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              "Generate Schedule"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
