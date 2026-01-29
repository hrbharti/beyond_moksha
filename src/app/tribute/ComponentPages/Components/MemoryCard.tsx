"use client";

import React from "react";
import { Heart } from "lucide-react";

interface MemoryCardProps {
  date: string;
  message: string;
  author: string;
  accentColor?: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  date,
  message,
  author,
  accentColor = "#D4A043",
}) => {
  return (
    <div className="border border-[#1F3A4B] rounded-md p-6 mb-8 hover:shadow-sm transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <p className="italic text-gray-600 text-sm">{date}</p>
        <Heart
          className="w-5 h-5 text-gray-700 transition-colors cursor-pointer"
          style={{ "--tw-heart-hover": accentColor } as any}
        />
      </div>

      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {message}
      </p>

      <p className="text-right font-medium mt-6" style={{ color: accentColor }}>
        : {author}
      </p>
    </div>
  );
};

export default MemoryCard;
