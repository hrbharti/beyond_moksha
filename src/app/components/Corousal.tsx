"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/banner1.png",
  "/banner2.jpg",
  "/banner3.jpg",
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
    <div
      className="
        w-full 
        h-[50vh] 
        sm:h-[60vh] 
        md:h-[70vh] 
        lg:h-[80vh] 
        relative 
        overflow-hidden
      "
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="
              flex-shrink-0 
              w-full 
              h-[50vh] 
              sm:h-[60vh] 
              md:h-[70vh] 
              lg:h-[80vh] 
              relative
            "
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
      <div
        className="
          absolute inset-0 
          flex flex-col 
          items-center justify-center 
          text-center text-white 
          bg-black/40 
          px-4 sm:px-6
        "
      >
        <h1
          className="
            text-2xl 
            sm:text-3xl 
            md:text-4xl 
            lg:text-5xl 
            mb-4 
            font-lora font-normal
          "
        >
          Honouring the Journey with Grace
        </h1>

        <p
          className="
            max-w-xl 
            text-xs 
            sm:text-sm 
            md:text-base 
            lg:text-lg 
            mb-6
          "
        >
          Managed independently to serve all. Beyond Moksha is here to assist and
          guide you during an already difficult time with the aim of supporting
          you before, during, and after the funeral.
        </p>

        {/* Buttons */}
        <div
          className="
            flex flex-wrap 
            justify-center 
            gap-3 sm:gap-4 
            w-full sm:w-4/5 md:w-3/5 
            px-2
          "
        >
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
              className="
                bg-white/90 
                text-black 
                font-medium 
                px-3 sm:px-4 
                py-1.5 sm:py-2 
                hover:bg-white 
                transition 
                rounded-md 
                text-xs sm:text-sm
              "
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
