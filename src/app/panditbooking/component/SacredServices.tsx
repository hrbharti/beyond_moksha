"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const services = [
  {
    title: "Bhagwat Katha",
    desc: "शाश्वत ज्ञान और आध्यात्मिक शांति का अनुभव। परिवार और समुदाय के लिए।",
    img: "/images/bhagwatkatha.png",
  },
  {
    title: "Diwali Pooja",
    desc: "समृद्धि और शुभ शुरुआत हेतु। घर और कार्यस्थल के लिए।",
    img: "/images/diwalipooja.jpg",
  },
  {
    title: "Marriage Ceremony",
    desc: "जीवन की नई शुरुआत। विधिपूर्ण और गरिमामय आयोजन।",
    img: "/images/marriage.jpg",
  },
  {
    title: "Office Pooja",
    desc: "कार्यस्थल के लिए शुभ आरंभ। सकारात्मक ऊर्जा और स्थिरता हेतु।",
    img: "/images/officepooja.jpg",
  },
  {
    title: "Antyesti & Shradh",
    desc: "दिवंगत आत्मा की शांति और सम्मानपूर्ण विदाई हेतु। विधिपूर्ण और गरिमामय संस्कार।",
    img: "/images/antyestishradh.png",
  },
  {
    title: "Akhand Ramayan Path",
    desc: "निरंतर रामायण पाठ से शांति और सकारात्मक ऊर्जा। घर और समुदाय के लिए शुभ आयोजन।",
    img: "/images/akhandramayan.png",
  },
  {
    title: "Maha Yagya",
    desc: "सामूहिक हवन और विशेष अनुष्ठान। बड़े धार्मिक अवसरों हेतु आयोजन।",
    img: "/images/mahayagya.png",
  },
  {
    title: "Mundan Sanskar",
    desc: "शिशु के प्रथम संस्कार हेतु। शुभ और विधिपूर्ण आयोजन।",
    img: "/images/mundansanskar.png",
  },
];

export default function SacredServices() {
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll ? services : services.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-white mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1F3A52] font-lora font-normal">
          Our Sacred Services
        </h2>

        {/* Decorative divider */}
        <div className="flex justify-center mt-3">
          <Image
            src="/svgs/divider.svg"
            alt="Divider"
            width={664}
            height={50}
          />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Comprehensive spiritual solutions for every occasion
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 mt-10 md:mt-14 place-items-center gap-x-6 md:gap-x-[4.75rem]">
          {visibleServices.map((s, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition w-full max-w-[540px]"
            >
              {/* Image */}
              <div className="w-full md:w-[250px] h-48 md:h-[210px] rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={s.img}
                  alt={s.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>

              {/* Content */}
              <div className="mt-4 md:mt-0 md:ml-4 text-left flex flex-col justify-between p-2 md:p-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#1F3A52]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mt-1">
                    {s.desc}
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold text-[#1F3A52]">Price:</span>{" "}
                    <span className="text-[#D29D39]">Price on Request</span>
                  </p>
                </div>

                <button className="mt-3 inline-block px-4 py-1.5 border border-[#D29D39] text-[#D29D39] rounded-md text-sm hover:bg-[#D29D39] hover:text-white transition self-start">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        {services.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-10 text-[#D29D39] font-medium hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            {showAll ? "View less" : "View more"}
            <span
              className={`text-lg flex items-center justify-center transition-transform ${showAll ? "rotate-180" : ""}`}
            >
              <FaChevronDown size={15} />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
