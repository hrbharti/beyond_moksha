import Image from "next/image";
import { useRouter } from "next/navigation";

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
    router.push(`/blogs/${props.id}`);
  };
  return (
    <div className="w-full">
      <div
        className="w-full py-4 flex items-center cursor-pointer group"
        onClick={handleClick}
      >
        <div className="relative w-14 h-14 flex-shrink-0">
          <Image
            className="rounded-full object-cover border border-gray-100"
            src={props.coverImageUrl || "/images/blog.jpg"}
            alt="Blog_image"
            fill
          />
        </div>
        <div className="ml-4 flex flex-col gap-1">
          <p className="text-[15px] font-bold text-gray-900 leading-tight group-hover:text-[#1867AE] transition-colors">
            {props.title}
          </p>
          <span className="text-gray-400 text-xs font-medium">
            {new Date(props.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      {props.needDivider && <hr className="border-gray-100" />}
    </div>
  );
}
