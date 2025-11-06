import React from "react";
import DesignCard from "./Components/DesignCard";
import design1 from "../../../../public/banner1.png";
import design2 from "../../../../public/banner2.jpg";
import design3 from "../../../../public/banner3.jpg";
import MoreDesign from "./Components/MoreDesign";

const PickDesign: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 via-blue-900 to-blue-950 text-3xl md:text-5xl font-serif font-normal mb-12">
          Start now , Pick a Design
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <DesignCard
            imageSrc={design1}
            name="Name Surname"
            relation="Father"
            dob="DOB"
            dod="DOD"
            location="Location"
            theme="1"
          />
          <DesignCard
            imageSrc={design2}
            name="Name Surname"
            relation="Mother"
            dob="DOB"
            dod="DOD"
            location="Location"
            theme="2"
          />
          <DesignCard
            imageSrc={design3}
            name="Name Surname"
            relation="Friend"
            dob="DOB"
            dod="DOD"
            location="Location"
            theme="3"
          />
          <DesignCard
            imageSrc={design1}
            name="Name Surname"
            relation="Brother"
            dob="DOB"
            dod="DOD"
            location="Location"
            theme="1"
          />
          <DesignCard
            imageSrc={design2}
            name="Name Surname"
            relation="Sister"
            dob="DOB"
            dod="DOD"
            location="Location"
            theme="2"
          />
          <DesignCard
            imageSrc={design3}
            name="Name Surname"
            relation="Uncle"
            dob="DOB"
            dod="DOD"
            location="Location"
            theme="3"
          />
        </div>

        <MoreDesign />
      </div>
    </section>
  );
};

export default PickDesign;
