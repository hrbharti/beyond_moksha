import Footer from "@/app/components/Footer";
import TributeNavbar from "../ComponentPages/TributeNavbar";
import HonorYour from "../ComponentPages/HonorYour";
import HowItWorks from "../ComponentPages/HowItWorks";
import PickDesign from "../ComponentPages/PickDesign";
import FurryFriendsSection from "../ComponentPages/FurryFriendSection";
import RecentMemorials from "../ComponentPages/RecentMemorials";

export default function page() {
  return (
    <div>
      <div>
        <TributeNavbar />
        <div id="overview" className="scroll-mt-28">
          <HonorYour />
        </div>
        <RecentMemorials />
        <div id="features" className="scroll-mt-28">
          <HowItWorks />
        </div>
        <div id="designs" className="scroll-mt-28">
          <PickDesign />
        </div>
        <FurryFriendsSection />
      </div>
      <Footer />
    </div>
  );
}
