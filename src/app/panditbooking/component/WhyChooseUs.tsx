"use client";

import Image from "next/image";
import WhyChooseItem from "./WhyChoodeItem";
import Divider from "@public/svgs/divider.svg";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1F3A52]">
          Why choose <span className="text-[#D29D39]">Beyond Moksha</span>
        </h2>

        {/* Decorative Divider */}
        <div className="flex justify-center mt-3">
          <Image
            src={Divider}
            alt="Divider"
            className="w-[664px] h-[50px] object-contain"
          />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base">
          Experience peace of mind with our transparent, reliable, and
          expert-led service at every step
        </p>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <WhyChooseItem
            icon="/images/Frame424.png"
            title="Trustworthy & Qualified Pandits"
            description="We ensure experienced Pandits for every occasion, matching your tradition and location."
          />

          <WhyChooseItem
            icon="/images/Frame436.png"
            title="Fast & Convenient Booking"
            description="Book your ritual, muhurat, and samagri— all in just a few easy steps."
          />

          <WhyChooseItem
            icon="/images/Frame437.png"
            title="User-Friendly Platform"
            description="Enjoy a smooth experience for booking pujas anytime, from anywhere in India."
          />

          <WhyChooseItem
            icon="/images/Frame438.png"
            title="Committed Support & Satisfaction"
            description="Our dedicated team guarantees smooth ceremonies and round-the-clock help for families."
          />
        </div>
      </div>
    </section>
  );
}
