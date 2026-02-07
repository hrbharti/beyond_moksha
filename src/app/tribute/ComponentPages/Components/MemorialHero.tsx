"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Volume2, VolumeX, Camera, Loader2 } from "lucide-react";
import api from "@/lib/api/api";
import { toast } from "sonner";
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
  playAudio?: boolean;
}

interface HeroSectionProps {
  tribute?: Tribute;
  isEditing?: boolean;
  accentColor?: string;
  textColor?: string;
  onUpdate?: (field: keyof Tribute, value: any) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  tribute,
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdate,
}) => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");
  const [isAudioVisible, setIsAudioVisible] = useState(
    tribute?.playAudio ?? true,
  );
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const bannerInputRef = React.useRef<HTMLInputElement>(null);
  const profileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "banner" | "avatar",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      if (type === "banner") setIsUploadingBanner(true);
      else setIsUploadingProfile(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url } = response.data;

      if (onUpdate) {
        if (type === "banner") onUpdate("bannerUrl", url);
        else onUpdate("profileImageUrl", url);
      }

      toast.success(
        `${type === "banner" ? "Banner" : "Profile image"} updated successfully`,
      );
    } catch (error) {
      console.error("Upload failed", error);
      toast.error(
        `Failed to upload ${type === "banner" ? "banner" : "profile image"}`,
      );
    } finally {
      if (type === "banner") setIsUploadingBanner(false);
      else setIsUploadingProfile(false);
      // Reset input
      e.target.value = "";
    }
  };

  // Fallback banner logic based on theme if no custom banner
  let bannerSrc = banner1;
  if (tribute?.bannerUrl) {
    bannerSrc = tribute.bannerUrl as any; // Assuming string url
  } else if (theme === "2") {
    bannerSrc = banner2;
  } else if (theme === "3") {
    bannerSrc = banner3;
  }

  // Format for <input type="date"> (YYYY-MM-DD)
  const toInputDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const dobValue = toInputDate(tribute?.dateOfBirth);
  const dodValue = toInputDate(tribute?.dateOfDeath);

  if (!tribute) return null;

  const handleDateChange = (type: "dob" | "dod", value: string) => {
    if (type === "dod" && tribute.dateOfBirth) {
      const dobDate = new Date(tribute.dateOfBirth);
      const dodDate = new Date(value);
      if (dodDate < dobDate) {
        toast.error("Date of death cannot be before date of birth");
        return;
      }
    }
    if (type === "dob" && tribute.dateOfDeath) {
      const dobDate = new Date(value);
      const dodDate = new Date(tribute.dateOfDeath);
      if (dobDate > dodDate) {
        toast.error("Date of birth cannot be after date of death");
        return;
      }
    }

    if (onUpdate) {
      onUpdate(type === "dob" ? "dateOfBirth" : "dateOfDeath", value);
    }
  };

  return (
    <section
      className="relative flex flex-col w-full font-serif overflow-hidden group/hero bg-white"
      style={{ color: textColor }}
    >
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

          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
            <button
              onClick={() => bannerInputRef.current?.click()}
              disabled={isUploadingBanner}
              className="flex flex-col items-center text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/70 transition"
            >
              {isUploadingBanner ? (
                <Loader2 size={32} className="animate-spin" />
              ) : (
                <Camera size={32} />
              )}
              <span className="text-sm font-sans mt-1">
                {isUploadingBanner ? "Uploading..." : "Change Banner"}
              </span>
            </button>
          </div>
          <input
            type="file"
            ref={bannerInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileSelect(e, "banner")}
          />
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

          {isEditing && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-[2rem] sm:rounded-[2.5rem]">
              <button
                onClick={() => profileInputRef.current?.click()}
                disabled={isUploadingProfile}
                className="flex flex-col items-center text-white"
              >
                {isUploadingProfile ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <Camera size={24} />
                )}
              </button>
            </div>
          )}
          <input
            type="file"
            ref={profileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileSelect(e, "avatar")}
          />
        </div>

        {isEditing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10 pointer-events-none">
            {/* This overlay seems redundant with the one above, but if it was intended to catch clicks outside the inner div, we should handle it carefully. 
                 Given the previous structure, I'll make it trigger the same banner input but ensure it doesn't block the profile photo.
                 Actually, simpler to remove the redundancy or just hook it up. I'll hook it up.
                 Adding pointer-events-none to the container to let clicks pass through to profile, BUT buttons need pointer-events-auto.
             */}
            <button
              onClick={() => bannerInputRef.current?.click()}
              disabled={isUploadingBanner}
              className="flex flex-col items-center text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/70 transition pointer-events-auto"
            >
              {isUploadingBanner ? (
                <Loader2 size={32} className="animate-spin" />
              ) : (
                <Camera size={32} />
              )}
              <span className="text-sm font-sans mt-1">
                {isUploadingBanner ? "Uploading..." : "Change Banner"}
              </span>
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
                className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gray-50 border-b border-gray-300 focus:border-blue-500 outline-none w-full placeholder-gray-400"
                style={{ color: textColor }}
                placeholder="Full Name"
              />
              <div className="flex gap-2 items-center justify-center sm:justify-start">
                <div className="flex flex-col">
                  <label className="text-[10px] text-gray-500 font-sans uppercase">
                    Born
                  </label>
                  <input
                    type="date"
                    value={dobValue}
                    onChange={(e) => handleDateChange("dob", e.target.value)}
                    className="text-sm border rounded px-1 py-0.5"
                  />
                </div>
                <span style={{ color: textColor }}>—</span>
                <div className="flex flex-col">
                  <label className="text-[10px] text-gray-500 font-sans uppercase">
                    Passed
                  </label>
                  <input
                    type="date"
                    value={dodValue}
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
                className="text-sm sm:text-base bg-gray-50 border-b border-gray-300 focus:border-blue-500 outline-none w-full md:w-1/2 placeholder-gray-400"
                style={{ color: textColor + "B3" }} // 70% opacity
                placeholder="Location (City, Country)"
              />
            </div>
          ) : (
            <div className="space-y-1 sm:space-y-2">
              <h1
                className="text-3xl sm:text-5xl md:text-6xl font-serif leading-tight"
                style={{ color: textColor }}
              >
                {tribute.name}
              </h1>
              <p
                className="text-base sm:text-lg font-sans"
                style={{ color: textColor + "B3" }}
              >
                {tribute.dateOfBirth} — {tribute.dateOfDeath || "Present"}
              </p>
              <p
                className="text-sm sm:text-base font-sans"
                style={{ color: textColor + "99" }}
              >
                {tribute.location || "Location"}
              </p>
            </div>
          )}
        </div>

        {/* Audio Toggle Controls and Player */}
        {(isEditing || tribute.playAudio) && (
          <div className="flex flex-row items-center justify-center sm:justify-start gap-4 mt-8 md:mt-0">
            {/* Audio Player */}
            {isAudioVisible && (
              <div className="w-48 sm:w-56 md:w-64 h-10 flex items-center bg-gray-100 rounded-full px-4">
                <audio
                  controls
                  autoPlay
                  loop
                  className="w-full h-8"
                  style={{ accentColor: accentColor } as any}
                >
                  <source src="/audios/audio1.webm" type="audio/webm" />
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
                  onChange={(e) => {
                    const val = e.target.checked;
                    setIsAudioVisible(val);
                    if (isEditing && onUpdate) {
                      onUpdate("playAudio", val);
                    }
                  }}
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
                <VolumeX size={20} style={{ color: textColor + "66" }} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
