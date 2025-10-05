'use client'
import { Button } from "../components/utils/Button"
import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"
import { Pledge } from "../components/Pledge"

export default function Home() {

  return <div className="bg-white">
    <Navbar />
    <Pledge/>
    <Footer />

  </div>
}