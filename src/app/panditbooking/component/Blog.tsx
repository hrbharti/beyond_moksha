"use client";

import Image from "next/image";
import BlogCard from "./BlogCard";
import Divider from "@public/svgs/divider.svg";
import Link from "next/link";

const blogs = [
  {
    img: "/images/blogs/satyanarayan_puja.png",
    title: "Satyanarayan Puja 2026: Complete Guide, Muhurat Timing & Benefits",
    desc: "The Satyanarayan Puja remains the most performed Hindu ritual for inviting prosperity. Whether you are celebrating a promotion, a birthday, or a new beginning in 2026, this puja is the ultimate way to seek Lord Vishnu's blessings.",
  },
  {
    img: "/images/blogs/griha_pravesh.png",
    title: "Griha Pravesh Puja 2026: Housewarming Muhurat, Vidhi & Vastu Tips",
    desc: 'Moving into a new home in 2026? A Griha Pravesh Puja is essential to cleanse the space of "Vastu Dosha" and ensure the long-term happiness of your family.',
  },
  {
    img: "/images/blogs/ganesh_chaturthi.png",
    title:
      "Ganesh Chaturthi 2026: Puja Vidhi, Muhurat, Visarjan & Celebration Guide",
    desc: "In 2026, Ganesh Chaturthi falls on Monday, September 14. This 10-day festival is the perfect time to remove obstacles from your life and start fresh.",
  },
  {
    img: "/images/blogs/navagraha_shanti.png",
    title:
      "Navagraha Shanti Puja: Remove Planetary Doshas & Restore Peace in 2026",
    desc: "With significant planetary shifts occurring in 2026, many may feel the effects of Shani Sade Sati or Rahu-Ketu transitions. Navagraha Shanti Puja is the Vedic remedy to balance these celestial energies.",
  },
  {
    img: "/images/blogs/raksha_bandhan.png",
    title:
      "Raksha Bandhan 2026: Muhurat Timing, Rituals & Special Family Pujas",
    desc: "Celebrate the bond of protection on Friday, August 28, 2026. Raksha Bandhan is more than just a ceremony; it is a spiritual commitment between siblings.",
  },
  {
    img: "/images/blogs/vastu_shanti.png",
    title: "Vastu Shanti Puja 2026: Bring Positive Energy to Home & Office",
    desc: "Is your office productivity low? Or is there constant tension at home? The energy of your structure (Vastu) might be the culprit. A Vastu Shanti Puja in 2026 can reset the vibrations of your space.",
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

        <div className="mt-14 flex justify-center">
          <Link
            href="/Blogs"
            className="px-8 py-3 bg-[#D29D39] text-white font-lora font-medium rounded-full shadow-lg hover:bg-[#b88a32] transition-all duration-300 transform hover:scale-105"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
