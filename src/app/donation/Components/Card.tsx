import React from "react";

interface OneCardProps {
  heading: string;
  content1: string;
  content2?: string;
  className?: string;
}

const OneCard = ({ heading, content1, content2, className }: OneCardProps) => {
  return (
    <div
      className={`w-full md:w-1/3 flex flex-col items-center justify-between rounded-md shadow-xl border-2 text-white ${className} p-6 md:p-8`}
    >
      {/* Heading (keeps desktop size via md: classes) */}
      <div className="w-full flex items-center justify-center text-2xl md:text-2xl font-lora font-normal">
        {heading}
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center justify-center text-center gap-4 mt-4 md:mt-6">
        <div className="text-base md:text-lg leading-relaxed">{content1}</div>
        {content2 && <div className="text-base md:text-lg leading-relaxed">{content2}</div>}
      </div>
    </div>
  );
};

export const Cards = () => {
  return (
    <div className="w-full">
      {/* Three cards: stack on mobile, row on md+ (desktop look preserved) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-10">
          <OneCard
            heading="Tech-Enabled Compassion"
            content1="Simplifying bookings and documentation so families can focus on what matters most - being together and saying goodbye with peace."
            content2="Bringing comfort through technology when words aren’t enough."
            className="bg-[#25CCC0]"
          />
          <OneCard
            heading="Preserving Precious Memories"
            content1="A secure digital sanctuary where love letters, final wishes, and cherished memories live forever for future generations to discover."
            content2="Creating lasting legacies that transcend time and heal hearts."
            className="bg-[#1769B2]"
          />
          <OneCard
            heading="Gentle Return to Earth"
            content1="Eco-friendly farewell ceremonies that honor both the departed and our planet, offering comfort through sustainable, meaningful rituals."
            content2="Providing a gentle return to nature, offering comfort and peace to both the departed and their loved ones."
            className="bg-[#E8504E]"
          />
        </div>
      </div>

      {/* Yellow gradient banner: responsive heights and paddings (desktop visual preserved via md: values) */}
      <div className="w-full mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div
            className="w-full rounded-md text-white shadow-xl mt-6
              bg-[linear-gradient(181deg,rgba(223,170,22,1)_0%,rgba(188,145,27,1)_55%)]
              py-8 md:py-12 px-6 md:px-20"
          >
            <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-4">
              <div className="text-2xl md:text-4xl font-lora font-normal">
                Every Gift Becomes a Blessing
              </div>
              <div className="text-sm md:text-base leading-relaxed max-w-3xl">
                Your generosity doesn’t just support our services - it wraps grieving families in love,
                brings comfort to their hearts, and honors the memory of those they’ve lost.
              </div>
              <div className="text-sm md:text-base leading-relaxed max-w-3xl">
                Bringing comfort through technology when words aren’t enough.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final message: responsive container and typography (desktop preserved) */}
      <div className="w-full mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <h1 className="text-2xl md:text-4xl text-[#1867AE] font-lora font-normal text-center">
              Your Kindness Creates Miracles
            </h1>
            <p className="text-sm md:text-base text-center max-w-3xl">
              In moments when families feel most alone, your generosity becomes their strength.
              Every contribution is a hand extended in love, a promise that they are not forgotten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
