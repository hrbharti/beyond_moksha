import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Testimonials } from "../components/Testimonial"
import { Section } from "../components/utils/Section"
import HeroSection from "./components/hero"
import AboutUsPage from "./components/main"

export default  function page (){

    return <div>
        <Navbar/>

        <HeroSection/>
        <AboutUsPage/>
        <Section 
            heading="Hear from Families we’ve helped" 
            subHeading="Real testimonials from families who trusted us during their most difficult times"
            content={<Testimonials/>}
        />
        <Footer/>
    </div>
}