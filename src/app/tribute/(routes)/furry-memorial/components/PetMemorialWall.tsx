"use client";

import React from "react";
import MemoryCard from "./MemoryCard";

interface PetMemory {
  date: string;
  message: string;
  author: string;
}

interface PetMemorialWallProps {
  memories: PetMemory[];
  name: string;
  accentColor?: string;
  textColor?: string;
}

const MemoryWall: React.FC<PetMemorialWallProps> = ({
  memories = [],
  name,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
}) => {
  return (
    <div
      id="memory-wall"
      className="w-full max-w-5xl mt-24"
      style={{ color: textColor }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-serif mb-8 sm:mb-12 pb-4 inline-block border-b-2 text-black"
            style={{ borderColor: accentColor }}
          >
            Memory Wall
          </h1>
          <p className="text-gray-700 italic mb-2">
            &quot;Some souls walk with us for a short while, but their love
            stays forever.&quot;
          </p>
          <p className="text-gray-700">
            Please share your photos and memories of {name}.
          </p>
        </div>

        <button
          className="self-start md:self-auto text-white px-6 py-3 rounded-md font-medium shadow-md hover:opacity-90 transition-all"
          style={{
            background: `linear-gradient(to right, ${accentColor}, #C28A22)`,
          }}
        >
          Contribute →
        </button>
      </div>

      {/* Memory Cards */}
      <div>
        {memories?.length > 0 ? (
          memories.map((memory, index) => (
            <MemoryCard
              key={index}
              date={memory.date}
              message={memory.message}
              author={memory.author}
            />
          ))
        ) : (
          <p className="text-gray-500 italic text-center py-20">
            No memories shared yet. Be the first to share a memory of {name}.
          </p>
        )}
      </div>
    </div>
  );
};

export default MemoryWall;
