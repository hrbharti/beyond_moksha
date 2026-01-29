import React from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";

interface FamilyCardProps {
  name: string;
  imageUrl?: string;
  isEditing?: boolean;
  accentColor?: string;
  onUpdate?: (field: "name" | "imageUrl", value: string) => void;
  onDelete?: () => void;
}

const FamilyCard: React.FC<FamilyCardProps> = ({
  name,
  imageUrl,
  isEditing = false,
  accentColor = "#D4A043",
  onUpdate,
  onDelete,
}) => {
  return (
    <div
      className="relative group/card flex flex-col items-center text-center border rounded-sm p-4 bg-white shadow-sm w-40 sm:w-56"
      style={{ borderColor: accentColor }}
    >
      {/* Delete Button */}
      {isEditing && onDelete && (
        <button
          onClick={onDelete}
          className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 shadow-md hover:bg-red-200 z-30"
        >
          <X size={14} />
        </button>
      )}

      <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden group/image">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : null}

        {/* Image Edit Overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer z-20">
            <button
              onClick={() => {
                toast.success("Image Uploaded");
                if (onUpdate) onUpdate("imageUrl", "dummy_url");
              }}
              className="flex flex-col items-center text-white"
            >
              <Camera size={24} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 w-full">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => onUpdate && onUpdate("name", e.target.value)}
            placeholder="Name"
            className="w-full text-center text-sm sm:text-base font-medium text-[#1F3A4B] border-b border-gray-300 outline-none bg-transparent"
            style={{ "--tw-ring-color": accentColor } as any}
          />
        ) : (
          <p className="text-sm sm:text-base font-medium text-[#1F3A4B] line-clamp-1">
            {name}
          </p>
        )}
      </div>
    </div>
  );
};

export default FamilyCard;
