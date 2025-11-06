import React from "react";
import Image from "next/image";

interface FamilyCardProps {
  name: string;
  image?: string;
}

const FamilyCard: React.FC<FamilyCardProps> = ({ name, image }) => {
  return (
    <div className="flex flex-col items-center text-center border border-[#1F3A4B]/30 rounded-sm p-4 bg-white shadow-sm w-40 sm:w-56">
      <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="bg-gray-300 w-full h-full" />
        )}
      </div>
      <p className="mt-3 text-sm sm:text-base font-medium text-[#1F3A4B]">
        {name}
      </p>
    </div>
  );
};

export default FamilyCard;
