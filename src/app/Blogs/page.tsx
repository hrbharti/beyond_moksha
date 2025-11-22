// "use client"
// import React, { useState } from 'react'
// import { Navbar } from '../components/Navbar'
// import Footer from '../components/Footer'
// import BlogCard from './Components/BlogCard'
// import SideCard from './Components/SideCard'
// import SideSearch from './Components/SideSearch'
// import { latestBlogsData } from './Components/latest-popular-data'
// import { blogsData } from './Components/blogs-data'
// import { exploreTopicsData } from './Components/explore-topics-data'
// import Link from 'next/link'

// export default function Page() {
//   const [selected, setSelected] = useState(1);

//   return (
//     <div>
//       <Navbar />
//       <div className='px-25 flex gap-6 mt-6 pb-2'>
//         <div className='w-3/4 outline-2 outline-slate-600 rounded-2xl'>
//           <h1 className='text-5xl text-center mt-5 font-lora font-normal'>Blogs</h1>
//           <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
//             {blogsData.map((blog) => (
//               <BlogCard key={blog.id} {...blog} />
//             ))}
//           </div>
//         </div>
//         <div className='w-1/4'>
//           <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center py-3'>
//             <h1 className='mb-2 text-2xl'>Browse Blogs</h1>
//             <SideSearch />
//           </div>
//           <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center gap-6 px-4 py-6 mt-6'>
//             <div className="flex w-full">
//               <button className={`flex-1 py-1.5 transition-all font-medium duration-300 ${selected === 1 ? "bg-linear-to-t from-[#1F3A52] to-[#4682B8] rounded-full text-white shadow-md" : ""}`} onClick={() => setSelected(1)}> Latest </button>
//               <button className={`flex-1 py-1.5 transition-all font-medium duration-300 ${selected === 0 ? "bg-linear-to-t from-[#1F3A52] to-[#4682B8] rounded-full text-white shadow-md" : ""}`} onClick={() => setSelected(0)}> Popular </button>
//             </div>
//             <div className='flex flex-col gap-y-3'>
//               {latestBlogsData.map((blog, index) => (
//                 <SideCard key={blog.id} {...blog} needDivider={index !== latestBlogsData.length - 1} />
//               ))}
//             </div>
//           </div>
//           <div className='outline-2 outline-slate-500 rounded-lg  mt-6'>
//             <h1 className='text-3xl text-center '>Explore Topics</h1>
//             <div className='flex flex-col p-4 gap-y-2'>
//               {exploreTopicsData.map((topic, index) => (
//                 <div key={index}>
//                   <Link className='' href={""}>{index + 1}. {topic}</Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

"use client"
import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from './Components/BlogCard'
import SideCard from './Components/SideCard'
import SideSearch from './Components/SideSearch'
import { latestBlogsData } from './Components/latest-popular-data'
import { blogsData } from './Components/blogs-data'
import { exploreTopicsData } from './Components/explore-topics-data'
import Link from 'next/link'

export default function Page() {
  const [selected, setSelected] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9; // 3 rows × 3 columns

  // Calculate pagination
  const totalPages = Math.ceil(blogsData.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogsData.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <h1 className='text-5xl text-center mt-5 font-lora font-normal'>Blogs</h1>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>

          {/* Pagination */}
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
        </div>

        {/* ...existing code... */}
        <div className='w-1/4 flex flex-col'>
          <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center py-3'>
            <h1 className='mb-2 text-2xl'>Browse Blogs</h1>
            <SideSearch />
          </div>
          <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center gap-6 px-4 py-6 mt-6'>
            <div className="flex w-full">
              <button className={`flex-1 py-1.5 transition-all font-medium duration-300 ${selected === 1 ? "bg-linear-to-t from-[#1F3A52] to-[#4682B8] rounded-full text-white shadow-md" : ""}`} onClick={() => setSelected(1)}> Latest </button>
              <button className={`flex-1 py-1.5 transition-all font-medium duration-300 ${selected === 0 ? "bg-linear-to-t from-[#1F3A52] to-[#4682B8] rounded-full text-white shadow-md" : ""}`} onClick={() => setSelected(0)}> Popular </button>
            </div>
            <div className='flex flex-col gap-y-3'>
              {latestBlogsData.map((blog, index) => (
                <SideCard key={blog.id} {...blog} needDivider={index !== latestBlogsData.length - 1} />
              ))}
            </div>
          </div>
          <div className='flex-1 outline-2 outline-slate-500 rounded-lg  mt-6'>
            <h1 className='text-3xl text-center '>Explore Topics</h1>
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
