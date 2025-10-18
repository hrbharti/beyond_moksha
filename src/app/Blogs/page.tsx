"use client"
import React, { useState } from 'react'
import BlogCard from './Components/BlogCard'
import SideCard from './Components/SideCard'
import SideSearch from './Components/SideSearch'

export default function page() {
  const [selected, setSelected] = useState(1);

  return (
    <div>
      <div className='px-25 flex h-[200vh] gap-6 mt-6'>
        <div className='w-3/5 outline-2 outline-slate-600 rounded-2xl'>
          <h1 className='text-5xl text-center font-bold mt-5'>Blogs</h1>
          <div className='mt-10 flex gap-6 flex-wrap items-center justify-center'>
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
        <div className='w-2/5 h-[200vh]'>
          <div className='outline-2 outline-slate-500 rounded-lg flex flex-col items-center justify-center py-4'>
            <h1>Browse Blogs</h1>
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
          <div className='outline-2 outline-slate-500 rounded-lg h-screen mt-6'>
            <h1 className='text-3xl text-center '>Explore Topics</h1>
          </div>
        </div>
      </div>
    </div>
  )
}