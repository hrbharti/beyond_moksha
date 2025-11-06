import Image from "next/image"
import React from "react"

export default function BlogCard({ tag, title }: { tag: string, title: string }) {
  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition p-1 w-[13.5rem] h-[18.25rem]">
      <div className="w-full h-1/2 overflow-hidden rounded-md">
        <Image
          src="/blog.jpg"
          alt="Blog image"
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-xs text-white bg-slate-700 inline-block px-4 py-1 mt-3">
        {tag}
      </p>

      <h1 className="text-2xl font-medium text-gray-800 mt-4 leading-tight flex items-center justify-center">
        {title}
      </h1>
    </div>
  )
}
