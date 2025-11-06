"use client";

import Image from "next/image";

interface BlogCardProps {
  img: string;
  title: string;
  desc: string;
}

export default function BlogCard({ img, title, desc }: BlogCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-[330px] hover:shadow-md transition">
      <div className="w-full h-48 rounded-lg overflow-hidden">
        <Image 
          src={img} 
          alt={title} 
          width={400} 
          height={250} 
          className="object-cover w-full h-full" 
        />
      </div>

      <h3 className="mt-4 text-[15px] font-semibold text-[#1F3A52] leading-snug line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {desc}
      </p>

      <button className="mt-4 px-4 py-1.5 text-sm border border-[#D29D39] text-[#D29D39] rounded-md hover:bg-[#D29D39] hover:text-white transition">
        Read more
      </button>
    </div>
  );
}
