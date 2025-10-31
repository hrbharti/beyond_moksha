import Image from 'next/image'
import React from 'react'

export default function SideCard() {
  return (
    <div className='w-full h-28 flex rounded-sm outline-2 outline-slate-600'>
      <Image 
      className='w-2/5 h-full rounded-l-lg' 
      src={"/blog.jpg"} 
      alt='Blog_image'
      width={100}
      height={100}/>
      <p className='text-center my-auto'>Understanding funeral attire in India</p>
    </div>
  )
}
