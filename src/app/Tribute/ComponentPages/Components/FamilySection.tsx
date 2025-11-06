import React from "react";
import FamilyCard from "./FamilyCard";

interface FamilySectionProps {
  title: string;
  members: { name: string; image?: string }[];
}

const FamilySection: React.FC<FamilySectionProps> = ({ title, members }) => {
  return (
    <section className="w-full py-10 border-t border-[#1F3A4B]/30">
      <h2 className="text-xl sm:text-2xl font-medium mb-8 text-[#1F3A4B]">
        {title}
      </h2>

      <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8">
        {members.map((person, index) => (
          <FamilyCard key={index} name={person.name} image={person.image} />
        ))}
      </div>
    </section>
  );
};

export default FamilySection;
