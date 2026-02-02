import React from "react";
import { Trash2 } from "lucide-react";

export interface TimelineItem {
  year: string;
  date: string;
  title: string;
  description: string;
  location?: string;
}

interface TimelineCardProps {
  year: string;
  date: string;
  title: string;
  description?: string;
  location?: string;
  isLast?: boolean;
  isEditing?: boolean;
  accentColor?: string;
  textColor?: string;
  onUpdate?: (updated: TimelineItem) => void;
  onDelete?: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  year,
  date,
  title,
  description,
  location,
  isLast,
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdate,
  onDelete,
}) => {
  const handleChange = (field: keyof TimelineItem, value: string) => {
    if (!onUpdate) return;
    onUpdate({
      year,
      date,
      title,
      description: description || "",
      location,
      [field]: value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 relative group">
      {/* Left Column - Year & Date */}
      <div className="flex flex-col items-center md:items-start min-w-[5rem]">
        {isEditing ? (
          <input
            type="text"
            value={year}
            onChange={(e) => handleChange("year", e.target.value)}
            className="text-2xl md:text-3xl font-bold bg-transparent border-b border-blue-200 focus:border-blue-500 outline-none w-20"
            placeholder="Year"
          />
        ) : (
          <h2
            className="text-2xl md:text-3xl text-transparent bg-clip-text leading-tight"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${accentColor}, ${textColor})`,
            }}
          >
            {year}
          </h2>
        )}

        {isEditing ? (
          <input
            type="text"
            value={date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="text-sm md:text-base bg-transparent border-b border-blue-100 focus:border-blue-400 outline-none w-32 mt-1"
            placeholder="Full Date"
          />
        ) : (
          <p
            className="text-sm md:text-base"
            style={{ color: textColor + "B3" }}
          >
            {date}
          </p>
        )}

        {/* Vertical line */}
        {!isLast && (
          <div
            className="hidden md:block w-[1px] h-16 mt-2 ml-[0.6rem]"
            style={{ backgroundColor: textColor + "99" }}
          ></div>
        )}
      </div>

      {/* Right Column - Content */}
      <div
        className="relative flex-1 border rounded-md p-4 md:p-6 bg-white font-serif before:content-[''] before:absolute before:left-[-10px] md:before:left-[-12px] before:top-1/2 before:-translate-y-1/2 before:border-y-[10px] md:before:border-y-[12px] before:border-y-transparent before:border-r-[10px] md:before:border-r-[12px] rounded-r-md"
        style={
          {
            color: textColor,
            borderColor: textColor + "99",
            borderRightColor: textColor + "99", // Ensure the arrow matches
          } as any
        }
      >
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="text-base md:text-lg font-semibold bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none w-full"
              placeholder="Title"
            />
            <textarea
              value={description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="text-sm md:text-base bg-transparent border border-gray-100 rounded p-1 w-full outline-none focus:border-blue-300"
              style={{ color: textColor + "CC" }}
              placeholder="Description"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="text-xs md:text-sm italic bg-transparent border-b border-gray-100 focus:border-blue-500 outline-none w-full"
              style={{ color: textColor + "99" }}
              placeholder="Location"
            />
          </div>
        ) : (
          <>
            <h3 className="text-base md:text-lg font-semibold">{title}</h3>
            {description && (
              <p
                className="text-sm md:text-base mt-1 whitespace-pre-line"
                style={{ color: textColor + "CC" }}
              >
                {description}
              </p>
            )}
            {location && (
              <p
                className="text-xs md:text-sm italic mt-1"
                style={{ color: textColor + "99" }}
              >
                {location}
              </p>
            )}
          </>
        )}

        {isEditing && (
          <button
            onClick={onDelete}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete milestone"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TimelineCard;
