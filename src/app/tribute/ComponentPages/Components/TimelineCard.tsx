import React from "react";

interface TimelineCardProps {
  year: string;
  date: string;
  title: string;
  description?: string;
  location?: string;
  isLast?: boolean; // so we can hide the line on the last card
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  year,
  date,
  title,
  description,
  location,
  isLast,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 relative">
      {/* Left Column - Year & Date */}
      <div className="flex flex-col items-center md:items-start min-w-[5rem]">
        <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 leading-tight">
          {year}
        </h2>
        <p className="text-sm md:text-base text-[#1F3A4B]/70">{date}</p>

        {/* Vertical line */}
        {!isLast && (
          <div className="hidden md:block w-[1px] h-16 bg-[#1F3A4B]/60 mt-2 ml-[0.6rem]"></div>
        )}
      </div>

      {/* Right Column - Content */}
      <div className="relative flex-1 border border-[#1F3A4B]/60 rounded-md p-4 md:p-6 bg-white text-[#1F3A4B] font-serif before:content-[''] before:absolute before:left-[-10px] md:before:left-[-12px] before:top-1/2 before:-translate-y-1/2 before:border-y-[10px] md:before:border-y-[12px] before:border-y-transparent before:border-r-[10px] md:before:border-r-[12px] before:border-r-[#1F3A4B]/60 rounded-r-md">
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm md:text-base text-[#1F3A4B]/80 mt-1">
            {description}
          </p>
        )}
        {location && (
          <p className="text-xs md:text-sm italic text-[#1F3A4B]/60 mt-1">
            {location}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimelineCard;
