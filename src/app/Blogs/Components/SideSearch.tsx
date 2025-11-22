import React from 'react'

export default function SideSearch() {
    return (
        <div className='w-full flex justify-center relative p-4'>
            <input
                type='text'
                placeholder='Search'
                className='w-[70%] px-3.5 py-2 shadow-2xl outline-none shadow-gray-400 bg-white rounded-full z-20'
            />
            <button
                type='submit'
                className='flex-1 ml-[-32px] text-right bg-linear-to-t from-[#1F3A52] to-[#4682B8] text-white px-6 py-2 rounded-full cursor-pointer'
            >
                Submit
            </button>
        </div>
    )
}
