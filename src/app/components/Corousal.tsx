"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import banner1 from '../../../public/banner1.png'
import banner2 from '../../../public/banner2.jpg'
import banner3 from '../../../public/banner3.jpg'

const images = [
  banner1,
  banner2,
  banner3,
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
            <Image
              src={src}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full"
              fill
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Honouring the Journey with Grace
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
              className="bg-white/90 text-black font-medium px-4 py-2 hover:bg-white transition rounded-md"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
