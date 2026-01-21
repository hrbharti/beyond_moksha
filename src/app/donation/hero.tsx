"use client";

import React from "react";

export const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/donationHero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-white">
        <h1 className="text-4xl sm:text-5xl leading-tight mb-6 font-lora font-normal">
          Bringing Comfort in Life&apos;s Hardest Moments
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Your compassion can bring peace to families navigating their most
          profound moments. Together, we&apos;re creating a world where every
          farewell is filled with dignity, love, and respect.
        </p>
        <button className="bg-white text-[#1F3A52] font-semibold px-6 py-3 rounded-full hover:bg-[#1F3A52] hover:text-white transition-all">
          💖 Share Your Compassion
        </button>
      </div>
    </section>
  );
};
