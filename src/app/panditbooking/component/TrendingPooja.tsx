"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Pooja {
  title: string;
  category: string;
  price: string;
  oldPrice: string;
  discount: string;
  img: string;
}

const poojas: Pooja[] = [
  {
    title: "Griha Pravesh",
    category: "Regular Pooja",
    price: "₹5701/-",
    oldPrice: "₹8001/-",
    discount: "29%",
    img: "/images/trendingpooja4.png",
  },
  {
    title: "Satya Narayan",
    category: "Regular Pooja",
    price: "₹4401/-",
    oldPrice: "₹9100/-",
    discount: "52%",
    img: "/images/trendingpooja3.png",
  },
  {
    title: "Vaastu Shanti",
    category: "Regular Pooja",
    price: "₹5701/-",
    oldPrice: "₹8001/-",
    discount: "29%",
    img: "/images/trendingpooja2.jpg",
  },
  {
    title: "Office Opening Pooja",
    category: "Regular Pooja",
    price: "₹5701/-",
    oldPrice: "₹8001/-",
    discount: "29%",
    img: "/images/trendingpooja1.jpg",
  },
  {
    title: "Ganesh Pooja",
    category: "Regular Pooja",
    price: "₹4501/-",
    oldPrice: "₹6001/-",
    discount: "25%",
    img: "/images/ganeshpooja.png",
  },
  {
    title: "Laxmi Pooja",
    category: "Regular Pooja",
    price: "₹5101/-",
    oldPrice: "₹7501/-",
    discount: "32%",
    img: "/images/laxmipooja.png",
  },
  {
    title: "Shanti Shanti",
    category: "Special Pooja",
    price: "₹11001/-",
    oldPrice: "₹15001/-",
    discount: "26%",
    img: "/images/shanti.png",
  },
];

export default function TrendingPoojas() {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex < poojas.length - 4) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const itemWidth = 240;
  const gap = 32;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl text-[#1F3A52] font-lora font-normal">
          This Months Trending <span className="text-[#D29D39]">Pooja</span>
        </h2>

        {/* Decorative Divider */}
        <div className="flex justify-center mt-3">
          <Image
            src="/svgs/divider.svg"
            alt="Divider"
            width={664}
            height={50}
            className="w-[664px] h-[50px] object-contain"
          />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Book the most sought-after poojas performed by experienced pandits.
          Same-day booking available for most services.
        </p>

        {/* Card List - Carousel */}
        <div className="mt-14 relative flex items-center justify-center px-4 md:px-12 group">
          {/* Left Navigate Button (Sidebar) */}
          <button
            onClick={prevSlide}
            disabled={startIndex === 0}
            className={`w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 absolute left-0 z-20 hidden md:flex group/btn ${
              startIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[#D29D39] hover:border-[#D29D39] hover:text-white hover:scale-110 active:scale-95 md:opacity-0 md:group-hover:opacity-100 md:-translate-x-2 md:group-hover:translate-x-0"
            }`}
          >
            <ChevronLeft
              className={`h-6 w-6 transition-colors ${startIndex === 0 ? "text-gray-400" : "text-[#BC911B] group-hover/btn:text-white"}`}
            />
          </button>

          {/* Carousel Track Container */}
          <div className="w-full overflow-hidden py-6">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (itemWidth + gap)}px)`,
              }}
            >
              {poojas.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 border border-[#979797] h-[20.5625rem] w-[15rem] flex-shrink-0"
                >
                  <div className="w-full h-44 rounded-lg overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-lg mt-3 font-semibold text-[#1F3A52]">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500">{p.category}</p>

                  <div className="mt-3 flex items-center gap-2 justify-center">
                    <span className="text-[17px] font-semibold text-[#1F3A52]">
                      {p.price}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                      {p.oldPrice}
                    </span>
                    <span className="text-sm text-red-500 font-medium">
                      ({p.discount})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigate Button (Sidebar) */}
          <button
            onClick={nextSlide}
            disabled={startIndex >= poojas.length - 4}
            className={`w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 absolute right-0 z-20 hidden md:flex group/btn ${
              startIndex >= poojas.length - 4
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[#D29D39] hover:border-[#D29D39] hover:text-white hover:scale-110 active:scale-95 md:opacity-0 md:group-hover:opacity-100 md:translate-x-2 md:group-hover:translate-x-0"
            }`}
          >
            <ChevronRight
              className={`h-6 w-6 transition-colors ${startIndex >= poojas.length - 4 ? "text-gray-400" : "text-[#BC911B] group-hover/btn:text-white"}`}
            />
          </button>

          {/* Mobile Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8 md:hidden w-full">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className={`w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white transition shadow-sm active:scale-90 ${startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
              <ChevronLeft
                className={`h-5 w-5 ${startIndex === 0 ? "text-gray-400" : "text-[#BC911B]"}`}
              />
            </button>
            <button
              onClick={nextSlide}
              disabled={startIndex >= poojas.length - 4}
              className={`w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white transition shadow-sm active:scale-90 ${startIndex >= poojas.length - 4 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
              <ChevronRight
                className={`h-5 w-5 ${startIndex >= poojas.length - 4 ? "text-gray-400" : "text-[#BC911B]"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
