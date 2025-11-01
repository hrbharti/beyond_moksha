"use client"
import React, { useState } from 'react'
import PriceCard from './PriceCard'
import { Heart } from "@deemlol/next-icons";
import { Star } from "@deemlol/next-icons";
import { Book } from "@deemlol/next-icons"
import { Users } from "@deemlol/next-icons";
import { Perks } from '../donation/Components/Perks';
import {Cards} from '../donation/Components/Card';
import Carousel from './Corousal'
import { HeroSection } from '../donation/hero';

export default function ContactUs() {
  const [selected, setSelected] = useState<number>(1);

  const cards = [
    {
      id: 0,
      logo: <Heart size={30} color="#f4ac5a" />,
      price: 1000,
      title: "Gentle Support",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "Every act of kindness matters."
    },
    {
      id: 1,
      logo: <Users size={30} color="#f4ac5a" />,
      price: 5000,
      title: "Compassionate Care",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "Together we are stronger."
    },
    {
      id: 2,
      logo: <Book size={30} color="#f4ac5a" />,
      price: 15000,
      title: "Legacy Guardian",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "A legacy built on compassion."
    },
    {
      id: 3,
      logo: <Star size={30} color="#f4ac5a" />,
      price: 50000,
      title: "Hope Builder",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, nisi!",
      motto: "Hope shines the brightest."
    },
  ];

  return (
    <div className='border border-slate-300  pb-6'>
      <HeroSection/>
      <div className=' flex flex-col items-center justify-center px-84 mt-20'>
        <div>
          <h1 className='text-4xl text-[#1867AE] font-semibold'>Your Heart Can Heal Hearts</h1> 
        </div>
        <div className='text-center'>
          When families face their darkest hours, your support becomes a beacon of hope. Together, we&apos;re not just building services - we&apos;re crafting moments of peace, dignity, and love that will be remembered forever.
        </div>
      </div>
      {/* Perks */}
      <div className='mt-20 px-34 flex items-center justify-center'>
        <div className=' flex items-center justify-between w-275.75'>
          <Perks heading='24x7' subHeading='Seamless Service'/>
          <Perks heading='₹26K Cr' subHeading='Market Impact'/>
          <Perks heading='Delhi First' subHeading='Tech Platform'/>
        </div>
      </div>
      {/* cards */}
      <div className='mt-20 px-34'>
        <Cards/>
      </div>
      <h1 className='text-center font-semibold text-4xl mt-4'>Choose how you want to help</h1>
      <div className="flex gap-8 items-center justify-center mt-10 px-34">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelected(card.id)} >
            <PriceCard {...card} isSelected={selected === card.id}/>
          </div>
        ))}
      </div>
      <h1 className='px-14 py-1.5 border-2 border-slate-500 bg-slate-200 w-fit rounded-md mx-auto mt-10 mb-6 font-semibold text-slate-600'>Custom Amount (₹)</h1>
      <form className='px-34'>
        <div className='flex justify-between '>
          <div className='w-[48%]'>
            <p className='text-lg font-bold mb-1.5'>Full name *</p>
            <input type='text' placeholder='Your Full Name' required className='px-3 py-1.5 outline-none text-lg rounded-sm font-normal bg-slate-200 text-slate-600 border border-slate-500 w-full' />
          </div>
          <div className='w-[48%]'>
            <p className='text-lg font-bold mb-1.5'>Email Address</p>
            <input type='email' placeholder='your.email@example.com' className='px-3 py-1.5 outline-none text-lg rounded-sm font-normal bg-slate-200 text-slate-600 border border-slate-500 w-full' />
          </div>
        </div>

        <div className='flex mt-4 justify-between'>
          <div className='w-[48%]'>
            <p className='text-lg font-bold mb-1.5'>Phone Number *</p>
            <input type='text' placeholder='Your Full Name' required className='px-3 py-1.5 outline-none text-lg rounded-sm font-normal bg-slate-200 text-slate-600 border border-slate-500 w-full' />
          </div>
          <div className='w-[48%]'>
            <p className='text-lg font-bold mb-1.5'>Message</p>
            <textarea placeholder='Your message' className='px-3 py-1.5 outline-none text-lg rounded-sm font-normal bg-slate-200 text-slate-600 border border-slate-500 w-full' />
          </div>
        </div>
        <button type='submit' className='py-8 bg-[#f4ac5a] w-full rounded-xl mt-4'>
          <p className='text-md text-white font-medium'>Your Gift of Compassion</p>
          <p className='text-5xl font-bold text-white my-3'>₹ {cards[selected].price}</p>
          <p className='text-md text-white font-medium'>{cards[selected].motto}</p>
        </button>
      </form>
    </div>
  )
}
