import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  id: string;
  title: string;
  image: string | null;
}

export default function BlogCard({ id, title, image }: IProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blogs/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-black rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg group flex flex-col h-full"
    >
      <div className="w-full bg-[#E5E7EB] border-b border-black">
        <Image
          src={image || "/images/blog.jpg"}
          alt="Blog image"
          width={400}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex-grow flex items-center justify-center text-center">
        <h3 className="text-lg font-bold text-black leading-tight">{title}</h3>
      </div>
    </div>
  );
}
