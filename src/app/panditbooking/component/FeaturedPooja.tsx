"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

const services = [
  {
    title: "जन्मोत्सव पूजा",
    desc: "संतान सुख और शुभ अवसर पर पूजा कराएं। पारिवारिक आनंद और मंगल कामना हेतु।",
    img: "/images/featuredPooja3.png",
  },
  {
    title: "सत्यनारायण पूजा",
    desc: "सुख, शांति और समृद्धि हेतु पूजा कराएं। पारिवारिक कल्याण और मनोकामना पूर्ति के लिए।",
    img: "/images/featuredPooja2.png",
  },
  {
    title: "भूमि पूजन एवं शिला स्थापना",
    desc: "निर्माण से पूर्व शुभ शुरुआत हेतु पूजा कराएं। सुरक्षा, स्थायित्व और कार्य सफलता के लिए।",
    img: "/images/featuredPooja1.png",
  },
  {
    title: "नवग्रह शांति पूजा",
    desc: "ग्रह दोष शांति और जीवन संतुलन हेतु पूजा कराएं। बाधा निवारण और सकारात्मक परिणामों के लिए।",
    img: "/images/navgrah.png",
  },
  {
    title: "रुद्राभिषेक पूजा",
    desc: "शिव कृपा और मानसिक शांति हेतु रुद्राभिषेक कराएं। स्वास्थ्य लाभ और जीवन बाधा निवारण के लिए।",
    img: "/images/rudrabhishek.png",
  },
  {
    title: "सुंदरकांड पाठ",
    desc: "संकट और भय से मुक्ति हेतु सुंदरकांड पाठ कराएं। आत्मबल और सकारात्मक ऊर्जा प्राप्त करें।",
    img: "/images/sundarkaand.png",
  },
  {
    title: "महामृत्युंजय जाप",
    desc: "स्वास्थ्य सुरक्षा और दीर्घायु हेतु जाप कराएं। कठिन परिस्थितियों में शांति और संबल के लिए।",
    img: "/images/mahamritunjay.png",
  },
];

export default function FeaturedPoojaServices() {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex < services.length - 3) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const itemWidth = 330;
  const gap = 40; // gap-10 in tailwind is 2.5rem or 40px

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Splash - Moved lower to avoid overlapping header text */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none -z-0 hidden lg:flex justify-center items-end opacity-60 h-[80%]">
        <div className="relative w-full h-full flex justify-center">
          <Image
            src="/images/splash.png"
            alt="color splash"
            width={1600}
            height={800}
            className="object-contain transform scale-125 translate-y-[10%]"
            priority
          />
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl text-[#1F3A52] font-lora font-normal">
          Featured <span className="text-[#D29D39]">Pooja</span> Services
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
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Comprehensive religious services for every occasion. Our expert
          pandits ensure authentic vedic rituals with proper mantras and
          procedures.
        </p>

        {/* Cards */}
        <div className="mt-20 relative flex justify-center items-center group">
          {/* Sidebars (Navigate Buttons) */}
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            disabled={startIndex === 0}
            className={`w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex group/btn ${
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
          <div className="relative z-10 w-full overflow-hidden px-2 py-4">
            <div
              className="flex gap-10 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (itemWidth + gap)}px)`,
              }}
            >
              {services.map((s, i) => (
                <div
                  key={i}
                  className="w-[330px] bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-200 p-5 flex-shrink-0"
                >
                  <div className="w-full h-48 rounded-xl overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={350}
                      height={200}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-[#1F3A52]">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {s.desc}
                  </p>

                  <button className="mt-4 px-5 py-2 border border-[#D29D39] text-[#D29D39] rounded-md hover:bg-[#D29D39] hover:text-white transition-all duration-300 text-sm font-medium">
                    Book Puja
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={startIndex >= services.length - 3}
            className={`w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex group/btn ${
              startIndex >= services.length - 3
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[#D29D39] hover:border-[#D29D39] hover:text-white hover:scale-110 active:scale-95 md:opacity-0 md:group-hover:opacity-100 md:translate-x-2 md:group-hover:translate-x-0"
            }`}
          >
            <ChevronRight
              className={`h-6 w-6 transition-colors ${startIndex >= services.length - 3 ? "text-gray-400" : "text-[#BC911B] group-hover/btn:text-white"}`}
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
              disabled={startIndex >= services.length - 3}
              className={`w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white transition shadow-sm active:scale-90 ${startIndex >= services.length - 3 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
              <ChevronRight
                className={`h-5 w-5 ${startIndex >= services.length - 3 ? "text-gray-400" : "text-[#BC911B]"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
