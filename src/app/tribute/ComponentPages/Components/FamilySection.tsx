import React from "react";
import FamilyCard from "./FamilyCard";
import { PlusCircle } from "lucide-react";

export interface FamilyMember {
  name: string;
  imageUrl?: string;
}

interface FamilySectionProps {
  title: string;
  members: FamilyMember[];
  isEditing?: boolean;
  accentColor?: string;
  textColor?: string;
  onUpdateMember?: (
    index: number,
    field: keyof FamilyMember,
    value: string,
  ) => void;
  onAddMember?: () => void;
  onDeleteMember?: (index: number) => void;
  onDeleteSection?: () => void;
  onUpdateTitle?: (newTitle: string) => void;
}

const FamilySection: React.FC<FamilySectionProps> = ({
  title,
  members,
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdateMember,
  onAddMember,
  onDeleteMember,
  onDeleteSection,
  onUpdateTitle,
}) => {
  return (
    <section
      className="w-full py-10 border-t"
      style={{ borderTopColor: textColor + "4D" }} // 30%
    >
      <div className="flex justify-between items-center mb-8">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onUpdateTitle && onUpdateTitle(e.target.value)}
            className="text-xl sm:text-2xl font-medium bg-transparent border-b border-gray-300 focus:border-blue-400 outline-none w-full max-w-md"
            style={{ color: textColor }}
            placeholder="Generation Title (e.g. Children, Grandparents)"
          />
        ) : (
          <h2
            className="text-xl sm:text-2xl font-medium"
            style={{ color: textColor }}
          >
            {title}
          </h2>
        )}

        {isEditing && onDeleteSection && (
          <button
            onClick={onDeleteSection}
            className="text-red-500 hover:text-red-700 text-sm font-sans"
          >
            Delete Generation
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8">
        {members.map((person, index) => (
          <FamilyCard
            key={index}
            name={person.name}
            imageUrl={person.imageUrl}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdate={(field, val) =>
              onUpdateMember && onUpdateMember(index, field, val)
            }
            onDelete={() => onDeleteMember && onDeleteMember(index)}
          />
        ))}

        {/* Add Member Button */}
        {isEditing && onAddMember && (
          <button
            onClick={onAddMember}
            className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-sm p-4 bg-gray-50 hover:bg-gray-100 transition w-40 sm:w-56 aspect-[3/4] sm:aspect-auto sm:h-auto min-h-[300px]"
            style={{ borderColor: textColor + "4D" }}
          >
            <PlusCircle
              size={40}
              className="mb-2"
              style={{ color: textColor + "80" }}
            />
            <span className="font-medium" style={{ color: textColor + "B3" }}>
              Add Member
            </span>
          </button>
        )}
      </div>
    </section>
  );
};

export default FamilySection;
