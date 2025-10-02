'use client'
import { Navbar } from "./components/Navbar"
import Footer from "./components/Footer"
import Donation from "./components/Donation"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Donation />
      <Footer />
    </div>
  )
}
