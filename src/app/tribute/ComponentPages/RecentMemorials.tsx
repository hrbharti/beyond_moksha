"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const memorials = [
  { name: "Ram Kumar", image: "/images/recentmemorial-1.jpeg" },
  { name: "Shyam Kumar", image: "/images/recentmemorial-2.jpeg" },
  { name: "Raj Kumar", image: "/images/recentmemorial-3.jpeg" },
  { name: "Suresh Kumar", image: "/images/recentmemorial-4.jpeg" },
  { name: "Mahesh Kumar", image: "/images/recentmemorial-5.jpeg" },
  { name: "Sushant Singh", image: "/images/recentmemorial-6.png" },
  { name: "Ray Stevenson", image: "/images/recentmemorial-7.png" },
];

const RecentMemorials = () => {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-12 relative shadow-xl border border-[#D4A043]">
        <h2 className="text-center text-[#1F3A4B] text-2xl sm:text-3xl font-bold mb-10 font-sans">
          Recent memorial pages
        </h2>

        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {memorials.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 relative overflow-hidden bg-gray-200 shadow-md border-4 border-[#D4A043]/20 rounded-2xl transition-transform hover:scale-105 duration-300">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-6 border-[#D4A043] text-[#D4A043] hover:bg-[#D4A043] hover:text-white" />
            <CarouselNext className="hidden md:flex -right-6 border-[#D4A043] text-[#D4A043] hover:bg-[#D4A043] hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default RecentMemorials;
