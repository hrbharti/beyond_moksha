"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Loader2, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api/api";
import banner1 from "@public/images/banner1.png";

interface PetHeroProps {
  tribute: {
    id: string;
    name: string;
    dateOfBirth: string;
    dateOfDeath?: string;
    profileImageUrl?: string;
    bannerUrl?: string;
    playAudio?: boolean;
    location?: string;
  };
  isEditing?: boolean;
  accentColor?: string;
  textColor?: string;
  onUpdate?: (field: string, value: any) => void;
}

const PetHero: React.FC<PetHeroProps> = ({
  tribute,
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdate,
}) => {
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

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
      e.target.value = "";
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center">
      {/* Banner Section */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden group">
        {tribute.bannerUrl ? (
          <Image
            src={tribute.bannerUrl}
            alt="Pet Memorial Banner"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={banner1}
            alt="Pet Memorial Banner"
            fill
            className="object-cover"
            priority
          />
        )}

        {isEditing && (
          <div
            onClick={() => bannerInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-30"
          >
            <div className="flex flex-col items-center gap-2 text-white">
              {isUploadingBanner ? (
                <Loader2 className="w-10 h-10 animate-spin" />
              ) : (
                <>
                  <Camera className="w-10 h-10" />
                  <span className="text-lg font-medium">Change Banner</span>
                </>
              )}
            </div>
          </div>
        )}
        <input
          type="file"
          ref={bannerInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileSelect(e, "banner")}
        />
      </div>

      {/* Profile & Info Section */}
      <div className="relative -mt-24 md:-mt-32 w-full max-w-4xl px-4 flex flex-col items-center z-40">
        {/* Circular Profile Image */}
        <div
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-[8px] border-white shadow-2xl overflow-hidden bg-white"
          style={{ borderColor: "white" }}
        >
          {tribute.profileImageUrl ? (
            <Image
              src={tribute.profileImageUrl}
              alt={tribute.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-4xl text-gray-400 font-bold">
              {tribute.name.charAt(0)}
            </div>
          )}

          {isEditing && (
            <button
              onClick={() => profileInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              disabled={isUploadingProfile}
            >
              {isUploadingProfile ? (
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              ) : (
                <Camera className="w-8 h-8 text-white" />
              )}
            </button>
          )}
        </div>
        <input
          type="file"
          ref={profileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileSelect(e, "avatar")}
        />

        {/* Name & Date Card */}
        <div className="mt-6 bg-white rounded-3xl shadow-xl px-10 py-6 text-center max-w-sm w-full border border-gray-100">
          {isEditing ? (
            <input
              type="text"
              value={tribute.name}
              onChange={(e) => onUpdate?.("name", e.target.value)}
              className="text-2xl md:text-3xl font-serif font-bold text-center w-full focus:outline-none border-b border-gray-200"
              style={{ color: textColor }}
            />
          ) : (
            <h1
              className="text-2xl md:text-4xl font-serif font-bold"
              style={{ color: textColor }}
            >
              {tribute.name}
            </h1>
          )}

          <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 font-medium">
            {isEditing ? (
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  value={
                    tribute.dateOfBirth
                      ? new Date(tribute.dateOfBirth)
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  onChange={(e) => onUpdate?.("dateOfBirth", e.target.value)}
                  className="text-sm border rounded px-1"
                />
                <span>—</span>
                <input
                  type="date"
                  value={
                    tribute.dateOfDeath
                      ? new Date(tribute.dateOfDeath)
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  onChange={(e) => onUpdate?.("dateOfDeath", e.target.value)}
                  className="text-sm border rounded px-1"
                />
              </div>
            ) : (
              <p className="text-sm md:text-lg">
                {tribute.dateOfBirth} — {tribute.dateOfDeath || "Present"}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetHero;
