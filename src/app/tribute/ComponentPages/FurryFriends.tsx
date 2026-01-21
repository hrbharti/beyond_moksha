import React from "react";
import PetCard from "./Components/PetCard";
import kitty from "@public/images/kitty.jpg";
import MoreDesign from "./Components/MoreDesign";

const FurryFriends: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-blue-500 text-3xl md:text-4xl font-serif mb-12 text-left">
          Celebrating Our Furry Friends
        </h2>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 justify-items-center">
          <PetCard
            imageSrc={kitty}
            name="Kitty Katty"
            dob="19 February '23"
            dod="18 August '25"
          />
          <PetCard
            imageSrc={kitty}
            name="Kitty Katty"
            dob="19 February '23"
            dod="18 August '25"
          />
          <PetCard
            imageSrc={kitty}
            name="Kitty Katty"
            dob="19 February '23"
            dod="18 August '25"
          />
          <PetCard
            imageSrc={kitty}
            name="Kitty Katty"
            dob="19 February '23"
            dod="18 August '25"
          />
          <PetCard
            imageSrc={kitty}
            name="Kitty Katty"
            dob="19 February '23"
            dod="18 August '25"
          />
          <PetCard
            imageSrc={kitty}
            name="Kitty Katty"
            dob="19 February '23"
            dod="18 August '25"
          />
        </div>
      </div>

      <MoreDesign />
    </section>
  );
};

export default FurryFriends;
