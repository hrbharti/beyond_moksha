"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import TributeNavbar from "../../ComponentPages/TributeNavbar";
import api from "@/lib/api/api";
import HeroSection from "../../ComponentPages/Components/MemorialHero";
import Memorial from "../../ComponentPages/Components/Memorial";
import TimelineSection from "../../ComponentPages/TimelineSection";
import Gallery from "../../ComponentPages/Gallery";
import MemoryWall from "../../ComponentPages/MemoryWall";
import EventsSection from "../../ComponentPages/EventSection";
import FamilyTree from "../../ComponentPages/FamilyTree";
import { Edit2, Save, X, Eye, LogOut, Share2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Tribute {
  id: string;
  name: string;
  username?: string;
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
  const router = useRouter();
  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [originalTribute, setOriginalTribute] = useState<Tribute | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await api.get("/tribute/me");
      setTribute(response.data);
      setOriginalTribute(response.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      router.push("/tribute/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

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
      await api.put(`/tribute/${tribute.id}`, tribute);
      setOriginalTribute(tribute);
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTribute(originalTribute);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await api.post("/tribute/logout");
      toast.success("Logged out successfully");
      router.push("/tribute/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout");
    }
  };

  const handleShare = async () => {
    if (!tribute) return;
    const shareUrl = `${window.location.origin}/tribute/p/${tribute.username || tribute.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tribute to ${tribute.name}`,
          text: `Check out the tribute for ${tribute.name}`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Profile link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
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
          <>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-white transition"
            >
              <Share2 size={16} /> Share
            </button>
            <Link
              href={`/tribute/p/${tribute.username || tribute.id}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-white transition"
            >
              <Eye size={16} /> Public Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50/80 backdrop-blur-sm text-red-600 border border-red-200 rounded-full shadow-sm hover:bg-red-100 transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </>
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
