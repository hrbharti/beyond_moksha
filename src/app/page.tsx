'use client'
import { Navbar } from "./components/Navbar"
import Footer from "./components/Footer"
import Corousal from "./components/Corousal"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Corousal />
      <Footer />
    </div>
  )
}
