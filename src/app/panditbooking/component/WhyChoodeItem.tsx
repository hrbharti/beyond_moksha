"use client";

import Image from "next/image";

interface WhyChooseItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function WhyChooseItem({ icon, title, description }: WhyChooseItemProps) {
  return (
    <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition w-full max-w-[600px]">

      {/* Icon Container */}
      <div className="w-20 h-20 rounded-lg flex items-center justify-center">
        <Image
          src={icon}
          alt={title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Text */}
      <div className="flex items-start flex-col">
        <h3 className="text-lg font-semibold text-[#1F3A52]">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
