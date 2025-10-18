"use client"
import React, { useEffect, useState } from 'react'

const images = [
  "https://c4.wallpaperflare.com/wallpaper/880/962/445/one-piece-anime-wallpaper-preview.jpg",
  "https://wallpapers.com/images/hd/naruto-scenery-zgc6bcnorfwy3hxu.jpg",
  "https://m.media-amazon.com/images/M/MV5BODU3ZTA0NTItZjVmOC00ZDc5LWI3MDEtYzA4M2UxZWQ5ODQ5XkEyXkFqcGc@._V1_QL75_UX500_CR0,0,500,281_.jpg",
];

export default function Corousal() {
  const [current, setCurrent] = useState(0);
  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    // @ts-ignore
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className='w-full h-[80vh] relative overflow-hidden'>
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:h-80 md:h-96 relative">
              <img
                src={src}
                alt={`Slide ${index}`}
                className="object-contain w-full"
              />
            </div>
          ))}
        </div>
    </div>
  )
}
