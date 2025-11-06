import { Navbar } from "../components/Navbar";
import FeaturedPoojaServices from "./component/FeaturedPooja";
import Hero from "./component/Hero";
import HowItWorks from "./component/Howitworks";
import SacredServices from "./component/SacredServices";
import TrendingPoojas from "./component/TrendingPooja";

export default function PanditBookingPage() {
  return (
    <div>
      <Navbar/>
      <Hero />
      
      <div className="mt-20">
        <TrendingPoojas />
      </div>

      <div>
        <FeaturedPoojaServices />
      </div>

      <div>
        <SacredServices/>
      </div>

      <div>
        <HowItWorks/>
      </div>
    </div>
  );
}
