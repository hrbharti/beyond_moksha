"use client";
import React from "react";
import FamilySection from "./Components/FamilySection";
import FamilyCard from "./Components/FamilyCard";
import { FamilyMember } from "./Components/FamilySection";
export { type FamilyMember };

export interface FamilyGroup {
  title: string;
  members: FamilyMember[];
}

interface FamilyTreeProps {
  centralPerson?: FamilyMember;
  groups?: FamilyGroup[];
  isEditing?: boolean;
  onUpdateCentralPerson?: (field: keyof FamilyMember, value: string) => void;
  onUpdateGroup?: (groupIndex: number, newGroup: FamilyGroup) => void;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({
  centralPerson = { name: "Mrs. Radha Devi Sharma" },
  groups = [],
  isEditing = false,
  onUpdateCentralPerson,
  onUpdateGroup,
}) => {
  const handleMemberUpdate = (
    groupIndex: number,
    memberIndex: number,
    field: keyof FamilyMember,
    value: string,
  ) => {
    if (!onUpdateGroup) return;
    const newGroups = [...groups];
    const newMembers = [...newGroups[groupIndex].members];
    newMembers[memberIndex] = { ...newMembers[memberIndex], [field]: value };
    newGroups[groupIndex] = { ...newGroups[groupIndex], members: newMembers };
    onUpdateGroup(groupIndex, newGroups[groupIndex]);
  };

  const handleAddMember = (groupIndex: number) => {
    if (!onUpdateGroup) return;
    const newGroups = [...groups];
    const newMembers = [
      ...newGroups[groupIndex].members,
      { name: "New Member" },
    ];
    newGroups[groupIndex] = { ...newGroups[groupIndex], members: newMembers };
    onUpdateGroup(groupIndex, newGroups[groupIndex]);
  };

  const handleDeleteMember = (groupIndex: number, memberIndex: number) => {
    if (!onUpdateGroup) return;
    const newGroups = [...groups];
    const newMembers = newGroups[groupIndex].members.filter(
      (_, i) => i !== memberIndex,
    );
    newGroups[groupIndex] = { ...newGroups[groupIndex], members: newMembers };
    onUpdateGroup(groupIndex, newGroups[groupIndex]);
  };

  if ((!groups || groups.length === 0) && !centralPerson && !isEditing)
    return null;

  return (
    <div id="family-tree" className="w-full font-serif py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-12 text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950">
        Family Tree
      </h1>

      {/* Central Person */}
      {centralPerson && (
        <div className="flex justify-center mb-16">
          <FamilyCard
            name={centralPerson.name}
            imageUrl={centralPerson.imageUrl}
            isEditing={isEditing}
            onUpdate={(field, val) =>
              onUpdateCentralPerson && onUpdateCentralPerson(field, val)
            }
          />
        </div>
      )}

      {/* Family Sections */}
      {groups.map((group, index) => (
        <FamilySection
          key={index}
          title={group.title}
          members={group.members}
          isEditing={isEditing}
          onUpdateMember={(mIndex, field, val) =>
            handleMemberUpdate(index, mIndex, field, val)
          }
          onAddMember={() => handleAddMember(index)}
          onDeleteMember={(mIndex) => handleDeleteMember(index, mIndex)}
        />
      ))}
    </div>
  );
};

export default FamilyTree;
