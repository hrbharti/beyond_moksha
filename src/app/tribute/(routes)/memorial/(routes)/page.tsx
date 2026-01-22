"use client";

export const dynamic = "force-dynamic";

import Memorial from "@/app/tribute/ComponentPages/Components/Memorial";
import Gallery from "@/app/tribute/ComponentPages/Gallery";
import MemoryWall from "@/app/tribute/ComponentPages/MemoryWall";
import TimelineSection from "@/app/tribute/ComponentPages/TimelineSection";
import EventsSection from "@/app/tribute/ComponentPages/EventSection";
import FamilyTree from "@/app/tribute/ComponentPages/FamilyTree";
import HeroSection from "@/app/tribute/ComponentPages/Components/MemorialHero";
import { Suspense } from "react";
import bg from "@public/images/grayishBG.jpg";

const timelineData = [
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

const galleryImages = [
  bg.src,
  bg.src,
  bg.src,
  bg.src,
  bg.src,
  bg.src,
  bg.src,
  bg.src,
  bg.src,
];

const memoriesData = [
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

const eventData = [
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

const familyGroups = [
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
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>

      <div className="flex-1 md:ml-10 px-5 md:px-10 py-10 transition-all duration-300">
        <Memorial />
        <TimelineSection items={timelineData} />
        <Gallery images={galleryImages} />
        <MemoryWall memories={memoriesData} name="Radha Devi Sharma" />
        <FamilyTree
          centralPerson={{ name: "Mrs. Radha Devi Sharma" }}
          groups={familyGroups}
        />
        <EventsSection events={eventData} name="Radha Devi Sharma" />
      </div>
    </div>
  );
}
