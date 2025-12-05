import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Donation from "./Components/Donation";
import { Perks } from "../donation/Components/Perks";
import { Cards } from "../donation/Components/Card";
import { HeroSection } from "../donation/hero";

export default function page() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSection />

      {/* Intro / heading */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mt-20 text-center">
          <h1 className="text-3xl md:text-4xl text-[#1867AE] font-lora font-normal">
            Your Heart Can Heal Hearts
          </h1>

          <p className="mt-4 text-sm sm:text-base max-w-3xl mx-auto text-gray-700">
            When families face their darkest hours, your support becomes a beacon of hope.
            Together, we&apos;re not just building services — we&apos;re crafting moments of
            peace, dignity, and love that will be remembered forever.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div className="w-full mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* keep desktop spacing: three perks in a row on md+, stacked on mobile */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6 md:gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <Perks heading="24x7" subHeading="Seamless Service" />
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <Perks heading="₹26K Cr" subHeading="Market Impact" />
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <Perks heading="Family First" subHeading="Tech Platform" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Cards />
        </div>
      </div>

      {/* Donation section */}
      <div className="w-full mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Donation />
        </div>
      </div>

      <Footer />
    </div>
  );
}
