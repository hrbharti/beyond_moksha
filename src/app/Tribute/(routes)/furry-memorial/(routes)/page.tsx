import React from "react";
import Memorial from "../../../ComponentPages/Components/Memorial";
import Gallery from "@/app/tribute/ComponentPages/Gallery";
import MemoryWall from "@/app/tribute/ComponentPages/MemoryWall";

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
