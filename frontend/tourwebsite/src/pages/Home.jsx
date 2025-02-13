import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Herosection";
import RecentDeals from "../components/RecentDeals";
import "tailwindcss";
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <RecentDeals />
    
    </>
  );
};

export default Home;
