"use client";
import { BlogCard } from "./utils/BlogCard";
import {
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/lib/api/axiosInstance";
import useEmblaCarousel from "embla-carousel-react";

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
          params: { page: 1, limit: 10 },
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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: any) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <div className="flex flex-col w-full items-center justify-center gap-10 py-10 relative group">
      {/* Carousel Container */}
      <div className="w-full max-w-7xl px-4 sm:px-10 lg:px-16 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4"
              >
                <BlogCard
                  id={String(blog.id)}
                  content={blog.title}
                  image={blog.presignedCoverUrl || blog.coverImageUrl || null}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {blogs.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#BC911B] hover:bg-[#BC911B] hover:text-white transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#BC911B] hover:bg-[#BC911B] hover:text-white transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <FaChevronRight size={20} />
            </button>
          </>
        )}
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
