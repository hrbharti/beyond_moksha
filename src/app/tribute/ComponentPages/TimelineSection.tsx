import React from "react";
import TimelineCard from "./Components/TimelineCard";

export interface TimelineItem {
  year: string;
  date: string;
  title: string;
  description: string;
  location?: string;
}

interface TimelineSectionProps {
  items?: TimelineItem[];
  isEditing?: boolean;
  accentColor?: string;
  textColor?: string;
  onUpdate?: (items: TimelineItem[]) => void;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  items = [],
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdate,
}) => {
  const handleAddItem = () => {
    if (!onUpdate) return;
    const newItem: TimelineItem = {
      year: new Date().getFullYear().toString(),
      date: "",
      title: "New Milestone",
      description: "",
      location: "",
    };
    onUpdate([...items, newItem]);
  };

  const handleUpdateItem = (index: number, updatedItem: TimelineItem) => {
    if (!onUpdate) return;
    const newItems = [...items];
    newItems[index] = updatedItem;
    onUpdate(newItems);
  };

  const handleDeleteItem = (index: number) => {
    if (!onUpdate) return;
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  };

  if (!isEditing && (!items || items.length === 0)) return null;

  return (
    <div
      id="timeline"
      className="w-full py-12 sm:py-16 lg:py-20 font-serif"
      style={{ color: textColor }}
    >
      <div className="flex justify-between items-center mb-12">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-serif mb-6 sm:mb-10 pb-4 inline-block border-b-2 text-black"
          style={{ borderColor: accentColor }}
        >
          Timeline
        </h1>
        {isEditing && (
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-sans hover:opacity-90 transition shadow-md"
            style={{ backgroundColor: accentColor }}
          >
            <span>+ Add Milestone</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-10">
        {items.length === 0 && !isEditing && (
          <p className="text-gray-400 italic">No milestones recorded yet.</p>
        )}
        {items.map((item, index) => (
          <TimelineCard
            key={index}
            year={item.year}
            date={item.date}
            title={item.title}
            description={item.description}
            location={item.location}
            isLast={index === items.length - 1}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdate={(updated) => handleUpdateItem(index, updated)}
            onDelete={() => handleDeleteItem(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
