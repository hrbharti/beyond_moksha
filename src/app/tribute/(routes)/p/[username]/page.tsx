"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api/api";
import HeroSection from "../../../ComponentPages/Components/MemorialHero";
import Memorial from "../../../ComponentPages/Components/Memorial";
import TimelineSection from "../../../ComponentPages/TimelineSection";
import Gallery from "../../../ComponentPages/Gallery";
import MemoryWall from "../../../ComponentPages/MemoryWall";
import EventsSection from "../../../ComponentPages/EventSection";
import FamilyTree from "../../../ComponentPages/FamilyTree";
import bg from "@public/images/grayishBG.jpg";

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
  timelineEvents?: any[];
  galleryImages?: string[];
  memories?: any[];
  events?: any[];
  textColor?: string;
  accentColor?: string;
}

export default function PublicTributePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = React.use(params);

  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Derived state for personalization
  const textColor = tribute?.textColor || "#000000";
  const accentColor = tribute?.accentColor || "#D4A043";

  useEffect(() => {
    const fetchTribute = async () => {
      try {
        const response = await api.get(`/tribute/${username}`);
        setTribute(response.data);
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchTribute();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !tribute) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Tribute Not Found
          </h2>
          <p className="text-gray-500 max-w-md">
            We couldn't find a public tribute for "{username}". It might be
            private or doesn't exist.
          </p>
          <a
            href="/"
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 font-sans"
      style={{ color: textColor }}
    >
      <HeroSection tribute={tribute} accentColor={accentColor} />

      <div className="flex-1 px-5 md:px-20 lg:px-32 py-10 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-24">
          <Memorial bio={tribute.bio} accentColor={accentColor} />

          <TimelineSection
            items={tribute.timelineEvents || []}
            accentColor={accentColor}
          />

          <Gallery
            images={[bg.src, bg.src, bg.src, bg.src, bg.src, bg.src]}
            accentColor={accentColor}
          />

          <MemoryWall
            memories={tribute.memories || []}
            name={tribute.name}
            accentColor={accentColor}
          />

          <FamilyTree
            centralPerson={{
              name: tribute.name,
              imageUrl: tribute.profileImageUrl,
            }}
            groups={tribute.familyMembers || []}
            accentColor={accentColor}
          />

          <EventsSection
            events={tribute.events || []}
            name={tribute.name}
            accentColor={accentColor}
          />

          {/* Call to Action Section */}
          <section className="mt-32 pb-20 border-t border-[#1F3A4B]/20 pt-20 text-center">
            <div
              className="max-w-2xl mx-auto p-10 rounded-3xl shadow-xl border border-white/20 relative overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${accentColor}15, #FFFFFF)`,
              }}
            >
              {/* Subtle decorative elements */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: accentColor }}
              />
              <div
                className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: accentColor }}
              />

              <h2 className="text-3xl md:text-4xl font-serif text-[#1F3A4B] mb-6">
                Want a memorial of your own?
              </h2>
              <p className="text-[#1F3A4B]/70 mb-10 text-lg">
                Create a beautiful, lasting tribute for your loved ones with
                Beyond Moksha.
              </p>
              <button
                className="px-10 py-4 text-white rounded-full text-lg font-medium shadow-lg hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: accentColor }}
                onClick={() => (window.location.href = "/tribute")}
              >
                Create a Memorial
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
