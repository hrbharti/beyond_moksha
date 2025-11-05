import React from "react";
import Image, { StaticImageData } from "next/image";

interface PetCardProps {
  imageSrc: StaticImageData;
  name: string;
  dob: string;
  dod: string;
}

const PetCard: React.FC<PetCardProps> = ({ imageSrc, name, dob, dod }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-[220px] h-[220px] md:w-[250px] md:h-[250px] rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          className="object-cover w-full h-full"
          width={250}
          height={250}
        />
      </div>
      <h3 className="text-[#1F3A4B] text-lg md:text-xl font-medium mt-4">
        {name}
      </h3>
      <p className="text-[#1F3A4B]/80 text-sm mt-1">
        {dob} – {dod}
      </p>
    </div>
  );
};

export default PetCard;
