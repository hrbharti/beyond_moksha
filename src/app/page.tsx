"use client";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Corousal from "./components/Corousal";
import { Pledge } from "./components/Pledge";
import { Section } from "./components/utils/Section";
import { Services } from "./components/Services";
import { Blogs } from "./components/Blog";
import { Testimonials } from "./components/Testimonial";
import { useRef } from "react";
import Partner from "./components/Partner";
import GetInTouch from "./components/utils/GetInTouch";

export default function Home() {
  // Use HTMLDivElement because you're attaching refs to divs in this component
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const blogRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (section: string) => {
    switch (section) {
      case "Home":
        homeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case "Our Services":
        servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case "Blogs":
        blogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      default:
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onNavigate={scrollToSection} />

      {/* HERO / CAROUSAL */}
      <div ref={homeRef} className="w-full">
        <div className="w-full ">
          <Corousal />
        </div>
      </div>

      {/* PLEDGE */}
      <div className="w-full">
        <div className="w-full">
          <Pledge />
        </div>
      </div>

      {/* SERVICES */}
      <div ref={servicesRef} className="-mt-10 w-full">
        <div className="w-full">
          <Section
            heading="Our Services"
            subHeading="We provide comprehensive services to support you through every step of your journey"
            content={
              <div className="py-6 sm:py-8">
                <Services />
              </div>
            }
          />
        </div>
      </div>

      {/* BLOGS */}
      <div ref={blogRef} className="w-full mt-16 sm:mt-20">
        <div className="w-full">
          <Section
            heading="Latest From the Blogs"
            subHeading="Insights, guidance, and support to help you navigate difficult times"
            content={
              <div className="py-6 sm:py-8">
                <Blogs />
              </div>
            }
          />
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="w-full mt-8">
        <div className="w-full">
          <Section
            heading="Hear from Families we’ve helped"
            subHeading="Real testimonials from families who trusted us during their most difficult times"
            content={
              <div className="py-6 sm:py-8">
                <Testimonials />
              </div>
            }
          />
        </div>
      </div>

      {/* FOOTER AREA */}
      <div className="w-full mt-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-6 sm:pb-10">
            <GetInTouch />
          </div>
        </div>
        <div className="mt-10">
          <Partner />
          <Footer />
        </div>
      </div>
    </div>
  );
}
