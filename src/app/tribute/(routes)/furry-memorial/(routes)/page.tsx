import React from "react";
import Memorial from "../components/PetMemorial";
import Gallery from "@/app/tribute/ComponentPages/Gallery";
import MemoryWall from "../components/PetMemorialWall";

const MemorialPage = () => {
    return (
        <div className="flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20 py-10">
            <Memorial />
            <Gallery />
            <MemoryWall />
        </div>
    );
};

export default MemorialPage;
