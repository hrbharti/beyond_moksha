"use client";

import React from "react";
import PetHero from "./PetHero";
import PetMemorial from "../../(routes)/furry-memorial/components/PetMemorial";
import Gallery from "../Gallery";
import PetMemorialWall from "../../(routes)/furry-memorial/components/PetMemorialWall";

interface PetProfileViewProps {
  tribute: any;
  isEditing?: boolean;
  accentColor: string;
  textColor: string;
  onUpdate?: (field: string, value: any) => void;
}

const PetProfileView: React.FC<PetProfileViewProps> = ({
  tribute,
  isEditing = false,
  accentColor,
  textColor,
  onUpdate,
}) => {
  return (
    <div className="flex flex-col w-full">
      <PetHero
        tribute={tribute}
        isEditing={isEditing}
        accentColor={accentColor}
        textColor={textColor}
        onUpdate={onUpdate}
      />

      <div className="flex-1 px-5 md:px-20 lg:px-32 py-10 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-24">
          <PetMemorial
            name={tribute.name}
            bio={tribute.bio}
            dob={tribute.dateOfBirth}
            dod={tribute.dateOfPassing}
            accentColor={accentColor}
            textColor={textColor}
          />

          <Gallery
            images={tribute.galleryImages || []}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdate={(val) => onUpdate?.("galleryImages", val)}
          />

          <PetMemorialWall
            memories={tribute.memories || []}
            name={tribute.name}
            accentColor={accentColor}
            textColor={textColor}
          />
        </div>
      </div>
    </div>
  );
};

export default PetProfileView;
