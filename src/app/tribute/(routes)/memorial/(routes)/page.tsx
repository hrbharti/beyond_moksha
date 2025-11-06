"use client"

export const dynamic = "force-dynamic";

import Memorial from "@/app/tribute/ComponentPages/Components/Memorial";
import Gallery from "@/app/tribute/ComponentPages/Gallery";
import MemoryWall from "@/app/tribute/ComponentPages/MemoryWall";
import TimelineSection from "@/app/tribute/ComponentPages/TimelineSection";
import EventsSection from "@/app/tribute/ComponentPages/EventSection";
import FamilyTree from "@/app/tribute/ComponentPages/FamilyTree";
import HeroSection from "@/app/tribute/ComponentPages/Components/MemorialHero";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading hero section...</div>}>
        <HeroSection />
      </Suspense>

      <div className="flex-1 md:ml-10 px-5 md:px-10 py-10 transition-all duration-300">
        <Memorial />
        <TimelineSection />
        <Gallery />
        <MemoryWall />
        <FamilyTree />
        <EventsSection />
      </div>
    </div>
  );
}
