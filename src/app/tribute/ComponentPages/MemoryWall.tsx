"use client";

import React, { useState } from "react";
import MemoryCard from "./Components/MemoryCard";
import { Trash2 } from "lucide-react";

export interface Memory {
  date: string;
  message: string;
  author: string;
}

interface MemoryWallProps {
  memories?: Memory[];
  name?: string;
  isEditing?: boolean;
  accentColor?: string;
  onUpdate?: (memories: Memory[]) => void;
}

const MemoryWall: React.FC<MemoryWallProps> = ({
  memories = [],
  name = "your loved one",
  isEditing = false,
  accentColor = "#D4A043",
  onUpdate,
}) => {
  const [newMemory, setNewMemory] = useState<Memory>({
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

  if (!isEditing && (!memories || memories.length === 0)) return null;

  return (
    <div id="memory-wall" className="w-full max-w-5xl text-[#1F3A4B] mt-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950">
            Memory Wall
          </h1>
          <p className="text-gray-700 italic mb-2">
            &quot;Those who live in our memories remain forever with us.&quot;
          </p>
          <p className="text-gray-700">
            Please share your photos and memories of {name}.
          </p>
        </div>
      </div>

      {/* Memory Cards */}
      <div>
        {isEditing && (
          <div className="mb-10 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-4">
            <h3 className="font-sans font-medium text-blue-900">Add Memory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Author Name"
                value={newMemory.author}
                onChange={(e) =>
                  setNewMemory({ ...newMemory, author: e.target.value })
                }
                className="px-4 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 font-sans"
                style={{ "--tw-ring-color": accentColor } as any}
              />
              <input
                type="text"
                placeholder="Date"
                value={newMemory.date}
                onChange={(e) =>
                  setNewMemory({ ...newMemory, date: e.target.value })
                }
                className="px-4 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 font-sans"
                style={{ "--tw-ring-color": accentColor } as any}
              />
            </div>
            <textarea
              placeholder="Share a memory..."
              value={newMemory.message}
              onChange={(e) =>
                setNewMemory({ ...newMemory, message: e.target.value })
              }
              className="px-4 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 font-sans h-32"
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

        {memories.length === 0 && !isEditing && (
          <p className="text-gray-400 italic">No memories shared yet.</p>
        )}

        {memories.map((memory, index) => (
          <div key={index} className="relative group/mem">
            <MemoryCard
              date={memory.date}
              message={memory.message}
              author={memory.author}
            />
            {isEditing && (
              <button
                onClick={() => handleRemoveMemory(index)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover/mem:opacity-100"
                title="Remove memory"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryWall;
