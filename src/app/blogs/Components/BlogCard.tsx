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
    <div onClick={handleClick} className="border rounded-lg cursor-pointer">
      <div className="w-full overflow-hidden rounded-md">
        <Image
          src={image || "/images/blog.jpg"}
          alt="Blog image"
          width={400}
          height={280}
          className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <p className="p-4 font-medium hover:text-[#4682B8]">{title}</p>
    </div>
  );
}
