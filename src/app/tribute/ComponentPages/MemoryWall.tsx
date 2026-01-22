"use client";

import React from "react";
import MemoryCard from "./Components/MemoryCard";

export interface Memory {
  date: string;
  message: string;
  author: string;
}

interface MemoryWallProps {
  memories?: Memory[];
  name?: string; // To replace hardcoded "Radha Devi Sharma"
}

const MemoryWall: React.FC<MemoryWallProps> = ({
  memories = [],
  name = "your loved one",
}) => {
  if (!memories || memories.length === 0) return null;

  return (
    <div id="memory-wall" className="w-full max-w-5xl text-[#1F3A4B] mt-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950">
            Memory Wall
          </h1>
          <p className="text-gray-700 italic mb-2">
            &quot;Those who live in our memories remain forever with us.&quot;
          </p>
          <p className="text-gray-700">
            Please share your photos and memories of {name}.
          </p>
        </div>

        <button className="self-start md:self-auto bg-gradient-to-r from-[#D5A83B] to-[#C28A22] text-white px-6 py-3 rounded-md font-medium shadow-md hover:opacity-90 transition-all">
          Contribute →
        </button>
      </div>

      {/* Memory Cards */}
      <div>
        {memories.map((memory, index) => (
          <MemoryCard
            key={index}
            date={memory.date}
            message={memory.message}
            author={memory.author}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryWall;
