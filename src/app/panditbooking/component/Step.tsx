"use client";

import Image from "next/image";

interface StepItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function StepItem({ icon, title, description }: StepItemProps) {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-[300px] h-full p-6 py-8 rounded-[77px] border border-black bg-white shadow-sm">
      {/* Icon Circle */}
      <div className="w-28 h-28 rounded-full border border-white flex items-center justify-center">
        <Image src={icon} alt={title} width={70} height={70} />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-[#1F3A52]">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
