import { Navbar } from "../components/Navbar";
import Blog from "./component/Blog";
import FeaturedPoojaServices from "./component/FeaturedPooja";
import Hero from "./component/Hero";
import HowItWorks from "./component/Howitworks";
import SacredServices from "./component/SacredServices";
import Testimonials from "./component/Testimonial";
import TrendingPoojas from "./component/TrendingPooja";
import WhyChooseUs from "./component/WhyChooseUs";
import FormPage from "./component/FormPage";
import JoinPanditSection from "./component/Req";
import Footer from "./component/Footer";

export default function PanditBookingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="mt-20">
        <TrendingPoojas />
      </div>
      <div>
        <FeaturedPoojaServices />
      </div>
      <div>
        <SacredServices />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <Blog />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Testimonials />
      </div>
      <div id="booking">
        <FormPage />
      </div>
      <div>
        <JoinPanditSection />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
