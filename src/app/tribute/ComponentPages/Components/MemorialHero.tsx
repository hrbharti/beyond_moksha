"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Volume2, VolumeX, Camera } from "lucide-react";
import banner1 from "@public/images/banner1.png";
import banner2 from "@public/images/banner2.jpg";
import banner3 from "@public/images/banner3.jpg";

interface Tribute {
  id: string;
  name: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  location?: string;
  profileImageUrl?: string;
  bannerUrl?: string;
}

interface HeroSectionProps {
  tribute?: Tribute;
  isEditing?: boolean;
  accentColor?: string;
  onUpdate?: (field: keyof Tribute, value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  tribute,
  isEditing = false,
  accentColor = "#D4A043",
  onUpdate,
}) => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");
  const [isAudioVisible, setIsAudioVisible] = useState(true);

  // Fallback banner logic based on theme if no custom banner
  let bannerSrc = banner1;
  if (tribute?.bannerUrl) {
    bannerSrc = tribute.bannerUrl as any; // Assuming string url
  } else if (theme === "2") {
    bannerSrc = banner2;
  } else if (theme === "3") {
    bannerSrc = banner3;
  }

  // Safe date formatting
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const dob = formatDate(tribute?.dateOfBirth);
  const dod = formatDate(tribute?.dateOfDeath);

  if (!tribute) return null;

  const handleDateChange = (type: "dob" | "dod", value: string) => {
    if (onUpdate) {
      onUpdate(type === "dob" ? "dateOfBirth" : "dateOfDeath", value);
    }
  };

  return (
    <section className="relative flex flex-col w-full text-[#1F3A4B] font-serif overflow-hidden group/hero bg-white">
      {/* Banner & Profile Photo Wrapper */}
      <div className="relative w-full">
        <div className="relative w-full h-64 sm:h-72 md:h-96 overflow-hidden">
          {tribute.bannerUrl ? (
            <img
              src={tribute.bannerUrl}
              alt="Memorial Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={bannerSrc}
              alt="Memorial Banner"
              fill
              className="object-cover"
              priority
            />
          )}

          {isEditing && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
              <button
                onClick={() => {
                  alert("Banner updated successfully!");
                }}
                className="flex flex-col items-center text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/70 transition"
              >
                <Camera size={32} />
                <span className="text-sm font-sans mt-1">Change Banner</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Photo - Overlapping Banner */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0
            sm:right-8 md:right-16 lg:right-20 
            -bottom-12 sm:-bottom-20 md:-bottom-28 
            w-28 h-28 sm:w-40 sm:h-40 md:w-64 md:h-64 
            border-[3px] rounded-[2rem] sm:rounded-[2.5rem] 
            overflow-hidden bg-white shadow-xl z-20
          "
          style={{ borderColor: accentColor }}
        >
          {tribute.profileImageUrl ? (
            <img
              src={tribute.profileImageUrl}
              alt={tribute.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 font-bold">
              {tribute.name.charAt(0)}
            </div>
          )}

          {/* Profile Image Edit Overlay */}
          {isEditing && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <button
                onClick={() => {
                  alert("Image updated successfully!");
                }}
                className="flex flex-col items-center text-white"
              >
                <Camera size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Banner Edit Overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
            <button
              onClick={() => {
                alert("Banner updated successfully!");
              }}
              className="flex flex-col items-center text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/70 transition"
            >
              <Camera size={32} />
              <span className="text-sm font-sans mt-1">Change Banner</span>
            </button>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div
        className="
          relative flex flex-col md:flex-row 
          items-center sm:items-end justify-between
          px-4 sm:px-8 md:px-16 lg:px-20
          pt-16 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12
        "
      >
        {/* Text Info */}
        <div className="w-full flex flex-col gap-1 md:gap-2 text-center sm:text-left">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={tribute.name}
                onChange={(e) => onUpdate && onUpdate("name", e.target.value)}
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F3A4B] bg-gray-50 border-b border-gray-300 focus:border-blue-500 outline-none w-full placeholder-gray-400"
                placeholder="Full Name"
              />
              <div className="flex gap-2 items-center justify-center sm:justify-start">
                <div className="flex flex-col">
                  <label className="text-[10px] text-gray-500 font-sans uppercase">
                    Born
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => handleDateChange("dob", e.target.value)}
                    className="text-sm border rounded px-1 py-0.5"
                  />
                </div>
                <span className="text-[#1F3A4B]/80">—</span>
                <div className="flex flex-col">
                  <label className="text-[10px] text-gray-500 font-sans uppercase">
                    Passed
                  </label>
                  <input
                    type="date"
                    value={dod}
                    onChange={(e) => handleDateChange("dod", e.target.value)}
                    className="text-sm border rounded px-1 py-0.5"
                  />
                </div>
              </div>
              <input
                type="text"
                value={tribute.location || ""}
                onChange={(e) =>
                  onUpdate && onUpdate("location", e.target.value)
                }
                className="text-sm sm:text-base text-[#1F3A4B]/70 bg-gray-50 border-b border-gray-300 focus:border-blue-500 outline-none w-full md:w-1/2 placeholder-gray-400"
                placeholder="Location (City, Country)"
              />
            </div>
          ) : (
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl text-[#1F3A4B] font-serif leading-tight">
                {tribute.name}
              </h1>
              <p className="text-base sm:text-lg text-[#1F3A4B]/70 font-sans">
                {tribute.dateOfBirth} — {tribute.dateOfDeath || "Present"}
              </p>
              <p className="text-sm sm:text-base text-[#1F3A4B]/60 font-sans">
                {tribute.location || "Location"}
              </p>
            </div>
          )}
        </div>

        {/* Audio Toggle Controls and Player */}
        <div className="flex flex-row items-center justify-center sm:justify-start gap-4 mt-8 md:mt-0">
          {/* Audio Player */}
          {isAudioVisible && (
            <div className="w-48 sm:w-56 md:w-64 h-10 flex items-center bg-gray-100 rounded-full px-4">
              <audio
                controls
                autoPlay
                className="w-full h-8"
                style={{ accentColor: accentColor } as any}
              >
                <source src="" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAudioVisible}
                onChange={(e) => setIsAudioVisible(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                style={{
                  backgroundColor: isAudioVisible ? accentColor : undefined,
                }}
              ></div>
            </label>
            {isAudioVisible ? (
              <Volume2 size={20} style={{ color: accentColor }} />
            ) : (
              <VolumeX size={20} className="text-[#1F3A4B]/40" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
