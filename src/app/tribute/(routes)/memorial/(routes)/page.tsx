"use client";

export const dynamic = "force-dynamic";

import Memorial from "@/app/tribute/ComponentPages/Components/Memorial";
import Gallery from "@/app/tribute/ComponentPages/Gallery";
import MemoryWall from "@/app/tribute/ComponentPages/MemoryWall";
import TimelineSection, {
  TimelineItem,
} from "@/app/tribute/ComponentPages/TimelineSection";
import EventsSection, {
  EventItem,
} from "@/app/tribute/ComponentPages/EventSection";
import FamilyTree, {
  FamilyGroup,
} from "@/app/tribute/ComponentPages/FamilyTree";
import HeroSection from "@/app/tribute/ComponentPages/Components/MemorialHero";
import { Suspense, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api/api";
import { toast } from "sonner";
import { Edit2, Eye, Save, X } from "lucide-react";

import bg from "@public/images/grayishBG.jpg";
import jackson from "@public/images/jackson.png";
import banner1 from "@public/images/banner1.png";

interface Tribute {
  id: string;
  name: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  location?: string;
  profileImageUrl?: string;
  bannerUrl?: string;
  playAudio?: boolean;
}

const initialTributeData: Tribute = {
  id: "1",
  name: "Mrs. Radha Devi Sharma",
  dateOfBirth: "1973-03-16", // Format as YYYY-MM-DD for consistency
  dateOfDeath: "2023-09-28",
  location: "Varanasi, Uttar Pradesh",
  profileImageUrl: jackson.src,
  bannerUrl: banner1.src,
  playAudio: true,
};

const initialBio = `Mrs. Radha Devi Sharma was a beacon of light, warmth, and grace. Her life was a testament to the power of kindness and the enduring strength of the human spirit. Born with a natural inclination towards helping others, she dedicated her years to nurturing her family and contributing to her community with selfless devotion.

Her home was always a place of refuge and joy, where the aroma of her cooking and the sound of her gentle laughter created a sanctuary for all who entered. Radha Devi possessed a rare ability to listen with her heart, offering wise counsel and unwavering support to those in need.

A lover of nature and the arts, she found beauty in the simplest of things - a blooming flower, a soulful melody, or the quiet serenity of the Ganges at Assi Ghat. Her legacy is one of love, compassion, and the countless lives she touched with her generous spirit. Though she has moved beyond this mortal plane, her memory continues to inspire and guide us, a timeless reminder of a life beautifully lived.`;

const initialTimelineData = [
  {
    year: "1973",
    date: "March 16th",
    title: "Marriage",
    description:
      "Entered a lifelong partnership rooted in family values and togetherness.",
    location: "Location (optional)",
  },
  {
    year: "1980",
    date: "April 12th",
    title: "Career Beginnings",
    description:
      "Started professional service in the banking sector, known for sincerity and dedication.",
    location: "Delhi, India",
  },
  {
    year: "1995",
    date: "June 8th",
    title: "Family Milestone",
    description: "Blessed with the birth of their first child.",
  },
];

const initialGalleryImages = [bg.src, bg.src, bg.src, bg.src, bg.src, bg.src];

const initialMemoriesData = [
  {
    date: "September 28, 2023",
    message: `In remembrance of Radha Devi Sharma's life and values.
Her warmth, simplicity, and quiet strength brought comfort to everyone around her.
Time spent with her was filled with care, guidance, and affection.
Though she is no longer with us, her blessings and teachings continue to live on.`,
    author: "Rakesh Kumar",
  },
  {
    date: "September 28, 2023",
    message: `Remembering her kindness, generosity, and the grace with which she touched every life.`,
    author: "Suman Gupta",
  },
];

const initialEventData = [
  {
    description: [
      "Please join us in paying final tribute.",
      "Family, friends, and well-wishers are requested to attend a remembrance gathering to honour the life and values of Mrs. Radha Devi Sharma. Your presence will provide comfort as we come together to share memories, support one another, and offer a peaceful farewell.",
      "Please join us in commemorating Mrs. Radha Devi Sharma's life and the positive impact she had on all of us.",
    ],
    locationLines: [
      "Shanti Bhavan Community Hall",
      "Assi Ghat Road,",
      "Varanasi, Uttar Pradesh - 221005",
    ],
    dateTime: "June 26, 11:00 AM",
    virtualLink: "#",
  },
];

const initialFamilyGroups = [
  {
    title: "Grand Parents",
    members: [
      { name: "Late Mr. Ram Prasad Sharma" },
      { name: "Late Mrs. Shanti Devi Sharma" },
    ],
  },
  {
    title: "Parents",
    members: [
      { name: "Late Mr. Mohan Lal Sharma" },
      { name: "Late Mrs. Kamla Devi Sharma" },
    ],
  },
  {
    title: "Spouse",
    members: [{ name: "Mr. Ramesh Kumar Sharma" }],
  },
  {
    title: "Children",
    members: [{ name: "Mrs. Priya Sharma" }, { name: "Mr. Aditya Sharma" }],
  },
  {
    title: "Father / Mother in law",
    members: [
      { name: "Late Mr. Hari Prasad Sharma" },
      { name: "Late Mrs. Sushila Devi Sharma" },
    ],
  },
];

export default function Page() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [tribute, setTribute] = useState<Tribute>(initialTributeData);
  const [bio, setBio] = useState<string>(initialBio);
  const [timelineData, setTimelineData] =
    useState<TimelineItem[]>(initialTimelineData);
  const [galleryImages, setGalleryImages] =
    useState<string[]>(initialGalleryImages);
  const [memoriesData, setMemoriesData] = useState<any[]>(initialMemoriesData);
  const [eventData, setEventData] = useState<EventItem[]>(initialEventData);
  const [familyGroups, setFamilyGroups] =
    useState<FamilyGroup[]>(initialFamilyGroups);

  const handleUpdateTribute = (field: keyof Tribute, value: string) => {
    setTribute((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Check if user is logged in
      const authRes = await api.get("/tribute/me").catch(() => null);

      if (!authRes || authRes.data.noProfile === undefined) {
        toast.error("Please login to save your changes");
        // Store changes in local storage or session if needed, but for now redirect
        router.push(
          "/tribute/login?callbackUrl=" +
            encodeURIComponent(window.location.href),
        );
        return;
      }

      // If logged in, save the data
      const payload = {
        ...tribute,
        bio,
        timelineEvents: timelineData,
        galleryImages,
        memories: memoriesData,
        events: eventData,
        familyMembers: familyGroups,
      };

      await api.put(`/tribute/${tribute.id}`, payload);
      toast.success("Memorial saved successfully!");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Save failed", error);
      toast.error(error.response?.data?.message || "Failed to save memorial");
    } finally {
      setIsSaving(false);
    }
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
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#D4A043] text-white px-5 py-2 rounded-full font-medium hover:bg-[#B6761E] transition-all shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <>
                <Save size={18} /> <span>Save Changes</span>
              </>
            )}
          </button>
        )}

        {!isEditing && (
          <span className="text-xs text-gray-500 font-sans italic">
            Viewing as Visitor
          </span>
        )}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection
          tribute={tribute as any}
          isEditing={isEditing}
          onUpdate={handleUpdateTribute}
        />
      </Suspense>

      <div className="flex-1 md:ml-10 px-5 md:px-10 py-10 transition-all duration-300">
        <Memorial bio={bio} isEditing={isEditing} onBioUpdate={setBio} />
        <TimelineSection
          items={timelineData}
          isEditing={isEditing}
          onUpdate={setTimelineData}
        />
        <Gallery
          images={galleryImages}
          isEditing={isEditing}
          onUpdate={setGalleryImages}
        />
        <MemoryWall
          memories={memoriesData}
          name={tribute.name}
          isEditing={isEditing}
          onUpdate={setMemoriesData}
        />
        <FamilyTree
          centralPerson={{
            name: tribute.name,
            imageUrl: tribute.profileImageUrl,
          }}
          groups={familyGroups}
          isEditing={isEditing}
          onUpdateGroups={setFamilyGroups}
          onUpdateCentralPerson={(field, val) => {
            if (field === "name") handleUpdateTribute("name", val);
            if (field === "imageUrl")
              handleUpdateTribute("profileImageUrl", val);
          }}
          onUpdateGroup={(index, group) => {
            const next = [...familyGroups];
            next[index] = group;
            setFamilyGroups(next);
          }}
        />
        <EventsSection
          events={eventData}
          name={tribute.name}
          isEditing={isEditing}
          onUpdate={setEventData}
        />
      </div>
    </div>
  );
}
