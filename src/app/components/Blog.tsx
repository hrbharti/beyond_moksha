"use client";
import { BlogCard } from "./utils/BlogCard";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api/axiosInstance";

interface Blog {
  id: number;
  title: string;
  presignedCoverUrl?: string | null;
  coverImageUrl?: string | null;
}

interface ApiResponse {
  success: boolean;
  data: Blog[];
}

export const Blogs = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>("/api/blogs", {
          params: { page: 1, limit: 4 },
        });
        if (response.data.success) {
          setBlogs(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BC911B]"></div>
      </div>
    );
  }

  if (error || blogs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No blogs found at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center gap-10 py-10">
      {/* Blog cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={String(blog.id)}
            content={blog.title}
            image={blog.presignedCoverUrl || blog.coverImageUrl || null}
          />
        ))}
      </div>

      {/* View all button */}
      <div
        className="flex items-center justify-center gap-2 text-[#BC911B] font-medium cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={() => router.push("/blogs")}
      >
        View all
        <FaAngleDoubleRight />
      </div>
    </div>
  );
};
