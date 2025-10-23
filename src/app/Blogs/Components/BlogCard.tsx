import Image from 'next/image'
import React from 'react'

export default function BlogCard({tag, title} : {tag : string, title : string}) {
  return (
    <div className='w-36 h-52 rounded-lg outline p-0.5'>
      <Image 
        className='h-28 bg-slate-500 rounded-t-lg' 
        src={"https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"} 
        alt='placeholder' 
        width={150}
        height={100}/>
      <p className='text-sm text-white bg-slate-600 w-fit px-4 py-0.5 mt-1'>{tag}</p>
      <h1 className='text-xl mt-1'>{title}</h1>
    </div>
  )
}
