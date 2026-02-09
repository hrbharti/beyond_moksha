import React from "react";
import Memorial from "../components/PetMemorial";
import Gallery from "@/app/tribute/ComponentPages/Gallery";
import MemoryWall from "../components/PetMemorialWall";
import tommy from "@public/images/tommy.jpg";
import kitty from "@public/images/kitty.jpg";
import dog from "@public/images/dog.jpg";
import cat from "@public/images/cat.jpg";
import bird from "@public/images/bird.png";
import jackson from "@public/images/jackson.png";

const galleryImages = [
  tommy.src,
  kitty.src,
  dog.src,
  cat.src,
  bird.src,
  jackson.src,
];

const MemorialPage = () => {
  return (
    <div className="flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <Memorial
        name="Tommy"
        dob="May 12, 2015"
        dod="January 20, 2024"
        bio="Tommy was a sweet and energetic dog who loved long walks and playing fetch. He was a loyal companion for 9 wonderful years."
      />
      <Gallery images={galleryImages} />
      <MemoryWall
        name="Tommy"
        memories={[
          {
            author: "Rahul",
            date: "Jan 22, 2024",
            message: "Tommy was the best dog ever. We will miss him so much.",
          },
          {
            author: "Sneha",
            date: "Jan 25, 2024",
            message:
              "I remember Tommy always greeting me at the door with a wagging tail.",
          },
        ]}
      />
    </div>
  );
};

export default MemorialPage;
