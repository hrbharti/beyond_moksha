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
      <Memorial />
      <Gallery images={galleryImages} />
      <MemoryWall />
    </div>
  );
};

export default MemorialPage;
