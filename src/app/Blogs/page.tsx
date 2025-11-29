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
  coverImageUrl: string;
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
      const endpoint = query.trim() ? '/blogs/search' : '/blogs';
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
      <div className='px-25 flex gap-6 mt-6 pb-2'>
        <div className='w-3/4 outline-2 outline-slate-600 rounded-2xl'>
          <h1 className='text-4xl text-center mt-5 font-lora font-semibold text-[#BC911B]'>
            {inputValue ? `Search Results for "${inputValue}"` : 'Blogs'}
          </h1>

          {/* Loading State */}
          {loading && (
            <div className='flex justify-center items-center py-12'>
              <p className='text-lg text-gray-500'>Loading blogs...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='flex justify-center items-center py-12'>
              <p className='text-lg text-red-500'>{error}</p>
            </div>
          )}

          {/* Blogs Grid */}
          {!loading && blogs.length > 0 && (
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={String(blog.id)}
                  title={blog.title}
                  image={blog.coverImageUrl}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && blogs.length === 0 && !error && (
            <div className='flex justify-center items-center py-12'>
              <p className='text-lg text-gray-500'>
                {inputValue ? 'No blogs found matching your search' : 'No blogs found'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 pb-8 mt-4'>
              {/* Previous Button */}
              <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'
              >
                &#8249;
              </button>

              {/* Page Numbers */}
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

              {/* Next Button */}
              <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'
              >
                &#8250;
              </button>
            </div>
          )}
        </div>

        {/* ...existing code... */}
        <div className='w-1/4 flex flex-col'>
          <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center py-3'>
            <h1 className='mb-2 text-2xl'>Browse Blogs</h1>
            <SideSearch searchString={inputValue} handleSearchChange={handleSearchChange} />
          </div>
          <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center gap-6 px-4 py-6 mt-6'>
            <LatestPopularBlogs selected={selected} setSelected={setSelected} />
          </div>
          <div className='flex-1 outline-2 outline-slate-500 rounded-lg mt-6'>
            <h1 className='text-3xl text-center'>Explore Topics</h1>
            <div className='flex flex-col p-4 gap-y-2'>
              {exploreTopicsData.map((topic, index) => (
                <div key={index}>
                  <Link className='' href={""}>{index + 1}. {topic}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
