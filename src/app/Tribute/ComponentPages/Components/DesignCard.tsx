import React from "react";
import Image, { StaticImageData } from "next/image";
import { Heart } from "lucide-react";

interface DesignCardProps {
  imageSrc: StaticImageData;
  tag?: string;
  name: string;
  relation: string;
  dob?: string;
  dod?: string;
  location?: string;
}

const DesignCard: React.FC<DesignCardProps> = ({
  imageSrc,
  tag = "Popular",
  name,
  relation,
  dob = "DOB",
  dod = "DOD",
  location = "Location",
}) => {
  return (
    <div className="w-full max-w-[340px] border border-gray-300 rounded-xl overflow-hidden bg-white">
      {/* Top image section */}
      <div className="relative w-full h-28 md:h-34 bg-gray-100">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 768px) 100vw, 340px"
        />
        <div className="absolute top-2 right-2 bg-white text-[#1F3A4B] text-xs font-medium px-3 py-0.5 rounded-full border border-[#1F3A4B]/30">
          {tag}
        </div>

        {/* Circular photo placeholder */}
        <div className="absolute -bottom-6 left-5 w-14 h-14 rounded-3xl border border-[#1F3A4B]/40 bg-white"></div>
      </div>

      {/* Bottom content */}
      <div className="pt-8 pb-5 px-5">
        <div className="flex flex-col items-start">
          <h3 className="text-[#1F3A4B] font-medium text-[14px]">{name}</h3>
          <p className="text-xs text-[#1F3A4B]/80 mt-0.5">
            Relation (ex: {relation})
          </p>
          <p className="text-xs text-[#1F3A4B]/80 mt-0.5">
            {dob} — {dod}
          </p>
          <p className="text-xs text-[#1F3A4B]/80 mt-0.5">{location}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <Heart
            size={20}
            className="text-[#1F3A4B] cursor-pointer hover:fill-[#D4A043] hover:text-[#D4A043] transition"
          />
          <button className="bg-gradient-to-b from-[#e1a935] to-[#c19232] text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-[#C18E33] transition">
            View Memorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
