import React from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import Donation from '../components/Donation'
import { Perks } from '../donation/Components/Perks';
import { Cards } from '../donation/Components/Card';
import { HeroSection } from '../donation/hero';

export default function page() {
  return (
    <div>
      <Navbar />
      {/* <Corousal /> */}
      <HeroSection />
      <div className='flex flex-col items-center justify-center px-84 mt-20'>
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
          <Perks heading='24x7' subHeading='Seamless Service' />
          <Perks heading='₹26K Cr' subHeading='Market Impact' />
          <Perks heading='Delhi First' subHeading='Tech Platform' />
        </div>
      </div>
      {/* cards */}
      <div className='mt-20 px-34'>
        <Cards />
      </div>
      <div className='px-40 mt-6'>
        <Donation />
      </div>
      <Footer />
    </div>
  )
}
