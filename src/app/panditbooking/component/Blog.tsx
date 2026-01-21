"use client";

import Image from "next/image";
import BlogCard from "./BlogCard";
import Divider from "@public/svgs/divider.svg";

const blogs = [
  {
    img: "/images/navratri.jpg",
    title:
      "Chaitra Navratri 2025: Celebrate Nine Days of Devotion with Panditjee online",
    desc: "Spring is here, and for me, that means Chaitra Navratri is just around the corner! This nine-day festival is all...",
  },
  {
    img: "/images/mahashivratri.png",
    title:
      "Shivratri 2025: Puja, Importance, Benefits & How to Book a Pandit for Worship",
    desc: "Maha Shivratri is one of the most auspicious festivals dedicated to Lord Shiva, celebrated with great devotion by Hindus across...",
  },
  {
    img: "/images/diwali.jpg",
    title: "Diwali 2024 and Pujas Performed During the Festival of Lights",
    desc: "Diwali, also known as the Festival of Lights, is one of the most significant festivals in India and...",
  },
];

export default function BlogsSection() {
  return (
    <section className="py-20 bg-white mt-14">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl text-[#1F3A52] font-lora font-normal">
          Our <span className="text-[#D29D39]">Blogs</span>
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
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover insightful stories, upcoming fasts, and festival guides
          rooted in Sanatan traditions. Stay connected with the spirit of
          Dharma.
        </p>

        {/* Blog Cards */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-[4.75rem] gap-y-10">
          {blogs.map((b, i) => (
            <BlogCard key={i} img={b.img} title={b.title} desc={b.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}
