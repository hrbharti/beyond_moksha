"use client";

import Image from "next/image";

const memorials = [
  { name: "Ram Kumar", image: "/images/recentmemorial-1.jpeg" },
  { name: "Shyam Kumar", image: "/images/recentmemorial-2.jpeg" },
  { name: "Raj Kumar", image: "/images/recentmemorial-3.jpeg" },
  { name: "Suresh Kumar", image: "/images/recentmemorial-4.jpeg" },
  { name: "Mahesh Kumar", image: "/images/recentmemorial-5.jpeg" },
];

const RecentMemorials = () => {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-12 relative shadow-xl border border-[#D4A043]">
        <h2 className="text-center text-[#1F3A4B] text-2xl sm:text-3xl font-bold mb-10 font-sans">
          Recent memorial pages
        </h2>
        <div className="flex flex-nowrap sm:flex-wrap lg:flex-nowrap items-start justify-between gap-6 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
          {memorials.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-shrink-0 w-36 sm:w-44"
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 relative overflow-hidden bg-gray-200 shadow-md border-4 border-[#D4A043]/20 rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-[#1F3A4B] text-sm sm:text-base font-medium text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentMemorials;
