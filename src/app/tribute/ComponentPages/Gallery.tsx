"use client";

import React, { useState } from "react";
import GalleryImage from "./Components/GalleryImage";
import { Trash2 } from "lucide-react";

interface GalleryProps {
  images?: string[];
  isEditing?: boolean;
  accentColor?: string;
  textColor?: string;
  onUpdate?: (images: string[]) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  images = [],
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdate,
}) => {
  const [viewMode, setViewMode] = useState<"all" | "slideshow">("all");

  const handleRemoveImage = (index: number) => {
    if (!onUpdate) return;
    const newImages = images.filter((_, i) => i !== index);
    onUpdate(newImages);
  };

  if (!isEditing && (!images || images.length === 0)) return null;

  return (
    <div id="gallery" className="w-full max-w-6xl mt-24">
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-serif pb-4 inline-block border-b-2 text-black"
          style={{ borderColor: accentColor }}
        >
          Gallery
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setViewMode("all")}
          className={`px-6 py-2 border rounded-md text-sm md:text-base transition-all duration-300 ${
            viewMode === "all" ? "text-white" : "hover:bg-[#1F3A4B]/10"
          }`}
          style={{
            borderColor: viewMode === "all" ? accentColor : textColor + "66",
            color: viewMode === "all" ? "white" : textColor,
            backgroundColor: viewMode === "all" ? accentColor : "transparent",
          }}
        >
          All
        </button>

        <button
          onClick={() => setViewMode("slideshow")}
          className={`px-6 py-2 border rounded-md text-sm md:text-base transition-all duration-300 ${
            viewMode === "slideshow" ? "text-white" : "hover:bg-[#1F3A4B]/10"
          }`}
          style={{
            borderColor:
              viewMode === "slideshow" ? accentColor : textColor + "66",
            color: viewMode === "slideshow" ? "white" : textColor,
            backgroundColor:
              viewMode === "slideshow" ? accentColor : "transparent",
          }}
        >
          Slide Show
        </button>
      </div>

      {/* Gallery Grid or Slide Show */}
      {viewMode === "all" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, i) => (
            <div key={i} className="relative group/img">
              <GalleryImage src={src} alt={`Gallery image ${i + 1}`} />
              {isEditing && (
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                  title="Remove image"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
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
