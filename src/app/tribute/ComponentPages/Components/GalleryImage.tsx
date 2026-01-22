"use client";

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface GalleryImageProps {
  src: StaticImageData | string;
  alt: string;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ src, alt }) => {
  return (
    <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow duration-300">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

export default GalleryImage;
