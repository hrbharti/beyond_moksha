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
    <div className="w-full flex flex-col items-center gap-8 py-4">
      {/* Carousel — takes full width of whatever Section gives it */}
      <div className="w-full relative">
        {/* Embla viewport: must clip the overflowing track */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          {/* Embla track: negative margin compensates for slide padding */}
          <div className="flex" style={{ marginLeft: "-1rem" }}>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                /* 1 col on mobile → 2 on sm → 3 on md → 4 on lg */
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-w-0"
                style={{ paddingLeft: "1rem" }}
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

        {/* Prev / Next buttons — only shown when there are multiple slides */}
        {blogs.length > 1 && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#BC911B] hover:bg-[#BC911B] hover:text-white transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous blog"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#BC911B] hover:bg-[#BC911B] hover:text-white transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next blog"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* View all link */}
      <div
        className="flex items-center gap-2 text-[#BC911B] font-medium cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={() => router.push("/blogs")}
      >
        View all
        <FaAngleDoubleRight />
      </div>
    </div>
  );
};
