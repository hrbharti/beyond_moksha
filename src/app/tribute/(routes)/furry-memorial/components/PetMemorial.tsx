"use client";

import React from "react";

interface PetMemorialProps {
  name: string;
  bio?: string;
  dob: string;
  dod?: string;
  accentColor?: string;
  textColor?: string;
  isEditing?: boolean;
  onUpdate?: (field: string, value: string) => void;
}

const Memorial: React.FC<PetMemorialProps> = ({
  name,
  bio,
  dob,
  dod,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  isEditing = false,
  onUpdate,
}) => {
  return (
    <section className="w-full max-w-4xl" id="memorial">
      {/* Heading */}
      <h1
        className="text-3xl md:text-5xl font-serif mb-8 pb-4 inline-block border-b-2 text-black"
        style={{ borderColor: accentColor }}
      >
        Memorial
      </h1>

      <div className="mb-8">
        {isEditing ? (
          <div className="space-y-4 mb-6 p-4 border rounded-lg border-dashed border-gray-400 bg-gray-50">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => onUpdate?.("name", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4A043] focus:border-transparent outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => onUpdate?.("dob", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4A043] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Death (Optional)
                </label>
                <input
                  type="text"
                  value={dod || ""}
                  onChange={(e) => onUpdate?.("dod", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4A043] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* Paragraphs */}
        <div
          className="space-y-6 text-base leading-relaxed text-gray-800"
          style={{ color: textColor }}
        >
          {isEditing ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biography
              </label>
              <textarea
                value={bio}
                onChange={(e) => onUpdate?.("bio", e.target.value)}
                rows={8}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4A043] focus:border-transparent outline-none resize-y"
              />
            </div>
          ) : bio ? (
            <div className="whitespace-pre-wrap">{bio}</div>
          ) : (
            <>
              <p>
                {name}, a beloved companion and cherished member of the family.
                Born on {dob}
                {dod ? ` and passed away on ${dod}` : ""}. {name} brought
                unconditional love, comfort, and joy into every moment of our
                lives.
              </p>
              <p>
                From quiet mornings to joyful walks and playful evenings, {name}{" "}
                was always present with loyalty and warmth. {name} had a gentle
                nature, an intuitive understanding of the family, and a way of
                turning ordinary days into special memories.
              </p>
              <p>
                {name} was more than a pet, they were family. Their presence
                filled the home with affection, routine, and a sense of calm
                that will always be remembered.
              </p>
              <p>Om Shanti.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Memorial;
