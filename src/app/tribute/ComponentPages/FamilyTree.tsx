import React from "react";
import FamilySection from "./Components/FamilySection";
import FamilyCard from "./Components/FamilyCard";

const FamilyTree: React.FC = () => {
  return (
    <div id="family-tree" className="w-full bg-white font-serif py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-12 text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950">
        Family Tree
      </h1>

      {/* Central Person */}
      <div className="flex justify-center mb-16">
        <FamilyCard name="Mrs. Radha Devi Sharma" />
      </div>

      {/* Family Sections */}
      <FamilySection
        title="Grand Parents"
        members={[
          { name: "Late Mr. Ram Prasad Sharma" },
          { name: "Late Mrs. Shanti Devi Sharma" },
        ]}
      />

      <FamilySection
        title="Parents"
        members={[
          { name: "Late Mr. Mohan Lal Sharma" },
          { name: "Late Mrs. Kamla Devi Sharma" },
        ]}
      />

      <FamilySection
        title="Spouse"
        members={[{ name: "Mr. Ramesh Kumar Sharma" }]}
      />

      <FamilySection
        title="Children"
        members={[
          { name: "Mrs. Priya Sharma" },
          { name: "Mr. Aditya Sharma" },
        ]}
      />

      <FamilySection
        title="Father / Mother in law"
        members={[
          { name: "Late Mr. Hari Prasad Sharma" },
          { name: "Late Mrs. Sushila Devi Sharma" },
        ]}
      />
    </div>
  );
};

export default FamilyTree;
