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
  onUpdate?: (field: keyof Tribute, value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  tribute,
  isEditing = false,
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
  const dod = tribute?.dateOfDeath
    ? formatDate(tribute.dateOfDeath)
    : "Present";

  if (!tribute) return null;

  const handleDateChange = (type: "dob" | "dod", value: string) => {
    if (onUpdate) {
      onUpdate(type === "dob" ? "dateOfBirth" : "dateOfDeath", value);
    }
  };

  return (
    <section className="relative flex flex-col w-full text-[#1F3A4B] font-serif overflow-hidden group/hero">
      {/* Banner */}
      <div className="relative w-full h-64 sm:h-72 md:h-96 overflow-hidden bg-gray-100">
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

        {/* Banner Edit Overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
            <button
              onClick={() => {
                alert("Banner updated successfully!");
                // Dummy behavior: No actual update
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
          relative bg-white flex flex-col md:flex-row 
          items-start md:items-center justify-between
          px-4 sm:px-8 md:px-16 lg:px-20
          py-10 sm:py-12 md:py-16
          pt-12 sm:pt-14 md:pt-16
        "
      >
        {/* Profile Photo */}
        <div
          className="
            absolute left-1/2 md:left-auto md:right-20 
            -top-16 sm:-top-20 md:-top-28 
            transform -translate-x-1/2 md:translate-x-0 
            w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 
            border-2 border-[#1F3A4B] rounded-2xl sm:rounded-3xl md:rounded-[2rem] 
            overflow-hidden bg-white shadow-lg z-20
          "
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
                  // Dummy behavior
                }}
                className="flex flex-col items-center text-white"
              >
                <Camera size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-0 mt-16 sm:mt-20 md:mt-0">
          <div className="space-y-2 sm:space-y-3 text-center md:text-left w-full md:w-2/3">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={tribute.name}
                  onChange={(e) => onUpdate && onUpdate("name", e.target.value)}
                  className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F3A4B] bg-gray-50 border-b border-gray-300 focus:border-blue-500 outline-none w-full placeholder-gray-400"
                  placeholder="Full Name"
                />
                <div className="flex gap-2 items-center justify-center md:justify-start">
                  <div className="flex flex-col">
                    <label className="text-[10px] text-gray-500 font-sans uppercase">
                      Born
                    </label>
                    <input
                      type="date"
                      value={
                        tribute.dateOfBirth
                          ? new Date(tribute.dateOfBirth)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      } // Simple formatting
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
                      value={
                        tribute.dateOfDeath
                          ? new Date(tribute.dateOfDeath)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
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
              <>
                <h1 className="text-2xl sm:text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 leading-tight">
                  {tribute.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#1F3A4B]/80">
                  {dob} — {dod}
                </p>
                <p className="text-sm sm:text-base text-[#1F3A4B]/70">
                  {tribute.location || "Location not specified"}
                </p>
              </>
            )}
          </div>

          {/* Audio Toggle Controls and Player */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 w-full md:w-auto mt-16">
            {/* Audio Player */}
            <div className="w-full md:w-64 h-8">
              {isAudioVisible && (
                <audio
                  controls
                  autoPlay
                  className="w-full accent-[#D4A043] h-8"
                >
                  <source src="" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-end gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAudioVisible}
                  onChange={(e) => setIsAudioVisible(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A043]"></div>
              </label>
              {isAudioVisible ? (
                <Volume2 size={18} className="text-[#D4A043]" />
              ) : (
                <VolumeX size={18} className="text-[#1F3A4B]/40" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
