"use client";

import Image from "next/image";

interface WhyChooseItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function WhyChooseItem({ icon, title, description }: WhyChooseItemProps) {
  return (
    <div className="flex  items-center text-center bg-white border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-md transition w-full">

      {/* Icon Container */}
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 ">
        <Image
          src={icon}
          alt={title}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>

      {/* Text */}
      <div className="flex items-start flex-col">
        <h3 className="text-lg font-bold text-[#1F3A52]">{title}</h3>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
