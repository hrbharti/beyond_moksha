"use client"

import React from "react";
import Image from "next/image";
import banner1 from "../../../../../public/banner1.png";
import banner2 from "../../../../../public/banner2.jpg";
import banner3 from "../../../../../public/banner3.jpg";
import founder from "../../../../../public/founder.jpeg";
import { useSearchParams } from "next/navigation";

const HeroSection: React.FC = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  const banner = theme === "1"
      ? banner1
      : theme === "2"
      ? banner2
      : banner3;
  return (
    <section className="relative flex flex-col w-full text-[#1F3A4B] font-serif overflow-hidden">
      {/* Banner */}
      <div className="relative w-full h-64 sm:h-72 md:h-96 overflow-hidden">
        <Image
          src={banner}
          alt="Memorial Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Info Section */}
      <div
        className="
          relative bg-white flex flex-col md:flex-row 
          items-start md:items-center justify-between
          px-4 sm:px-8 md:px-16 lg:px-20
          py-10 sm:py-12 md:py-16
          pt-12 sm:pt-14 md:pt-16
        "
      >
        {/* Profile Photo */}
        <div
          className="
            absolute left-1/2 md:left-auto md:right-20 
            -top-16 sm:-top-20 md:-top-28 
            transform -translate-x-1/2 md:translate-x-0 
            w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 
            border-2 border-[#1F3A4B] rounded-2xl sm:rounded-3xl md:rounded-[2rem] 
            overflow-hidden bg-white shadow-lg
          "
        >
          <Image src='/flower.png' alt="Profile" fill className="object-cover" />
        </div>

        {/* Text Info */}
        <div className="w-full md:w-2/3 space-y-2 sm:space-y-3 text-center md:text-left mt-16 sm:mt-20 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 leading-tight">
            Name Surname
          </h1>
          <p className="text-xs sm:text-sm text-[#1F3A4B]/80">DOB — DOD</p>
          <p className="text-sm sm:text-base text-[#1F3A4B]/70">Location</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
