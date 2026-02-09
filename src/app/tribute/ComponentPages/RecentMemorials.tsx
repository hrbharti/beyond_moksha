"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Memorial {
  id: string;
  name: string;
  profileImageUrl: string | null;
  username?: string | null;
}

const RecentMemorials = () => {
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMemorials = async () => {
      try {
        const response = await api.get("/tribute/recent");
        setMemorials(response.data);
      } catch (error) {
        console.error("Error fetching recent memorials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMemorials();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-12 relative shadow-xl border border-[#D4A043]">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A043]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (memorials.length === 0) {
    return null; // Or show a default message/placeholder
  }

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
              {memorials.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Link
                    href={`/tribute/p/${item.username || item.id}`}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className="w-36 h-36 sm:w-44 sm:h-44 relative overflow-hidden bg-gray-200 shadow-md border-4 border-[#D4A043]/20 rounded-2xl transition-transform group-hover:scale-105 duration-300">
                      {item.profileImageUrl ? (
                        <Image
                          src={item.profileImageUrl || "/images/jackson.png"} // Fallback image needed
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full font-sans text-4xl font-bold">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <p className="mt-4 text-[#1F3A4B] text-sm sm:text-base font-medium text-center group-hover:text-[#D4A043] transition-colors">
                      {item.name}
                    </p>
                  </Link>
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
