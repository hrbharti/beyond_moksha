'use client'
import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"
import { Pledge } from "../components/Pledge"
import { Section } from "../components/utils/Section"
import { Services } from "../components/Services"
import { Blogs } from "../components/Blog"
import { Testimonials } from "../components/Testimonial"

export default function Home() {

  return <div className="bg-white">
    <Navbar />
    <Pledge/>

    {/* services */}
    <Section 
      heading="Our Services" 
      subHeading="We provide comprehensive services to support you through every step of your journey"
      content={<Services/>}
    />

    {/* blogs section */}
    <Section 
      heading="Latest From the Blogs" 
      subHeading="Insights, guidance, and support to help you navigate difficult times"
      content={<Blogs/>}
    />

    {/* testimonials */}
    
    <Section 
      heading="Hear from Families we’ve helped" 
      subHeading="Real testimonials from families who trusted us during their most difficult times"
      content={<Testimonials/>}
    />

    <Footer />

  </div>
}