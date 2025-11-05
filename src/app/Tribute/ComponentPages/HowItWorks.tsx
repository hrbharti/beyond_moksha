"use client";

import React from "react";
import StepCard from "./Components/StepCard";
import WorkItem from "./Components/WorkItem";

// Example placeholder images (replace with your actual ones)
import white from "../../../../public/whiteBg.jpg";

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 text-3xl md:text-5xl font-serif mb-12">
          How does it work?
        </h2>

        {/* Step Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
          <StepCard step="1" title="Create your Memorial website" active />
          <StepCard step="2" title="Personalize your page content" />
          <StepCard step="3" title="Invite Friends & Family to contribute" />
        </div>

        {/* Work Items */}
        <div className="flex flex-col gap-16 md:gap-20">
          <WorkItem
            imageSrc={white}
            title="Pick a design"
            description="Choose amongst dozens of personal themes: elegant, modern, classic, floral, landscapes... and more. We have a beautiful design for every Memorial."
          />
          <WorkItem
            imageSrc={white}
            title="Fill your loved one's details"
            description="Add his/her name, date of birth and passing, location. Upload a photo, write a funeral obituary, geotag the final resting place."
          />
          <WorkItem
            imageSrc={white}
            title="Choose your custom address"
            description="Create a custom address for your Tribute page like: www.online-tribute.com/John-Smith"
          />
          <WorkItem
            imageSrc={white}
            title="Make your page private"
            description="You can add a password to your Memorial site to protect it, or leave it open to everybody. Show your page on Search Engines like Google, or keep it hidden."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
