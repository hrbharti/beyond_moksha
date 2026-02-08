"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api/api";
import HeroSection from "../../ComponentPages/Components/MemorialHero";
import Memorial from "../../ComponentPages/Components/Memorial";
import TimelineSection from "../../ComponentPages/TimelineSection";
import Gallery from "../../ComponentPages/Gallery";
import MemoryWall from "../../ComponentPages/MemoryWall";
import EventsSection from "../../ComponentPages/EventSection";
import FamilyTree from "../../ComponentPages/FamilyTree";
import bg from "@public/images/grayishBG.jpg";
import {
  Eye,
  Edit2,
  Share2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import ProfileSidebar from "../../ComponentPages/Components/ProfileSidebar";

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
  playAudio: boolean;
  language?: string;
  textColor?: string;
  backgroundColor?: string;
  accentColor?: string;
  familyMembers?: any;
  timelineEvents?: any[];
  galleryImages?: string[];
  memories?: any[];
  events?: any[];
}

function ProfileContent() {
  const router = useRouter();
  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [originalTribute, setOriginalTribute] = useState<Tribute | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true); // Default to Edit Mode
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default sidebar open

  // Derived state for personalization to avoid deep nesting access in render
  const textColor = tribute?.textColor || "#000000";
  const backgroundColor = tribute?.backgroundColor || "#F9FAFB";
  const accentColor = tribute?.accentColor || "#D4A043";
  const language = tribute?.language || "English";

  const fetchProfile = useCallback(async () => {
    try {
      const response = await api.get("/tribute/me");
      if (response.data.noProfile) {
        // Redifect to memorial creation if the authenticated user has no profile (new tribute creation)
        router.push("/tribute/new");
        return;
      }
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

  const handleUpdate = (field: keyof Tribute, value: any) => {
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

  const handleShare = async () => {
    if (!tribute) return;
    const shareUrl = `${window.location.origin}/tribute/p/${tribute.username || tribute.id}`;
    const message = `Check out the tribute for ${tribute.name} on Beyond Moksha`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tribute to ${tribute.name}`,
          text: message,
          url: shareUrl,
        });
      } catch (error) {
        // Only log if it's not a user cancelation
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
          toast.error("Failed to share");
        }
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Profile link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
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
      <ProfileSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        accentColor={accentColor}
        setAccentColor={(val) => handleUpdate("accentColor", val)}
        textColor={textColor}
        setTextColor={(val) => handleUpdate("textColor", val)}
        backgroundColor={backgroundColor}
        setBackgroundColor={(val) => handleUpdate("backgroundColor", val)}
        language={language}
        setLanguage={(val) => handleUpdate("language", val)}
        isEditing={isEditing}
      />

      {/* Main Content Wrapper */}
      <div
        className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? "md:ml-80" : "ml-0"}`}
        style={{ color: textColor, backgroundColor: backgroundColor }}
      >
        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-5 top-24 z-50 rounded-xl transition-all duration-300 md:hidden"
          title="Open Menu"
        >
          <ChevronRight size={24} />
        </button>
        {/* Toggle Button Inside Content (only visible when sidebar is closed) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed left-0 top-32 z-50 bg-white border border-gray-200 p-2 rounded-r-xl shadow-md text-gray-500 hover:text-gray-800 transition-all duration-300 hidden md:flex items-center justify-center group"
            title="Expand Sidebar"
          >
            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        )}

        {/* Edit Mode Actions - Fixed Bottom Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-gray-200/50 transition-all duration-300 hover:scale-105">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex flex-col items-center gap-1 group text-gray-600 hover:text-gray-900 transition"
            title={isEditing ? "Preview" : "Edit Mode"}
            style={{ color: isEditing ? accentColor : undefined }}
          >
            <div className="p-2 rounded-full hover:bg-gray-100 transition">
              {isEditing ? <Eye size={22} /> : <Edit2 size={22} />}
            </div>
          </button>

          {isEditing && (
            <>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex flex-col items-center gap-1 group text-gray-600 hover:text-red-500 transition"
                title="Cancel"
              >
                <div className="p-2 rounded-full hover:bg-red-50 transition border border-transparent hover:border-red-200">
                  <X size={22} />
                </div>
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex flex-col items-center gap-1 group transition scale-110 hover:scale-125 mx-2"
                title="Save Changes"
                style={{ color: accentColor }}
              >
                <div
                  className="p-3 rounded-full shadow-lg text-white transition-all duration-300"
                  style={{ backgroundColor: accentColor }}
                >
                  <Save size={24} />
                </div>
              </button>
            </>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute right-0 p-5 z-50 flex gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 p-3 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-white transition"
          >
            <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
          </button>
          <Link
            href={`/tribute/p/${tribute.username || tribute.id}`}
            target="_blank"
            className="flex items-center gap-2 p-3 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-white transition"
          >
            <Eye size={16} />{" "}
            <span className="hidden sm:inline">Public Profile</span>
          </Link>
        </div>

        {/* Hero Section */}
        <HeroSection
          tribute={tribute}
          isEditing={isEditing}
          accentColor={accentColor}
          textColor={textColor}
          onUpdate={handleUpdate}
        />

        <div className="flex-1 md:ml-10 px-5 md:px-10 py-10 transition-all duration-300">
          <Memorial
            bio={tribute.bio}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onBioUpdate={(val) => handleUpdate("bio", val)}
          />

          <TimelineSection
            items={tribute.timelineEvents || []}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdate={(val) => handleUpdate("timelineEvents", val)}
          />
          <Gallery
            images={[bg.src, bg.src, bg.src, bg.src, bg.src, bg.src]}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdate={(val) => handleUpdate("galleryImages", val)}
          />
          <MemoryWall
            memories={tribute.memories || []}
            name={tribute.name}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdate={(val) => handleUpdate("memories", val)}
          />
          <FamilyTree
            centralPerson={{
              name: tribute.name,
              imageUrl: tribute.profileImageUrl,
            }}
            groups={tribute.familyMembers || []}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdateGroup={(index, newGroup) => {
              const currentGroups = Array.isArray(tribute.familyMembers)
                ? [...tribute.familyMembers]
                : [];
              currentGroups[index] = newGroup;
              handleUpdate("familyMembers", currentGroups);
            }}
            onUpdateGroups={(newGroups) => {
              handleUpdate("familyMembers", newGroups);
            }}
            onUpdateCentralPerson={(field, value) => {
              if (field === "name") handleUpdate("name", value);
              if (field === "imageUrl") handleUpdate("profileImageUrl", value);
            }}
          />
          <EventsSection
            events={tribute.events || []}
            name={tribute.name}
            isEditing={isEditing}
            accentColor={accentColor}
            textColor={textColor}
            onUpdate={(val) => handleUpdate("events", val)}
          />
        </div>
      </div>
    </div>
  );
}

export default function TributeProfile() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
