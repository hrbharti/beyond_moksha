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
  accentColor?: string;
  textColor?: string;
  onUpdateCentralPerson?: (field: keyof FamilyMember, value: string) => void;
  onUpdateGroup?: (groupIndex: number, newGroup: FamilyGroup) => void;
  onAddGroup?: (newGroup: FamilyGroup) => void;
  onDeleteGroup?: (groupIndex: number) => void;
  onUpdateGroups?: (groups: FamilyGroup[]) => void;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({
  centralPerson = { name: "Mrs. Radha Devi Sharma" },
  groups: rawGroups = [],
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdateCentralPerson,
  onUpdateGroup,
  onAddGroup,
  onDeleteGroup,
  onUpdateGroups,
}) => {
  const groups = React.useMemo(() => {
    if (typeof rawGroups === "string") {
      try {
        return JSON.parse(rawGroups);
      } catch (e) {
        console.error("Failed to parse family groups", e);
        return [];
      }
    }
    return rawGroups;
  }, [rawGroups]);

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
      (_: FamilyMember, i: number) => i !== memberIndex,
    );
    newGroups[groupIndex] = { ...newGroups[groupIndex], members: newMembers };
    onUpdateGroup(groupIndex, newGroups[groupIndex]);
  };

  const handleAddGroup = () => {
    if (!onUpdateGroups) return;
    const newGroups = [
      ...groups,
      { title: "New Generation", members: [{ name: "" }] },
    ];
    onUpdateGroups(newGroups);
  };

  const handleRemoveGroup = (index: number) => {
    if (!onUpdateGroups) return;
    const newGroups = groups.filter((_: FamilyGroup, i: number) => i !== index);
    onUpdateGroups(newGroups);
  };

  const handleUpdateGroupTitle = (index: number, newTitle: string) => {
    if (!onUpdateGroup) return;
    const group = { ...groups[index], title: newTitle };
    onUpdateGroup(index, group);
  };

  if ((!groups || groups.length === 0) && !centralPerson && !isEditing)
    return null;

  return (
    <div
      id="family-tree"
      className="w-full font-serif py-12 sm:py-16"
      style={{ color: textColor }}
    >
      <div className="flex justify-between items-center mb-12">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-serif mb-8 sm:mb-12 pb-4 inline-block border-b-2"
          style={{ borderColor: accentColor, color: textColor }}
        >
          Family Tree
        </h1>

        {isEditing && (
          <button
            onClick={handleAddGroup}
            className="px-4 py-2 text-white rounded-full text-sm font-sans hover:opacity-90 transition shadow-md"
            style={{ backgroundColor: accentColor }}
          >
            + Add Generation
          </button>
        )}
      </div>

      {/* Central Person */}
      {centralPerson && (
        <div className="flex justify-center mb-16">
          <FamilyCard
            name={centralPerson.name}
            imageUrl={centralPerson.imageUrl}
            isEditing={isEditing}
            textColor={textColor}
            accentColor={accentColor}
            onUpdate={(field, val) =>
              onUpdateCentralPerson && onUpdateCentralPerson(field, val)
            }
          />
        </div>
      )}

      {/* Family Sections */}
      {groups.map((group: FamilyGroup, index: number) => (
        <FamilySection
          key={index}
          title={group.title}
          members={group.members}
          isEditing={isEditing}
          accentColor={accentColor}
          textColor={textColor}
          onUpdateMember={(
            mIndex: number,
            field: keyof FamilyMember,
            val: string,
          ) => handleMemberUpdate(index, mIndex, field, val)}
          onAddMember={() => handleAddMember(index)}
          onDeleteMember={(mIndex: number) => handleDeleteMember(index, mIndex)}
          onDeleteSection={() => handleRemoveGroup(index)}
          onUpdateTitle={(newTitle: string) =>
            handleUpdateGroupTitle(index, newTitle)
          }
        />
      ))}
    </div>
  );
};

export default FamilyTree;
