"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit2, Eye, Save } from "lucide-react";
import api from "@/lib/api/api";
import { saveMemorialDraft, getMemorialDraft } from "@/lib/memorialStorage";

import Memorial from "../components/PetMemorial";
import Gallery from "@/app/tribute/ComponentPages/Gallery";
import MemoryWall from "../components/PetMemorialWall";
import tommy from "@public/images/tommy.jpg";
import kitty from "@public/images/kitty.jpg";
import dog from "@public/images/dog.jpg";
import cat from "@public/images/cat.jpg";
import bird from "@public/images/bird.png";
import jackson from "@public/images/jackson.png";
import { useUser } from "@/hooks/useUser";

const initialGalleryImages = [
  tommy.src,
  kitty.src,
  dog.src,
  cat.src,
  bird.src,
  jackson.src,
];

const initialMemories = [
  {
    author: "Rahul",
    date: "Jan 22, 2024",
    message: "Tommy was the best dog ever. We will miss him so much.",
  },
  {
    author: "Sneha",
    date: "Jan 25, 2024",
    message:
      "I remember Tommy always greeting me at the door with a wagging tail.",
  },
];

const initialBio = "Tommy was a sweet and energetic dog who loved long walks and playing fetch. He was a loyal companion for 9 wonderful years.";

const MemorialPage = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  // State for editable fields
  const [name, setName] = useState("Tommy");
  const [dob, setDob] = useState("May 12, 2015");
  const [dod, setDod] = useState("January 20, 2024");
  const [bio, setBio] = useState(initialBio);
  const [galleryImages, setGalleryImages] = useState<string[]>(initialGalleryImages);
  const [memories, setMemories] = useState(initialMemories);

  // Restore draft on mount
  useEffect(() => {
    const draft = getMemorialDraft('furry');
    if (draft) {
      if (draft.name) setName(draft.name);
      if (draft.dob) setDob(draft.dob);
      if (draft.dod) setDod(draft.dod);
      if (draft.bio) setBio(draft.bio);
      if (draft.galleryImages) setGalleryImages(draft.galleryImages);
      if (draft.memories) setMemories(draft.memories);
      setIsEditing(true);
      toast.info("Restored your unsaved changes");
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (!isEditing) return;

    const timeoutId = setTimeout(() => {
      saveMemorialDraft('furry', {
        name,
        dob,
        dod,
        bio,
        galleryImages,
        memories
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [name, dob, dod, bio, galleryImages, memories, isEditing]);

  const handleSave = async () => {
    try {
      if (!user) {
        toast.error("Please login to save your changes");
        saveMemorialDraft('furry', {
          name,
          dob,
          dod,
          bio,
          galleryImages,
          memories
        });
        
        const currentUrl = new URL(window.location.href);

        router.push(
          "/tribute/login?callbackUrl=" +
            encodeURIComponent(currentUrl.toString()),
        );
        return;
      }

      const payload = {
        userId: user.id,
        name,
        dateOfBirth: dob,
        dateOfDeath: dod,
        bio,
        galleryImages,
        memories,
        type: 'dog'
      };

      await api.post(`/pet-tribute/`, payload);

      toast.success("Memorial saved successfully!");
      router.push(`/tribute/profile`);
    } catch (error: any) {
      console.error("Save failed", error);
      toast.error(error.response?.data?.message || "Failed to save memorial");
    }
  };

  const handleMemorialUpdate = (field: string, value: string) => {
      if (field === 'name') setName(value);
      if (field === 'bio') setBio(value);
      if (field === 'dob') setDob(value);
      if (field === 'dod') setDod(value);
  };

  return (
    <div className="relative min-h-screen">
       {/* Floating Action Bar */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-[#D4A043]/30">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 text-[#1F3A4B] font-medium hover:text-[#D4A043] transition-colors pr-4 border-r border-gray-200"
        >
          {isEditing ? (
            <>
              <Eye size={18} /> <span>Preview</span>
            </>
          ) : (
            <>
              <Edit2 size={18} /> <span>Edit Memorial</span>
            </>
          )}
        </button>

        {isEditing && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#D4A043] text-white px-5 py-2 rounded-full font-medium hover:bg-[#B6761E] transition-all shadow-md disabled:opacity-50"
          >
            <Save size={18} /> <span>Save Changes</span>
          </button>
        )}

        {!isEditing && (
          <span className="text-xs text-gray-500 font-sans italic">
            Viewing as Visitor
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20 py-10 transition-all duration-300">
        <Memorial
          name={name}
          dob={dob}
          dod={dod}
          bio={bio}
          isEditing={isEditing}
          onUpdate={handleMemorialUpdate}
        />
        <Gallery 
            images={galleryImages} 
            isEditing={isEditing}
            onUpdate={setGalleryImages}
        />
        <MemoryWall
          name={name}
          memories={memories}
          isEditing={isEditing}
          onUpdate={setMemories}
        />
      </div>
    </div>
  );
};

export default MemorialPage;
