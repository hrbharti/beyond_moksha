"use client";
import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "./Components/BlogCard";
import SideSearch from "./Components/SideSearch";
import { exploreTopicsData } from "./Components/explore-topics-data";
import Link from "next/link";
import axiosInstance from "@/lib/api/axiosInstance";
import LatestPopularBlogs from "./Components/LatestPopularBlogs";

interface Blog {
  id: number;
  title: string;
  tags: string[];
  presignedContentUrl: string;
  presignedCoverUrl?: string | null;
  coverImageUrl?: string | null;
  readTime: number;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}

interface IQueryParam {
  page: number;
  limit: number;
  query?: string;
}

export default function Page() {
  const [selected, setSelected] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const blogsPerPage = 6;

  // Fetch blogs from API
  useEffect(() => {
    fetchBlogs(currentPage, searchString);
  }, [currentPage, searchString]);

  const fetchBlogs = async (pageNumber: number, query: string) => {
    setLoading(true);
    setError(null);
    try {
      // Determine endpoint based on search string
      const endpoint = query.trim() ? "/api/blogs/search" : "/api/blogs";
      const params: IQueryParam = {
        page: pageNumber,
        limit: blogsPerPage,
      };

      // Add search query if searching
      if (query.trim()) {
        params.query = query;
      }

      const response = await axiosInstance.get<ApiResponse>(endpoint, {
        params,
      });

      if (response.data.success) {
        setBlogs(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (err) {
      setError("Failed to fetch blogs");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    // Update input value immediately for instant feedback
    setInputValue(query);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      setSearchString(query);
      setCurrentPage(1); // Reset to first page on new search
    }, 500); // 500ms debounce delay
  };

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <div>
      <Navbar />
      {/* Wrapper for layout, centered */}
      <div className="max-w-7xl mx-auto px-6 mt-12 mb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main column */}
          <div className="w-full lg:w-2/3">
            {/* Blue border container for blogs */}
            <div className="border border-[#1867AE] rounded-2xl p-8 bg-white shadow-sm min-h-[800px]">
              <h2 className="text-3xl text-center mb-10 font-serif font-bold text-[#BC911B]">
                Blogs
              </h2>

              {/* Grid of blog cards */}
              {!loading && blogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={String(blog.id)}
                      title={blog.title}
                      image={
                        blog.presignedCoverUrl || blog.coverImageUrl || null
                      }
                    />
                  ))}
                </div>
              )}

              {/* Empty and Loading states */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-[#BC911B] rounded-full animate-spin"></div>
                  <p className="text-lg text-gray-400 font-medium italic">
                    Loading latest blogs...
                  </p>
                </div>
              )}

              {!loading && blogs.length === 0 && !error && (
                <div className="flex justify-center items-center py-24">
                  <p className="text-lg text-gray-400 font-medium">
                    {inputValue
                      ? `No results found for "${inputValue}"`
                      : "No blogs available yet"}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16">
                  <button
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-[#1F3A52] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    &#8249;
                  </button>

                  <div className="flex items-center gap-2">
                    {getPaginationNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number" && handlePageChange(page)
                        }
                        disabled={page === "..."}
                        className={`
                          min-w-[40px] h-10 px-2 flex items-center justify-center rounded-full font-bold transition-all duration-300
                          ${
                            page === currentPage
                              ? "bg-[#1F3A52] text-white shadow-lg scale-110"
                              : page === "..."
                                ? "cursor-default text-gray-400"
                                : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                          }
                        `}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-[#1F3A52] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    &#8250;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-10">
            {/* Browse Blogs / Search Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#1867AE] p-8 flex flex-col items-center">
              <h2 className="text-2xl font-serif font-bold text-[#1F3A52] mb-6">
                Browse Blogs
              </h2>
              <SideSearch
                searchString={inputValue}
                handleSearchChange={handleSearchChange}
              />
            </div>

            {/* Latest / Popular toggles */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#1867AE] p-8">
              <LatestPopularBlogs
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </aside>
        </div>
      </div>
      {/* end wrapper */}
      <Footer />
    </div>
  );
}
