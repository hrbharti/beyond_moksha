import Image, { StaticImageData } from "next/image";
import { MdArrowRightAlt } from "react-icons/md";

interface BlogCardProps {
  image: StaticImageData;
  content: string;
}

export const BlogCard = ({ image, content }: BlogCardProps) => {
  return (
    <div className="flex flex-col bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Blog image */}
      <div className="w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt="blog image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Blog content */}
      <div className="flex flex-col items-center justify-between text-center p-4 min-h-[130px]">
        <h3 className="text-[15px] font-medium text-[#1F3A52] leading-snug">
          {content}
        </h3>

        {/* Learn More Button */}
        <div className="mt-4 flex items-center justify-center text-[#BC911B] font-medium cursor-pointer group">
          <span className="group-hover:underline">Learn more</span>
          <MdArrowRightAlt className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );
};
