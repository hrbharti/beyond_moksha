"use client";

import Image from "next/image";
import flower from "../../../../public/flower.png"; // your image path

export default function MemorialSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 lg:px-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Text Section */}
        <div className="flex-1 text-left">
          <h2 className="text-[#1F3A4B] text-2xl md:text-3xl font-semibold mb-4 leading-snug">
            Honor your loved ones with a personal online memorial
          </h2>

          <p className="text-[#D4A043] italic text-lg md:text-xl mb-6">
            In just 5 minutes, set up a tribute page to share life stories,
            photos, videos, and write an obituary.
          </p>

          <p className="text-[#1F3A4B] text-base md:text-lg mb-6 leading-relaxed">
            Family and friends can join in by sharing memories, posting
            condolences, and confirming attendance to ceremonies. You can also
            add a family tree and set reminders for birthdays and death
            anniversaries.
          </p>

          <p className="text-[#1F3A4B] text-base md:text-lg mb-8 leading-relaxed">
            The service is affordable at <span className="font-semibold">₹450</span> per month or a
            one-time fee of <span className="font-semibold">₹3,200</span> to keep your loved one’s
            memories safe and easily accessible.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button className="bg-[#D4A043] text-white font-medium px-6 py-3 rounded-md hover:bg-[#C18E33] transition">
              Create memorial
            </button>
            <a
              href="#"
              className="text-[#D4A043] font-medium hover:underline inline-block"
            >
              Explore all Designs →
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center">
          <Image
            src={flower}
            alt="Flower wreath"
            className="w-[320px] md:w-[400px] lg:w-[480px] object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
