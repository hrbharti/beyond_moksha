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
    <section className="w-full max-w-4xl" id="memorial">
      {/* Heading */}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 text-3xl md:text-5xl font-serif mb-8">
        Memorial
      </h1>

      {/* Paragraphs */}
      <div className="space-y-6 text-base leading-relaxed text-gray-800">
        {isEditing ? (
          <textarea
            value={bio || ""}
            onChange={(e) => onBioUpdate && onBioUpdate(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y text-base"
            placeholder="Write a biography for your loved one..."
          />
        ) : bio ? (
          <div className="whitespace-pre-line">{bio}</div>
        ) : (
          <p className="text-gray-500 italic">No biography available.</p>
        )}
      </div>
    </section>
  );
};

export default Memorial;
