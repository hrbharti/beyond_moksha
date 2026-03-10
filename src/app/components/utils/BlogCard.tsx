import Image, { StaticImageData } from "next/image";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

interface BlogCardProps {
  id?: string;
  image: string | StaticImageData | null;
  content: string;
}

export const BlogCard = ({ id, image, content }: BlogCardProps) => {
  const cardContent = (
    <div className="flex flex-col bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full group">
      {/* Blog image */}
      <div className="w-full h-48 sm:h-52 overflow-hidden relative shrink-0">
        {image ? (
          <Image
            src={image}
            alt={content}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Blog content */}
      <div className="flex flex-col items-center justify-between text-center p-4 min-h-[130px] flex-grow">
        <h3 className="text-[15px] font-medium text-[#1F3A52] group-hover:text-[#BC911B] transition-colors duration-300 leading-snug line-clamp-2" title={content}>
          {content}
        </h3>

        {/* Learn More Button */}
        <div className="mt-4 flex items-center justify-center text-[#BC911B] font-medium">
          <span className="group-hover:underline">Read more</span>
          <MdArrowRightAlt className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );

  if (id) {
    return (
      <Link href={`/blogs/${id}`} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
