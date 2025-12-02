"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from './Components/BlogCard'
import SideSearch from './Components/SideSearch'
import { exploreTopicsData } from './Components/explore-topics-data'
import Link from 'next/link'
import axiosInstance from '@/lib/api/axiosInstance'
import LatestPopularBlogs from './Components/LatestPopularBlogs'

interface Blog {
  id: number;
  title: string;
  tags: string[];
  contentUrl: string;
  coverImageUrl: string | null;
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
  const [searchString, setSearchString] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
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
      const endpoint = query.trim() ? '/api/blogs/search' : '/api/blogs';
      const params: IQueryParam = {
        page: pageNumber,
        limit: blogsPerPage,
      };

      // Add search query if searching
      if (query.trim()) {
        params.query = query;
      }

      console.log('Fetching blogs with:', { endpoint, params });
      console.log('Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

      const response = await axiosInstance.get<ApiResponse>(endpoint, {
        params,
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        setBlogs(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      pages.push('...');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <div>
      <Navbar />

      {/* Wrapper for layout, centered */}
      <div className="max-w-7xl mx-auto px-6 mt-8">

        {/* Top grid: main + sidebar */}
        <div className="flex flex-col md:flex-row gap-8">

          {/* Main column */}
          <div className="w-full md:w-2/3">

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-4xl font-lora font-semibold text-[#BC911B]">
                {inputValue ? `Search Results for "${inputValue}"` : 'Blogs'}
              </h1>
            </div>

            {/* Dashed border container to match screenshot */}
            <div className="border-2 border-dashed border-[#1867AE] rounded-xl p-6 bg-white">

              {/* Grid of blog cards (3 columns on md, 1 on small) */}
              {!loading && blogs.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                      <BlogCard
                        key={blog.id}
                        id={String(blog.id)}
                        title={blog.title}
                        image={blog.coverImageUrl || '/blog.jpg'}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Empty and Loading states */}
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <p className="text-lg text-gray-500">Loading blogs...</p>
                </div>
              )}

              {error && (
                <div className="flex justify-center items-center py-12">
                  <p className="text-lg text-red-500">{error}</p>
                </div>
              )}

              {!loading && blogs.length === 0 && !error && (
                <div className="flex justify-center items-center py-12">
                  <p className="text-lg text-gray-500">
                    {inputValue ? 'No blogs found matching your search' : 'No blogs found'}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    &#8249;
                  </button>

                  {getPaginationNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                      className={`
                        px-3 py-2 rounded-full font-medium transition
                        ${page === currentPage
                          ? 'bg-gradient-to-t from-[#1F3A52] to-[#4682B8] text-white shadow-md'
                          : page === '...'
                            ? 'cursor-default'
                            : 'border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    &#8250;
                  </button>
                </div>
              )}

            </div> {/* end dashed container */}


          </div> {/* end main column */}

          {/* Sidebar */}
          <aside className="w-full md:w-1/3 flex flex-col gap-6">

            {/* Browse Blogs / Search Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="mb-2">
                <h2 className="text-xl font-semibold">Browse Blogs</h2>
              </div>
              <SideSearch searchString={inputValue} handleSearchChange={handleSearchChange} />
            </div>

            {/* Latest / Popular toggles */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <button
                    className={`px-3 py-1 rounded-full ${selected === 1 ? 'bg-[#1867AE] text-white' : 'bg-gray-100 text-[#1F3A52]' }`}
                    onClick={() => setSelected(1)}
                  >
                    Latest
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full ${selected === 2 ? 'bg-[#1867AE] text-white' : 'bg-gray-100 text-[#1F3A52]'} `}
                    onClick={() => setSelected(2)}
                  >
                    Popular
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <LatestPopularBlogs selected={selected} setSelected={setSelected} />
              </div>
            </div>

            {/* Explore Topics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-3">Explore Topics</h2>
              <div className="flex flex-col gap-2 text-sm">
                {exploreTopicsData.map((topic, index) => (
                  <Link key={index} href={""} className="text-[#1F3A52] hover:text-[#1867AE]">
                    <span className="mr-2 text-[#6B7280]">{index + 1}.</span> {topic}
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div> {/* end top grid */}

      </div> {/* end wrapper */}

      <Footer />
    </div>
  );
}
