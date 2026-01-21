"use client";

import React from "react";
import FurryFriendCard from "./Components/FurryFriendCard";
import MoreDesign from "./Components/MoreDesign";

const FurryFriendsSection: React.FC = () => {
  const cardThemes = [
    {
      id: 1,
      bgImage: "/images/dog.jpg",
      theme: "Dog",
    },
    {
      id: 2,
      bgImage: "/images/cat.jpg",
      theme: "Cat",
    },
    {
      id: 3,
      bgImage: "/images/cat.jpg",
      theme: "Cat",
    },
    {
      id: 4,
      bgImage: "/images/dog.jpg",
      theme: "Dog",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-28">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 mb-12 text-center">
        Celebrating Our Furry Friends
      </h2>

      {/* Responsive Card Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 
                   place-items-center w-full max-w-7xl px-6 sm:px-10"
      >
        {cardThemes.map((theme) => (
          <FurryFriendCard
            key={theme.id}
            name="Name"
            dob="DOB"
            dod="DOD"
            bgImage={theme.bgImage}
            theme={theme.theme}
          />
        ))}
      </div>
      <MoreDesign theme="pet" />
    </section>
  );
};

export default FurryFriendsSection;
