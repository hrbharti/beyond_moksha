"use client";
import React, { useEffect, useState } from "react";

const images = [
  "https://c4.wallpaperflare.com/wallpaper/880/962/445/one-piece-anime-wallpaper-preview.jpg",
  "https://wallpapers.com/images/hd/naruto-scenery-zgc6bcnorfwy3hxu.jpg",
  "https://m.media-amazon.com/images/M/MV5BODU3ZTA0NTItZjVmOC00ZDc5LWI3MDEtYzA4M2UxZWQ5ODQ5XkEyXkFqcGc@._V1_QL75_UX500_CR0,0,500,281_.jpg",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-[80vh] relative overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-[80vh] relative"
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Honouring Life's Journey with Grace
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg mb-6">
          Managed independently to serve all. Beyond Moksha is here to assist and
          guide you during an already difficult time with the aim of supporting
          you before, during, and after the funeral.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-5 rounded-md w-3/5">
          {[
            "HINDUISM",
            "ISLAM",
            "CHRISTIANITY",
            "JAINISM",
            "SIKHISM",
            "BUDDHISM",
            "ZOROASTRIANISM",
          ].map((label, i) => (
            <button
              key={i}
              className="bg-white/90 text-black font-medium px-4 py-2 hover:bg-white transition"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
