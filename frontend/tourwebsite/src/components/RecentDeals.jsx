import React from "react";
import ram from "../assets/ram.webp";
import mathura from "../assets/mathura.png";
import indiagate from "../assets/indiagate.webp";
import bengalur from "../assets/bengalur.jpeg";

const deals = [
  { img: ram, title: "AYODHYA", desc: "The birthplace of Lord Rama and a major pilgrimage site in India." },
  { img: mathura, title: "MATHURA", desc: "Renowned as the birthplace of Lord Krishna, and sacred ghats along the Yamuna River." },
  { img: indiagate, title: "DELHI", desc: "The bustling capital of India, combining rich history, monuments like the Red Fort and India Gate." },
  { img: bengalur, title: "BENGALURU", desc: "Known as the 'Silicon Valley of India,' Bengaluru is a thriving tech hub." }
];

const RecentDeals = () => {
  return (
    <div className="text-center py-10 bg-base-200">
      <h2 className="text-3xl font-bold text-primary mb-10">POPULAR PLACES</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {deals.map((deal, index) => (
          <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <figure>
              <img src={deal.img} alt={deal.title} className="w-full h-40 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title mt-5">{deal.title}</h3>
              <p className="text-base-content/70">{deal.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDeals;
