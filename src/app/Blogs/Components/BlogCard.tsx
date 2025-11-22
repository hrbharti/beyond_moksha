import Image from "next/image"
import React from "react";
import { useRouter } from "next/navigation";

interface IProps {
  id: string;
  title: string;
  image: string;
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
      <div className="w-full h-[75%] overflow-hidden rounded-md">
        <Image
          src={image || "/blog.jpg"}
          alt="Blog image"
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="m-4 h-[70%] mx-8">
        {title}
      </p>
    </div>
  )
}
