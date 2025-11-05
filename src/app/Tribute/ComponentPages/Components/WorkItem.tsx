import React from "react";
import Image, { StaticImageData } from "next/image";

interface WorkItemProps {
    imageSrc: StaticImageData;
    title: string;
    description: string;
}

const WorkItem: React.FC<WorkItemProps> = ({ imageSrc, title, description }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
            {/* Image box */}
            <div className="flex-shrink-0 border-2 border-[#D4A043] rounded-lg w-[300px] h-[180px] md:w-[340px] md:h-[200px] flex items-center justify-center bg-white">
                <Image
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                    width={250}
                    height={150}
                />
            </div>

            {/* Text */}
            <div className="max-w-lg text-center md:text-left">
                <h3 className="text-[#0086da] text-xl md:text-3xl font-serif font-medium mb-2">
                    {title}
                </h3>
                <p className="text-[#1F3A4B] text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default WorkItem;
