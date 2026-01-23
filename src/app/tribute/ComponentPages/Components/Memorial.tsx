"use client";
import React from "react";

interface MemorialProps {
  bio?: string;
  isEditing?: boolean;
  onBioUpdate?: (bio: string) => void;
}

const Memorial: React.FC<MemorialProps> = ({
  bio,
  isEditing = false,
  onBioUpdate,
}) => {
  return (
    <section className="w-full max-w-5xl px-4 sm:px-0" id="memorial">
      <h1 className="text-[#1F3A4B] text-3xl sm:text-4xl md:text-5xl font-serif mb-6 sm:mb-10 border-b-2 border-[#D4A043] pb-4 inline-block">
        Memorial
      </h1>

      {/* Paragraphs */}
      <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#1F3A4B]/80 font-serif italic">
        {isEditing ? (
          <textarea
            value={bio || ""}
            onChange={(e) => onBioUpdate && onBioUpdate(e.target.value)}
            className="w-full h-80 p-4 sm:p-6 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4A043] focus:border-transparent outline-none resize-y text-base sm:text-lg"
            placeholder="Write a biography for your loved one..."
          />
        ) : bio ? (
          <div className="whitespace-pre-line bg-white/50 p-6 sm:p-8 rounded-2xl border-l-4 border-[#D4A043] shadow-sm">
            {bio}
          </div>
        ) : (
          <p className="text-gray-500 italic">No biography available.</p>
        )}
      </div>
    </section>
  );
};

export default Memorial;
