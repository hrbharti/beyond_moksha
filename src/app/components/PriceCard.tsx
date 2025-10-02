import React, { ReactElement } from 'react'

interface propType {
  logo: ReactElement
  price: number,
  title: string,
  description: string,
  motto: string,
  isSelected?: boolean;
}

export default function PriceCard({ logo, price, title, description, motto, isSelected }: propType) {
  return (
    <div className={`px-6 py-8 border-2  max-w-56 rounded-lg flex flex-col gap-2.5 duration-500 
    ${isSelected ? "scale-110 shadow-2xl bg-[#f4ac5a]/10 border-[#f4ac5a]" : "bg-white border-gray-300"} 
    hover:scale-110 hover:shadow-2xl`}>
      {logo}
      <p className='text-3xl font-semibold'>₹ {price}</p>
      <h1 className='font-semibold'>{title}</h1>
      <p className='text-xs'>{description}</p>
      <p className='text-xs text-[#f4ac5a]'>{motto}</p>
    </div>
  )
}
