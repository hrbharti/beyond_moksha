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
      <div id="products" className="scroll-mt-24 md:scroll-mt-40">
        <ProductsHeading />
        <EmotionalWill />
        <Page />
        <CreateWill />
        <AssetVaultSection />
      </div>
      <div id="why-choose" className="scroll-mt-24 md:scroll-mt-40"><WhyChooseLegacyVault /></div>
      <div id="security" className="scroll-mt-24 md:scroll-mt-40"><SecureSection /></div>
      <Footer />
    </div>
  );
}
