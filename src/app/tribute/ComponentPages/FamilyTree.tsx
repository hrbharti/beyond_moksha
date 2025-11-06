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
        <FamilyCard name="Mrs. Shanon Moore" />
      </div>

      {/* Family Sections */}
      <FamilySection
        title="Grand Parents"
        members={[
          { name: "Mr. John Moore" },
          { name: "Mrs. Clara Moore" },
        ]}
      />

      <FamilySection
        title="Parents"
        members={[
          { name: "Mr. Adam Moore" },
          { name: "Mrs. Susan Moore" },
        ]}
      />

      <FamilySection
        title="Spouse"
        members={[{ name: "Mr. Robert Moore" }]}
      />

      <FamilySection
        title="Children"
        members={[
          { name: "Mrs. Julia Moore" },
          { name: "Mr. Sam Moore" },
        ]}
      />

      <FamilySection
        title="Father / Mother in law"
        members={[
          { name: "Mr. Peter Brown" },
          { name: "Mrs. Olivia Brown" },
        ]}
      />
    </div>
  );
};

export default FamilyTree;
