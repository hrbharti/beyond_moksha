"use client";

import Image from "next/image";
import React from "react";
import kitty from "@public/images/kitty.jpg";
import tommy from "@public/images/tommy.jpg";
import Link from "next/link";

interface FurryFriendCardProps {
  name: string;
  dob: string;
  dod: string;
  bgImage: string;
  textColor?: string;
  theme?: string;
  type?: "cat" | "dog";
}

const FurryFriendCard: React.FC<FurryFriendCardProps> = ({
  name,
  dob,
  dod,
  bgImage,
  textColor = "text-[#1F3A4B]",
  theme = "blank",
  type = "cat",
}) => {
  return (
    <Link
      href={`/tribute/furry-memorial?theme=${theme}`}
      className={`relative w-full h-[500px] max-w-xs sm:max-w-sm md:max-w-md 
        rounded-sm overflow-hidden border border-gray-200 shadow-sm transition-transform 
        hover:scale-[1.02] duration-300`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 h-full">
        <div
          className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 
          border-4 border-[#1F3A4B]/40 rounded-[2rem] bg-white shadow-md overflow-hidden mb-1 z-20"
        >
          <Image
            src={type === "cat" ? kitty : tommy}
            alt="Pet"
            width={208}
            height={208}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative bg-white rounded-t-[2.5rem] rounded-b-[2.5rem] px-10 py-5 shadow-sm mt-[-1rem] z-10 text-center min-w-[70%]">
          <h3
            className={`font-serif font-bold text-lg sm:text-xl md:text-2xl ${textColor}`}
          >
            {name}
          </h3>
          <p className="text-xs sm:text-sm md:text-base mt-1 font-bold">
            {dob} — {dod}
          </p>
        </div>
        {/* Create Memorial Button */}
        <button className="mt-4 px-6 py-2 bg-white text-[#D4A043] font-medium text-sm rounded-lg border border-[#D4A043] hover:bg-[#D4A043] hover:text-white transition-colors duration-200 shadow-sm">
          Create Memorial
        </button>
      </div>
    </Link>
  );
};

export default FurryFriendCard;
