import React from "react";

interface SectionProps {
  heading: string;
  subHeading: string;
  content: React.ReactNode;
}

export const Section = ({ heading, subHeading, content }: SectionProps) => {
  return (
    <section className="w-full h-auto">
      <div className="flex flex-col h-auto">
        {/* Heading area: responsive height and text sizes */}
        <div className="flex flex-col items-center justify-end gap-5 p-3 h-[10vh] sm:h-24">
          <h2
            className="
              text-2xl sm:text-3xl md:text-4xl 
              tracking-wider 
              bg-gradient-to-t from-[#1F3A52] to-[#4682B8]
              bg-clip-text text-transparent 
              font-lora font-normal
            "
          >
            {heading}
          </h2>
        </div>

        {/* Subheading: centered and constrained for readability */}
        <div className="flex items-center justify-center px-4">
          <p className="text-center text-sm sm:text-base text-[#393939] mt-2 max-w-3xl">
            {subHeading}
          </p>
        </div>

        {/* Content wrapper: responsive horizontal padding so children don't overflow */}
        <div className="w-full h-auto px-4 sm:px-6 lg:px-32 py-6">
          <div className="flex h-auto w-full items-center justify-center">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};
