import Footer from '@/app/components/Footer'
import { Navbar } from '@/app/components/Navbar'
import React from 'react'
import TributeSection from '../ComponentPages/TributeSection'
import TributeNavbar from '../ComponentPages/TributeNavbar'
import HonorYour from '../ComponentPages/HonorYour'
import HowItWorks from '../ComponentPages/HowItWorks'
import PickDesign from '../ComponentPages/PickDesign'
import FurryFriends from '../ComponentPages/FurryFriends'

export default function page() {
  return (
    <div>
      <Navbar />
        <div>
            <TributeSection />
            <TributeNavbar />
            <HonorYour />
            <HowItWorks />
            <PickDesign />
            <FurryFriends />
        </div>
      <Footer />
    </div>
  )
}
