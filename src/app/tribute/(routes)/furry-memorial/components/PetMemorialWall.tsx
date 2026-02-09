"use client";

import React, { useState } from "react";
import MemoryCard from "./MemoryCard";
import { Trash2 } from "lucide-react";

interface PetMemory {
  date: string;
  message: string;
  author: string;
}

interface PetMemorialWallProps {
  memories: PetMemory[];
  name: string;
  accentColor?: string;
  textColor?: string;
  isEditing?: boolean;
  onUpdate?: (memories: PetMemory[]) => void;
}

const MemoryWall: React.FC<PetMemorialWallProps> = ({
  memories = [],
  name,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  isEditing = false,
  onUpdate,
}) => {
  const [newMemory, setNewMemory] = useState<PetMemory>({
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    message: "",
    author: "",
  });

  const handleAddMemory = () => {
    if (!onUpdate || !newMemory.message || !newMemory.author) return;
    onUpdate([...memories, newMemory]);
    setNewMemory({
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      message: "",
      author: "",
    });
  };

  const handleRemoveMemory = (index: number) => {
    if (!onUpdate) return;
    const newMemories = memories.filter((_, i) => i !== index);
    onUpdate(newMemories);
  };

  return (
    <div
      id="memory-wall"
      className="w-full max-w-5xl mt-24"
      style={{ color: textColor }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-serif mb-8 sm:mb-12 pb-4 inline-block border-b-2 text-black"
            style={{ borderColor: accentColor }}
          >
            Memory Wall
          </h1>
          <p className="text-gray-700 italic mb-2">
            &quot;Some souls walk with us for a short while, but their love
            stays forever.&quot;
          </p>
          <p className="text-gray-700">
            Please share your photos and memories of {name}.
          </p>
        </div>

        {!isEditing && (
          <button
            className="self-start md:self-auto text-white px-6 py-3 rounded-md font-medium shadow-md hover:opacity-90 transition-all"
            style={{
              background: `linear-gradient(to right, ${accentColor}, #C28A22)`,
            }}
          >
            Contribute →
          </button>
        )}
      </div>

      {/* Memory Cards */}
      <div>
        {isEditing && (
          <div className="mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col gap-4">
            <h3 className="font-sans font-medium text-gray-900">Add Memory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Author Name"
                value={newMemory.author}
                onChange={(e) =>
                  setNewMemory({ ...newMemory, author: e.target.value })
                }
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 font-sans"
                style={{ "--tw-ring-color": accentColor } as any}
              />
              <input
                type="text"
                placeholder="Date"
                value={newMemory.date}
                onChange={(e) =>
                  setNewMemory({ ...newMemory, date: e.target.value })
                }
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 font-sans"
                style={{ "--tw-ring-color": accentColor } as any}
              />
            </div>
            <textarea
              placeholder="Share a memory..."
              value={newMemory.message}
              onChange={(e) =>
                setNewMemory({ ...newMemory, message: e.target.value })
              }
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 font-sans h-32 resize-none"
              style={{ "--tw-ring-color": accentColor } as any}
            />
            <button
              onClick={handleAddMemory}
              className="self-end px-6 py-2 text-white rounded-xl hover:opacity-90 transition font-sans shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              Post Memory
            </button>
          </div>
        )}

        {memories?.length > 0 ? (
          memories.map((memory, index) => (
            <div key={index} className="relative group/mem mb-4">
              <MemoryCard
                date={memory.date}
                message={memory.message}
                author={memory.author}
              />
              {isEditing && (
                <button
                  onClick={() => handleRemoveMemory(index)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover/mem:opacity-100 shadow-sm"
                  title="Remove memory"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))
        ) : (
          !isEditing && (
            <p className="text-gray-500 italic text-center py-20">
              No memories shared yet. Be the first to share a memory of {name}.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default MemoryWall;
