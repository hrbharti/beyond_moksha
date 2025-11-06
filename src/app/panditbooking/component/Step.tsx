"use client";

import { ReactNode } from "react";

interface StepItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function StepItem({ icon, title, description }: StepItemProps) {
  return (
    <div className="flex flex-col items-center text-center w-[220px] p-6 rounded-[77px] border border-gray-300 bg-white shadow-sm">
      
      {/* Icon Circle */}
      <div className="w-28 h-28 rounded-full border border-white flex items-center justify-center">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-[#1F3A52]">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
