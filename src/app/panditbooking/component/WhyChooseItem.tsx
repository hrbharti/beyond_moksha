"use client";

import Image from "next/image";

interface WhyChooseItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function WhyChooseItem({
  icon,
  title,
  description,
}: WhyChooseItemProps) {
  return (
    <div className="flex items-center text-left bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition w-full gap-6">
      {/* Icon Container */}
      <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
        <Image
          src={icon}
          alt={title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-[#1F3A52]">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
