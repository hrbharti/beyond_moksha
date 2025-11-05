"use client";

import React from "react";
import { Heart } from "lucide-react";

interface MemoryCardProps {
  date: string;
  message: string;
  author: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ date, message, author }) => {
  return (
    <div className="border border-[#1F3A4B] rounded-md p-6 mb-8 hover:shadow-sm transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <p className="italic text-gray-600 text-sm">{date}</p>
        <Heart className="w-5 h-5 text-gray-700 hover:fill-[#1F3A4B] transition-colors cursor-pointer" />
      </div>

      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {message}
      </p>

      <p className="text-right text-[#C28A22] font-medium mt-6">: {author}</p>
    </div>
  );
};

export default MemoryCard;