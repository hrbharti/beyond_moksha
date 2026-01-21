"use client";

import React, { useState } from "react";
import GalleryImage from "./Components/GalleryImage";
import bg from "@public/images/grayishBG.jpg";

const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<"all" | "slideshow">("all");

  // You can replace these with your actual image imports or URLs
  const images = [bg, bg, bg, bg, bg, bg, bg, bg, bg];

  return (
    <div id="gallery" className="w-full max-w-6xl mt-24">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950">
        Gallery
      </h1>

      {/* Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setViewMode("all")}
          className={`px-6 py-2 border rounded-md text-sm md:text-base transition-all duration-300 ${
            viewMode === "all"
              ? "bg-[#1F3A4B] text-white border-[#1F3A4B]"
              : "border-[#1F3A4B] text-[#1F3A4B] hover:bg-[#1F3A4B]/10"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setViewMode("slideshow")}
          className={`px-6 py-2 border rounded-md text-sm md:text-base transition-all duration-300 ${
            viewMode === "slideshow"
              ? "bg-[#1F3A4B] text-white border-[#1F3A4B]"
              : "border-[#1F3A4B] text-[#1F3A4B] hover:bg-[#1F3A4B]/10"
          }`}
        >
          Slide Show
        </button>
      </div>

      {/* Gallery Grid or Slide Show */}
      {viewMode === "all" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, i) => (
            <GalleryImage key={i} src={src} alt={`Gallery image ${i + 1}`} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 rounded-lg">
          <p className="text-gray-600 text-lg italic">
            Slideshow view coming soon...
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
