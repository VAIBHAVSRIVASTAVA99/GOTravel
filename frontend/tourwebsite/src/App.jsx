import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ItineraryPlanner from "./pages/ItineraryPlanner";
import OutputPage from "./pages/OutputPage";
import { Routes, Route } from "react-router-dom";
const App = () => {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/itinerary-planner" element={<ItineraryPlanner />} />
        <Route path="/itinerary-output" element={<OutputPage />} />
      </Routes>

    </>
  );
};

export default App;
