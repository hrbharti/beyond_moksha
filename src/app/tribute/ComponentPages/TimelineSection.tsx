import React from "react";
import TimelineCard from "./Components/TimelineCard";

const timelineData = [
  {
    year: "1973",
    date: "March 16th",
    title: "Marriage",
    description: "Entered a lifelong partnership rooted in family values and togetherness.",
    location: "Location (optional)",
  },
  {
    year: "1980",
    date: "April 12th",
    title: "Career Beginnings",
    description: "Started professional service in the banking sector, known for sincerity and dedication.",
    location: "Delhi, India",
  },
  {
    year: "1995",
    date: "June 8th",
    title: "Family Milestone",
    description: "Blessed with the birth of their first child.",
  },
];

const TimelineSection: React.FC = () => {
  return (
    <div id="timeline" className="w-full bg-white text-[#1F3A4B] py-12 sm:py-16 lg:py-20 font-serif">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 mb-12">
        Timeline
      </h1>

      <div className="flex flex-col gap-10">
        {timelineData.map((item, index) => (
          <TimelineCard
            key={index}
            year={item.year}
            date={item.date}
            title={item.title}
            description={item.description}
            location={item.location}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
