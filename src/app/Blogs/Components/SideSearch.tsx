import React from 'react'

export default function SideSearch() {
    return (
        <div className='w-72 relative'>
            <div className='absolute top-0 bottom-0 -right-8'><button type='submit' className='pl-10 text-right bg-blue-500 text-white px-3.5 py-1.5 rounded-full cursor-pointer bg-gradient-to-t from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600'>Submit</button></div>        
            <input type='text' placeholder='Search' className='w-60 px-3.5 py-1.5 outline outline-slate-300 rounded-full translate-z-1 bg-white'/>    
        </div>
    )
}
