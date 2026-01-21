import { BlogCard } from "./utils/BlogCard";
import blog from "@public/images/blog.jpg";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const Blogs = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full items-center justify-center gap-10 py-10">
      {/* Blog cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-6">
        <BlogCard
          content="understanding funeral attire in india"
          image={blog}
        />
        <BlogCard
          content="How to Assist Your Friends in Their Grief Recovery Process"
          image={blog}
        />
        <BlogCard
          content="How to Help Someone Overcome the Grief of Miscarriage"
          image={blog}
        />
        <BlogCard
          content="A Comprehensive Guide on What to Do When Someone Passes Away in Noida"
          image={blog}
        />
      </div>

      {/* View all button */}
      <div
        className="flex items-center justify-center gap-2 text-[#BC911B] font-medium cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={() => router.push("Blogs")}
      >
        View all
        <FaAngleDoubleRight />
      </div>
    </div>
  );
};
