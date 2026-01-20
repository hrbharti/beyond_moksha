"use client";

import Image from "next/image";
import flower from "../../../../public/flower.png";
import Link from "next/link";

export default function MemorialSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 lg:px-28">
      <div className="max-w-max mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left Text Section */}
        <div className="flex-1 text-left">
          <h2 className="text-[#1F3A4B] text-2xl md:text-5xl font-semibold mb-4 leading-snug">
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

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/tribute/memorial?theme=1"
              className="bg-[#D4A043] text-white font-medium px-6 py-3 rounded-md hover:bg-[#C18E33] transition"
            >
              Create memorial
            </Link>
            <Link
              href="#designs"
              className="text-[#D4A043] font-medium hover:underline inline-block"
            >
              Explore all Designs →
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center">
          <Image
            src={flower}
            alt="Flower wreath"
            className="w-[320px] md:w-[450px] lg:w-[520px] object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
