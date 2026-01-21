import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  id: number;
  title: string;
  coverImageUrl: string;
  createdAt: string;
  needDivider?: boolean;
}

export default function SideCard(props: IProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/Blogs/${props.id}`);
  };
  return (
    <div>
      <div
        className="w-full p-2 flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <Image
          className="w-[60px] h-[60px] rounded-full"
          src={props.coverImageUrl || "/images/blog.jpg"}
          alt="Blog_image"
          width={100}
          height={100}
        />
        <div className="ml-2">
          <p className="">{props.title}</p>
          <span className="text-gray-500 text-sm">
            {new Date(props.createdAt).toDateString()}
          </span>
        </div>
      </div>
      {props.needDivider && <hr />}
    </div>
  );
}
