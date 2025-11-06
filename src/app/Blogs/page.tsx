"use client"
import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from './Components/BlogCard'
import SideCard from './Components/SideCard'
import SideSearch from './Components/SideSearch'

export default function Page() {
  const [selected, setSelected] = useState(1);

  return (
    <div>
      <Navbar />
      <div className='px-25 flex h-[300vh] gap-6 mt-6 pb-2'>
        <div className='w-3/4 outline-2 outline-slate-600 rounded-2xl'>
          <h1 className='text-5xl text-center font-bold mt-5'>Blogs</h1>
          <div className='w-full flex flex-wrap justify-center gap-18 pt-10'>
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
            <BlogCard tag={"Card tag"} title='Your title' />
          </div>
        </div>
        <div className='w-1/4 h-[300vh] '>
          <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center py-3'>
            <h1 className='mb-2 text-2xl'>Browse Blogs</h1>
            <SideSearch />
          </div>
          <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center gap-6 px-5 py-6 mt-6'>
            <div className="flex">
              <button className={`px-3 py-1.5 transition-all duration-300 ${selected === 1 ? "bg-blue-500 rounded-full text-white shadow-md" : "" }`} onClick={() => setSelected(1)}> Latest </button>
              <button className={`px-3 py-1.5 transition-all duration-300 ${selected === 0 ? "bg-blue-500 rounded-full text-white shadow-md" : "" }`} onClick={() => setSelected(0)}> Popular </button>
            </div>
            <SideCard />
            <SideCard />
            <SideCard />
          </div>
          <div className='outline-2 h-[211vh] outline-slate-500 rounded-lg  mt-6'>
            <h1 className='text-3xl text-center '>Explore Topics</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

