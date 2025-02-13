import React, { useEffect, useState } from "react";
import sebImage from "../assets/sunrise.avif";
import Logo from "../assets/plane-removebg-preview.png"; // 

const OutputPage = () => {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const storedItinerary = localStorage.getItem("itinerary");

    if (storedItinerary) {
      try {
        const parsedItinerary = JSON.parse(storedItinerary);
        setItinerary(Array.isArray(parsedItinerary) ? parsedItinerary : parsedItinerary.split("\n"));
      } catch (error) {
        console.error("Error parsing itinerary:", error);
        setItinerary([]);
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${sebImage})` }}
    >
     
      <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-2 rounded-lg">
        <img src={Logo} alt="GOTravel Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-orange-500">GOTravel</span>
      </div>

      
      <div className="mt-8 mb-5 p-6 rounded-lg w-full backdrop-blur-md max-w-2xl bg-white/70 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Your Travel Itinerary</h1>
        {itinerary.length > 0 ? (
          <ul className="list-disc pl-5 text-black">
            {itinerary.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No itinerary available.</p>
        )}
      </div>
    </div>
  );
};

export default OutputPage;
