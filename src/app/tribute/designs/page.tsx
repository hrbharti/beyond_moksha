"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TributeNavbar from "../ComponentPages/TributeNavbar";
import Footer from "@/app/components/Footer";
import DesignCard from "../ComponentPages/Components/DesignCard";
import FurryFriendCard from "../ComponentPages/Components/FurryFriendCard";
import design1 from "@public/images/banner1.png";
import design2 from "@public/images/banner2.jpg";
import design3 from "@public/images/banner3.jpg";

function DesignsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tributeType, setTributeType] = useState<"Human" | "Pet">("Human");
  const [contentFilter, setContentFilter] = useState("Popular");
  const [colorFilter, setColorFilter] = useState("All");
  const [petFilter, setPetFilter] = useState("Dog");

  // Sync state with URL param on mount and updates
  useEffect(() => {
    const theme = searchParams.get("theme");
    if (theme === "pet") {
      setTributeType("Pet");
    } else {
      setTributeType("Human");
    }
  }, [searchParams]);

  const contentFilters = [
    "Popular",
    "Sunset",
    "Blossoms",
    "Water",
    "Leaf",
    "Mountain",
    "Sky",
    "Clear",
  ];
  const colorFilters = [
    "Black",
    "White",
    "Red",
    "Yellow",
    "Blue",
    "Pink",
    "Green",
    "Clear",
  ];
  const petFilters = [
    "Dog",
    "Cat",
    "Hamster",
    "Rabbit",
    "Bird",
    "Horse",
    "Other",
    "Clear",
  ];

  return (
    <div className="bg-white min-h-screen">
      <TributeNavbar />

      {/* Hero / Header */}
      <div className="bg-[url('/images/bg.png')] bg-cover bg-center pt-16 pb-12 text-center px-4 relative overflow-hidden">
        <div className="inline-flex items-center justify-center mb-6">
          <span className="text-6xl md:text-7xl text-[#1F3A4B] font-medium mr-4">
            60+
          </span>
          <div className="text-left">
            <p className="text-[#1F3A4B] italic text-sm md:text-base">
              Beautiful Memorial templates
            </p>
            <h1 className="text-[#1F3A4B] text-2xl md:text-3xl font-normal">
              Modern & Elegant Memorial
              <br /> websites designs
            </h1>
          </div>
        </div>

        <p className="max-w-xl mx-auto text-[#1F3A4B]/80 text-sm md:text-base italic mb-8">
          Choose a theme for your Memorial website and start customizing it...
          <br />
          You can change this anytime later.
        </p>

        {/* Filters */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {tributeType === "Human" ? (
            <div>
              <h3 className="text-[#1F3A4B] text-left mb-4 font-medium">
                Filter by content-—
              </h3>
              <div className="flex flex-wrap gap-3">
                {contentFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setContentFilter(filter)}
                    className={`px-6 py-1.5 rounded-full border text-sm transition-all
                                    ${
                                      contentFilter === filter
                                        ? "border-[#D4A043] text-[#D4A043] bg-[#D4A043]/5"
                                        : "border-[#D4A043]/40 text-[#1F3A4B]/70 hover:border-[#D4A043] hover:text-[#D4A043]"
                                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-[#1F3A4B] text-left mb-4 font-medium">
                Your Pet
              </h3>
              <div className="flex flex-wrap gap-3">
                {petFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setPetFilter(filter)}
                    className={`px-6 py-1.5 rounded-full border text-sm transition-all
                                    ${
                                      petFilter === filter
                                        ? "border-[#D4A043] text-[#D4A043] bg-[#D4A043]/5"
                                        : "border-[#D4A043]/40 text-[#1F3A4B]/70 hover:border-[#D4A043] hover:text-[#D4A043]"
                                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-[#1F3A4B] text-left mb-4 font-medium">
              Filter by color-—
            </h3>
            <div className="flex flex-wrap gap-3">
              {colorFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setColorFilter(filter)}
                  className={`px-6 py-1.5 rounded-full border text-sm transition-all
                                    ${
                                      colorFilter === filter
                                        ? "border-blue-400 text-blue-600 bg-blue-50"
                                        : "border-[#1F3A4B]/20 text-[#1F3A4B]/70 hover:border-blue-300 hover:text-blue-500"
                                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 justify-items-center">
          {tributeType === "Human"
            ? // Human Cards
              [1, 2, 3, 4, 5, 6].map((i) => (
                <React.Fragment key={i}>
                  <DesignCard
                    imageSrc={design1}
                    name="Name Surname"
                    relation="Father"
                    location="Location"
                    theme="1"
                    tag="Popular"
                  />
                  <DesignCard
                    imageSrc={design2}
                    name="Name Surname"
                    relation="Mother"
                    location="Location"
                    theme="2"
                  />
                  <DesignCard
                    imageSrc={design3}
                    name="Name Surname"
                    relation="Friend"
                    location="Location"
                    theme="3"
                  />
                </React.Fragment>
              ))
            : // Pet Cards
              [1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <FurryFriendCard
                    name="Name"
                    dob="DOB"
                    dod="DOD"
                    theme="furry-1"
                    bgImage="/images/dog.jpg"
                    textColor="text-black"
                    type="dog"
                  />
                  <FurryFriendCard
                    name="Name"
                    dob="DOB"
                    dod="DOD"
                    theme="furry-2"
                    bgImage="/images/cat.jpg"
                    textColor="text-black"
                    type="cat"
                  />
                  <FurryFriendCard
                    name="Name"
                    dob="DOB"
                    dod="DOD"
                    theme="furry-3"
                    bgImage="/images/dog.jpg"
                    textColor="text-black"
                    type="dog"
                  />
                </React.Fragment>
              ))}
        </div>
        {/* Simple pagination or footer spacer */}
        <div className="h-20"></div>
      </div>

      <Footer />
    </div>
  );
}

export default function DesignsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <DesignsContent />
    </Suspense>
  );
}
