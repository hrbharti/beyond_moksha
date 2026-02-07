"use client";

import React from "react";

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
      </div>

      <p
        className="leading-relaxed whitespace-pre-line"
        style={{ color: textColor + "E6" }}
      >
        {message}
      </p>

      <p className="text-right font-medium" style={{ color: accentColor }}>
        : {author}
      </p>
    </div>
  );
};

export default MemoryCard;
