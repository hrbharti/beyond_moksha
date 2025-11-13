import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

interface ServicesCardProps {
  heading: string;
  subHeading: string;
  icon: StaticImageData;
  route ?: string;
}

export const ServicesCard = ({ heading, subHeading, icon, route }: ServicesCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md border border-gray-300 p-8 max-w-md w-full hover:shadow-xl transition-all duration-300">
      
      {/* Icon */}
      <div className="h-16 w-16 mb-4">
        <Image src={icon} alt={heading} className="object-contain w-full h-full" />
      </div>

      {/* Heading */}
      <h2 className="text-[#1F3A52] text-xl font-lora font-normal mb-2">
        {heading}
      </h2>

      {/* Subheading */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {subHeading}
      </p>

      {/* Learn More */}
      <Link href={route || ""} ><div className="mt-4 flex items-center gap-1 text-[#BC911B] font-medium cursor-pointer hover:underline">
        Learn more <MdArrowRightAlt />
      </div></Link>
    </div>
  );
};
