"use client";

import Image from "next/image";
import React from "react";
import kitty from "../../../../../public/kitty.jpg"
import Link from "next/link";

interface FurryFriendCardProps {
  name: string;
  dob: string;
  dod: string;
  bgImage: string;
  textColor?: string;
  theme?: string
}

const FurryFriendCard: React.FC<FurryFriendCardProps> = ({
  name,
  dob,
  dod,
  bgImage,
  textColor = "text-[#1F3A4B]",
  theme = "blank"
}) => {
  return (

    <Link href={`/tribute/furry-memorial?theme=${theme}`}
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
      {/* Image Holder */}
      {/* <Link href={`/tribute/furry-memorial?theme=${theme}`}> */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 
          border-2 border-[#1F3A4B]/40 rounded-2xl bg-white shadow-md overflow-hidden mb-4"
          >
            {/* Placeholder for pet image */}
            <Image
              src={kitty}
              alt="Pet"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name and Dates */}
          <h3
            className={`font-serif font-bold text-lg sm:text-xl md:text-2xl ${textColor}`}
          >
            {name}
          </h3>
          <p className="text-xs sm:text-sm md:text-base mt-1 font-bold">
            {dob} — {dod}
          </p>
        </div>
      {/* </Link> */}
    </Link>
  );
};

export default FurryFriendCard;
