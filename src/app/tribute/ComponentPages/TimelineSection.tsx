import React from "react";
import TimelineCard from "./Components/TimelineCard";

export interface TimelineItem {
  year: string;
  date: string;
  title: string;
  description: string;
  location?: string;
}

interface TimelineSectionProps {
  items?: TimelineItem[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div
      id="timeline"
      className="w-full bg-white text-[#1F3A4B] py-12 sm:py-16 lg:py-20 font-serif"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 mb-12">
        Timeline
      </h1>

      <div className="flex flex-col gap-10">
        {items.map((item, index) => (
          <TimelineCard
            key={index}
            year={item.year}
            date={item.date}
            title={item.title}
            description={item.description}
            location={item.location}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
