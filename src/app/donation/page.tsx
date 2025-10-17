import React from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import Donation from '../components/Donation'

export default function page() {
  return (
    <div>
      <Navbar />
      <Donation />
      <Footer />
    </div>
  )
}
