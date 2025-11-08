'use client'
import { Navbar } from "./components/Navbar"
import Footer from "./components/Footer"
import Corousal from "./components/Corousal"
import { Pledge } from "./components/Pledge"
import { Section } from "./components/utils/Section"
import { Services } from "./components/Services"
import { Blogs } from "./components/Blog"
import { Testimonials } from "./components/Testimonial"
import { useRef } from "react"
import Partner from "./components/Partner"
import GetInTouch from "./components/utils/GetInTouch"
import Foot from "./components/utils/Foot"

export default function Home() {

  const servicesRef = useRef<HTMLHeadingElement>(null);
  const homeRef = useRef<HTMLHeadingElement>(null);
  const blogRef = useRef<HTMLHeadingElement>(null);

  const scrollToSection = (section: string) => {
    switch (section) {
      case "Home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Our Services":
        servicesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Blogs":
        blogRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div>
      <Navbar onNavigate={scrollToSection} />
      <div ref={homeRef}>
        <Corousal />
      </div>
      <Pledge />

      {/* services */}
      <div ref={servicesRef} className="-mt-10">
        <Section
          heading="Our Services"
          subHeading="We provide comprehensive services to support you through every step of your journey"
          content={<Services />}
        />
      </div>

      {/* blogs section */}
      <div ref={blogRef} className="mt-18">
        <Section
          heading="Latest From the Blogs"
          subHeading="Insights, guidance, and support to help you navigate difficult times"
          content={<Blogs />}
        />
      </div>

      {/* testimonials */}

      <Section
        heading="Hear from Families we’ve helped"
        subHeading="Real testimonials from families who trusted us during their most difficult times"
        content={<Testimonials />}
      />
      
          {/* Footer */}
          <div className="h-auto w-full mt-10 text-white" >
          
                  {/* mail */}
          
                  <div className="h-2/3 pb-30 px-34 ">
                      <GetInTouch />
                  </div>
          
                 
                  
                  <Partner/>
                   {/* Absolute footer */}
                  <div className=" h-1/3 ">
          
                      <Foot />
          
                  </div>
              </div>
    </div>
  )
}
