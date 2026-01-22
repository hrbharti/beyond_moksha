"use client";
import { useEffect, useState, useCallback } from "react";
import TributeNavbar from "../../ComponentPages/TributeNavbar";
import HeroSection from "../../ComponentPages/Components/MemorialHero";
import Memorial from "../../ComponentPages/Components/Memorial";
import TimelineSection from "../../ComponentPages/TimelineSection";
import Gallery from "../../ComponentPages/Gallery";
import MemoryWall from "../../ComponentPages/MemoryWall";
import EventsSection from "../../ComponentPages/EventSection";
import FamilyTree from "../../ComponentPages/FamilyTree";
import { Edit2, Save, X, Eye } from "lucide-react";
import Link from "next/link";

interface Tribute {
  id: string;
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  location?: string;
  bio?: string;
  profileImageUrl?: string;
  bannerUrl?: string;
  isPublic: boolean;
  familyMembers?: any;
}

export default function TributeProfile() {
  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [originalTribute, setOriginalTribute] = useState<Tribute | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      // TODO: Implement profile fetch API call
      console.log("Fetching user profile...");

      // Simulate API call delay with mock data
      setTimeout(() => {
        const mockTribute = {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          gender: "Male",
          dateOfBirth: "15-05-1985",
          bio: "A loving tribute to remember and honor loved ones.",
          profileImageUrl: "/images/jackson.png",
          bannerUrl: "/images/banner1.png",
          isPublic: true,
          familyMembers: [
            {
              title: "Immediate Family",
              members: [
                { name: "Jane Doe", relationship: "Wife", imageUrl: "/images/jackson.png" }
              ]
            }
          ]
        };
        setTribute(mockTribute);
        setOriginalTribute(mockTribute);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdate = (field: keyof Tribute, value: string) => {
    if (tribute) {
      setTribute({ ...tribute, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!tribute) return;
    setIsSaving(true);
    try {
      // TODO: Implement profile save API call
      console.log("Saving profile changes:", tribute);

      // Simulate API call delay
      setTimeout(() => {
        setOriginalTribute(tribute);
        setIsEditing(false);
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to save profile", error);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTribute(originalTribute);
    setIsEditing(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (!tribute) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 relative">
      <TributeNavbar />

      <div className="absolute top-24 right-5 md:right-10 z-50 flex gap-2">
        {!isEditing && (
          <Link
            href={`/tribute/p/${tribute.id}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-white transition"
          >
            <Eye size={16} /> Public Profile
          </Link>
        )}

        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full shadow-lg hover:bg-gray-50 transition"
            >
              <X size={18} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition font-medium"
            >
              <Save size={18} /> {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-white transition"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        )}
      </div>

      {/* Hero Section */}
      <HeroSection
        tribute={tribute}
        isEditing={isEditing}
        onUpdate={handleUpdate}
      />

      <div className="flex-1 md:ml-10 px-5 md:px-10 py-10 transition-all duration-300">
        <Memorial
          bio={tribute.bio}
          isEditing={isEditing}
          onBioUpdate={(val) => handleUpdate("bio", val)}
        />

        <TimelineSection items={[]} />
        <Gallery images={[]} />
        <MemoryWall memories={[]} name={tribute.name} />
        <FamilyTree
          centralPerson={{
            name: tribute.name,
            imageUrl: tribute.profileImageUrl,
          }}
          groups={
            Array.isArray(tribute.familyMembers)
              ? tribute.familyMembers
              : [{ title: "Family", members: [] }]
          }
          isEditing={isEditing}
          onUpdateGroup={(index, newGroup) => {
            if (!tribute) return;
            const currentGroups = Array.isArray(tribute.familyMembers)
              ? [...tribute.familyMembers]
              : [{ title: "Family", members: [] }];
            currentGroups[index] = newGroup;
            setTribute({ ...tribute, familyMembers: currentGroups });
          }}
          onUpdateCentralPerson={(field, value) => {
            // Map basic fields back to main tribute
            if (field === "name") handleUpdate("name", value);
            if (field === "imageUrl") handleUpdate("profileImageUrl", value);
          }}
        />
        <EventsSection events={[]} name={tribute.name} />
      </div>
    </div>
  );
}
