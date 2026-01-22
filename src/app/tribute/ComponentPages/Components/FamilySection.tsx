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
  onUpdateMember?: (
    index: number,
    field: keyof FamilyMember,
    value: string,
  ) => void;
  onAddMember?: () => void;
  onDeleteMember?: (index: number) => void;
}

const FamilySection: React.FC<FamilySectionProps> = ({
  title,
  members,
  isEditing = false,
  onUpdateMember,
  onAddMember,
  onDeleteMember,
}) => {
  return (
    <section className="w-full py-10 border-t border-[#1F3A4B]/30">
      <h2 className="text-xl sm:text-2xl font-medium mb-8 text-[#1F3A4B]">
        {title}
      </h2>

      <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8">
        {members.map((person, index) => (
          <FamilyCard
            key={index}
            name={person.name}
            imageUrl={person.imageUrl}
            isEditing={isEditing}
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
            className="flex flex-col items-center justify-center text-center border-2 border-dashed border-[#1F3A4B]/30 rounded-sm p-4 bg-gray-50 hover:bg-gray-100 transition w-40 sm:w-56 aspect-[3/4] sm:aspect-auto sm:h-auto min-h-[300px]"
          >
            <PlusCircle size={40} className="text-[#1F3A4B]/50 mb-2" />
            <span className="text-[#1F3A4B]/70 font-medium">Add Member</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default FamilySection;
