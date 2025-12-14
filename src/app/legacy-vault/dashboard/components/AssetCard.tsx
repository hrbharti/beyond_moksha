"use client";

import Image from "next/image";
import React from "react";

interface AssetCardProps {
  icon: string,
  label: string,
  color: "green" | "pink" | "purple" | "beige";
}

export default function AssetCard({ icon, label, color }: AssetCardProps) {
  const colorClasses = {
    green: "bg-[#D4F1E8] border-[#A8E6D8]",
    pink: "bg-[#F5D8E8] border-[#EBBDD4]",
    purple: "bg-[#E8D8F5] border-[#DBC1EB]",
    beige: "bg-[#F5EDDA] border-[#EADDBB]",
  };

  return (
    <div
      className={`
        ${colorClasses[color]}
        border-2 rounded-2xl p-6
        flex flex-col items-center justify-center gap-3
        min-h-[140px]
        hover:shadow-md transition duration-200
        cursor-pointer
      `}
    >
      <div className="text-3xl">
        <Image src={icon} alt={label} width={20} height={20} />
      </div>
      <p className="text-center font-medium text-[#1F3A52] text-sm">{label}</p>
    </div>
  );
}
