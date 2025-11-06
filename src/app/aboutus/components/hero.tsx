"use client";

import React from "react";
import Image from "next/image"; // ✅ Replace with your actual hero image

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={'/banner2.jpg'}
        alt="Beyond Moksha Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
          Hi we’re Beyond Moksha
        </h1>

        <p className="text-base sm:text-lg mb-10 opacity-90 max-w-2xl mx-auto">
          Beyond Moksha is a compassionate and professional funeral service provider
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {["Human Care", "Pet Care", "Tribute", "Legacy Vault"].map((label, i) => (
            <button
              key={i}
              className="bg-white text-[#1F3A52] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[#1F3A52] hover:text-white transition-all duration-300"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
