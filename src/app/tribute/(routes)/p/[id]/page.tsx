"use client";
import React, { useEffect, useState } from "react";
import TributeNavbar from "../../../ComponentPages/TributeNavbar";
import HeroSection from "../../../ComponentPages/Components/MemorialHero";
import Memorial from "../../../ComponentPages/Components/Memorial";
import TimelineSection from "../../../ComponentPages/TimelineSection";
import Gallery from "../../../ComponentPages/Gallery";
import MemoryWall from "../../../ComponentPages/MemoryWall";
import EventsSection from "../../../ComponentPages/EventSection";
import FamilyTree from "../../../ComponentPages/FamilyTree";

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

export default function PublicTributePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTribute = async () => {
      try {
        // TODO: Implement tribute fetch API call
        console.log("Fetching tribute with ID:", id);

        // Simulate API call delay with mock data
        setTimeout(() => {
          const mockTribute = {
            id: id,
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
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        console.error("Failed to fetch tribute", err);
        setError(true);
        setLoading(false);
      }
    };

    if (id) {
      fetchTribute();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TributeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !tribute) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TributeNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Tribute Not Found
          </h2>
          <p className="text-gray-500 max-w-md">
            We couldn't find a public tribute for ID "{id}". It might be private
            or doesn't exist.
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
    <div className="min-h-screen bg-gray-50 font-sans">
      <TributeNavbar />

      <HeroSection tribute={tribute} />

      <div className="flex-1 md:ml-10 px-5 md:px-10 py-10 transition-all duration-300">
        <Memorial bio={tribute.bio} />

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
        />
        <EventsSection events={[]} name={tribute.name} />
      </div>
    </div>
  );
}
