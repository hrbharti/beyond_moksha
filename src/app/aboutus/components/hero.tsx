"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="
        relative w-full 
        h-[70vh] sm:h-[80vh] md:h-[90vh] 
        flex items-center justify-center 
        overflow-hidden
      "
    >
      {/* Background Image */}
      <Image
        src={"/banner2.jpg"}
        alt="Beyond Moksha Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 drop-shadow-lg font-lora font-bold">
          Hi we’re Beyond Moksha
        </h1>

        <p className="text-sm sm:text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto px-2">
          Beyond Moksha is a compassionate and professional funeral service provider
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {["Human Care", "Pet Care", "Tribute", "Legacy Vault"].map((label, i) => (
            <button
              key={i}
              className="
                bg-white text-[#1F3A52] font-semibold 
                px-4 sm:px-6 py-2.5 sm:py-3 
                rounded-xl shadow-md 
                hover:bg-[#1F3A52] hover:text-white 
                transition-all duration-300
              "
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
