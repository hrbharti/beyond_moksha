import Page from "./component/Page";
import EmotionalWill from "./component/EmotionalWill";
import Hero from "./component/Hero";
import Navbar from "./component/navbar";
import ProductsHeading from "./component/ProductHeading";
import CreateWill from "./component/CreateWill";
import AssetVaultSection from "./component/AssetVault";
import WhyChooseLegacyVault from "./component/WhyChoose";
import SecureSection from "./component/Secure";
import Footer from "./component/Footer";

export default function page() {
  return (
    <div className="bg-[#F1F8FC]">
      <Navbar isNav={true} />
      <Hero />
      <ProductsHeading />
      <EmotionalWill />
      <Page />
      <CreateWill />
      <AssetVaultSection />
      <WhyChooseLegacyVault />
      <SecureSection />
      <Footer />
    </div>
  );
}
