"use client";

import React from "react";
import MemoryCard from "./Components/MemoryCard";

const MemoryWall: React.FC = () => {
  const memories = [
    {
      date: "September 28, 2023",
      message: `In celebration of Shannon’s remarkable life!
Her warmth, humor, and love for adventure made every moment together truly memorable.
She brought laughter and joy to all our lives.

While we'll miss her presence, let's remember the good times and continue to share the laughter and love she gave us.

Cheers to you, Shannon!`,
      author: "XYZ ABC",
    },
    {
      date: "September 28, 2023",
      message: `In celebration of Shannon’s remarkable life!
Her kindness and generosity touched everyone she met.`,
      author: "John Doe",
    },
  ];

  return (
    <section className="w-full max-w-5xl text-[#1F3A4B] mt-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950">
            Memory Wall
          </h1>
          <p className="text-gray-700 italic mb-2">
            &quot;To live in the hearts we leave behind is not to die.&quot;
          </p>
          <p className="text-gray-700">
            Please share your Photos and Memories about Shannon.
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
    </section>
  );
};

export default MemoryWall;
