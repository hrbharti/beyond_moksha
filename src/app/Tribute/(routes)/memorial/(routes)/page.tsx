import React from "react";
import Memorial from "../../../ComponentPages/Components/MemorialHeroSection";
import Gallery from "@/app/Tribute/ComponentPages/Gallery";
import MemoryWall from "@/app/Tribute/ComponentPages/MemoryWall";

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
