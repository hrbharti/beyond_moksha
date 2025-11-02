"use client";
import React, { useState } from "react";
import { Heart, Star, Book, Users } from "@deemlol/next-icons";

export default function ContactUs() {
  const [selected, setSelected] = useState<number>(1);

  const cards = [
    {
      id: 0,
      logo: <Heart size={30} color="#f4ac5a" />,
      price: 1000,
      title: "Gentle Support",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "Every act of kindness matters."
    },
    {
      id: 1,
      logo: <Users size={30} color="#f4ac5a" />,
      price: 5000,
      title: "Compassionate Care",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "Together we are stronger."
    },
    {
      id: 2,
      logo: <Book size={30} color="#f4ac5a" />,
      price: 15000,
      title: "Legacy Guardian",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "A legacy built on compassion."
    },
    {
      id: 3,
      logo: <Star size={30} color="#f4ac5a" />,
      price: 50000,
      title: "Hope Builder",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "Hope shines the brightest."
    },
  ];

  return (
    <div className="border-2 rounded-xl pb-10 px-4 md:px-8 lg:px-16 ">
      {/* Header */}
      <h1 className="text-center font-semibold text-2xl md:text-3xl mt-10 text-[#1a1a1a]">
        Choose How You Want to Help
      </h1>

      {/* Cards */}
      <div className="flex flex-wrap gap-5 justify-center mt-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelected(card.id)}
            className={`cursor-pointer border rounded-xl px-6 py-5 w-52 text-center transition-all duration-300 ${
              selected === card.id
                ? "border-[#f4ac5a] bg-[#fffaf4] shadow-md ring-1 ring-[#f4ac5a]/50 scale-[1.03]"
                : "border-slate-300 hover:border-[#f4ac5a]/60 hover:bg-[#fffaf4]/30"
            }`}
          >
            <div className="mb-2 flex justify-center">{card.logo}</div>
            <p className="text-2xl font-bold text-[#1a1a1a]">₹{card.price}</p>
            <p className="text-sm font-semibold mt-1 text-[#1a1a1a]/90">
              {card.title}
            </p>
            <p className="text-[13px] mt-2 text-slate-600 leading-snug">
              {card.description}
            </p>
            <p className="italic text-[#f4ac5a] text-[13px] mt-2">
              {card.motto}
            </p>
          </div>
        ))}
      </div>

      {/* Custom Amount */}
      <button
        className="border border-slate-400 rounded-md px-6 py-2 mt-10 mx-auto block text-sm font-medium 
        hover:border-[#f4ac5a] hover:text-[#f4ac5a] transition-all duration-300 text-slate-600"
      >
        Custom amount
      </button>

      {/* Form */}
      <form className="max-w-4xl mx-auto mt-8 px-2 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name*
            </label>
            <input
              type="text"
              required
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:border-[#f4ac5a] outline-none transition-all duration-200"
              placeholder="Enter your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              email*
            </label>
            <input
              type="text"
              required
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:border-[#f4ac5a] outline-none transition-all duration-200"
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number*
            </label>
            <input
              type="text"
              required
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:border-[#f4ac5a] outline-none transition-all duration-200"
              placeholder="Enter your Phone Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Message*
            </label>
            <textarea
              // type="text"
              required
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:border-[#f4ac5a] outline-none"
              placeholder="Enter your message"
            />
          </div>
        </div>

        {/* Donation Summary */}
        <div className="bg-[#f4ac5a] text-white text-center rounded-xl py-6 mt-10 shadow-md">
          <p className="text-base font-medium">Your Gift of Compassion</p>
          <p className="text-4xl md:text-5xl font-bold my-2">
            ₹{cards[selected].price.toLocaleString()}
          </p>
          <p className="text-sm md:text-base">
            Honoring life while protecting our earth
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#d89a4f] hover:bg-[#f4ac5a] text-white font-semibold rounded-xl py-3 mt-6 w-full transition-all duration-300"
        >
          Share Your Love Securely
        </button>

        {/* Footer Note */}
        <p className="text-center text-slate-600 text-xs md:text-sm mt-4">
          🔒 Your generosity is protected with secure payment • Tax receipts
          provided • 100% of donations directly serve families
        </p>
      </form>
    </div>
  );
}
