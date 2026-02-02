"use client";

import React from "react";
import { Heart } from "lucide-react";

interface MemoryCardProps {
  date: string;
  message: string;
  author: string;
  accentColor?: string;
  textColor?: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  date,
  message,
  author,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
}) => {
  return (
    <div
      className="border rounded-md p-6 mb-8 hover:shadow-sm transition-shadow duration-300"
      style={{ borderColor: textColor + "66" }}
    >
      <div className="flex justify-between items-start mb-4">
        <p className="italic text-sm" style={{ color: textColor + "99" }}>
          {date}
        </p>
        <Heart
          className="w-5 h-5 transition-colors cursor-pointer"
          style={
            { "--tw-heart-hover": accentColor, color: textColor + "B3" } as any
          }
        />
      </div>

      <p
        className="leading-relaxed whitespace-pre-line"
        style={{ color: textColor + "E6" }}
      >
        {message}
      </p>

      <p className="text-right font-medium mt-6" style={{ color: accentColor }}>
        : {author}
      </p>
    </div>
  );
};

export default MemoryCard;
