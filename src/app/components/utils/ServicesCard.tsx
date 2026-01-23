import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

interface ServicesCardProps {
  heading: string;
  subHeading: string;
  icon: any;
  route?: string;
  link: string;
}

export const ServicesCard = ({
  heading,
  subHeading,
  icon,
  route,
  link,
}: ServicesCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md border border-gray-300 p-8 max-w-md w-full hover:shadow-xl transition-all duration-300">
      {/* Icon */}
      <div className="h-20 w-auto mb-6 flex items-center justify-center">
        <Image
          src={icon}
          alt={heading}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Heading */}
      <h2 className="text-[#1F3A52] text-xl font-lora font-normal mb-2">
        {heading}
      </h2>

      {/* Subheading */}
      <p className="text-gray-600 text-sm leading-relaxed">{subHeading}</p>

      {/* Learn More */}
      <Link href={route || ""}>
        <div className="mt-4 flex items-center gap-1 text-white font-medium cursor-pointer py-2 px-4 bg-gray-700 rounded-full stroke-white hover:bg-gray-800 transition-colors duration-300">
          {link} <MdArrowRightAlt />
        </div>
      </Link>
    </div>
  );
};
