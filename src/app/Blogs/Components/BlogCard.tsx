import Image from "next/image"
import React from "react";
import { useRouter } from "next/navigation";


interface IProps {
  id: string;
  title: string;
  image: string | null;
}


  export default function BlogCard({ id, title, image }: IProps) {
    const router = useRouter();
    const handleClick = () => {
      router.push(`/Blogs/${id}`);
    }

    return (
      <div
        onClick={handleClick}
        className="bg-white border rounded-lg shadow hover:shadow-lg transition cursor-pointer"
      >
        <div className="w-full overflow-hidden rounded-md">
          <Image
            src={image || "/blog.jpg"}
            alt="Blog image"
            width={400}
            height={280}
            className="w-full h-[280px] object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-gray-800 font-medium line-clamp-2">
            {title}
          </p>
        </div>
      </div>
    )
}
