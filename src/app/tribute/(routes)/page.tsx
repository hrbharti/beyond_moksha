import Footer from '@/app/components/Footer'
import { Navbar } from '@/app/components/Navbar'
import React from 'react'
import TributeSection from '../ComponentPages/TributeSection'
import TributeNavbar from '../ComponentPages/TributeNavbar'
import HonorYour from '../ComponentPages/HonorYour'
import HowItWorks from '../ComponentPages/HowItWorks'
import PickDesign from '../ComponentPages/PickDesign'
import FurryFriends from '../ComponentPages/FurryFriends'
import FurryFriendsSection from '../ComponentPages/FurryFriendSection'

export default function page() {
  return (
    <div>
      
        <div>
            <TributeNavbar />
            <HonorYour />
            <HowItWorks />
            <PickDesign />
            {/* <FurryFriends /> */}
            <FurryFriendsSection />
        </div>
      <Footer />
    </div>
  )
}
