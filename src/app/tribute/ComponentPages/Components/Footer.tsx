import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import bird from "../../../../../public/bird.png"

const Footer = () => {
  return (
    <footer className="bg-[#1F3A4B] text-white py-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">

        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <Image
              src={bird}
              alt="Beyond Moksha Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h2 className="text-2xl font-serif">
              <span className="text-[#E1B650]">Beyond</span>{" "}
              <span className="text-white">Moksha</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-300 font-light">
            सर्वसंस्कारसहायाः
          </p>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-light">
          <a href="#" className="hover:text-[#E1B650] transition-colors">Home</a>
          <a href="#" className="hover:text-[#E1B650] transition-colors">Tribute</a>
          <a href="#" className="hover:text-[#E1B650] transition-colors">Legacy Vault</a>
          <a href="#" className="hover:text-[#E1B650] transition-colors">About us</a>
          <a href="#" className="hover:text-[#E1B650] transition-colors">Blogs</a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-5 text-lg">
          <a href="#" className="hover:text-[#E1B650] transition-colors"><FaFacebookF /></a>
          <a href="#" className="hover:text-[#E1B650] transition-colors"><FaXTwitter /></a>
          <a href="#" className="hover:text-[#E1B650] transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-[#E1B650] transition-colors"><FaYoutube /></a>
          <a href="#" className="hover:text-[#E1B650] transition-colors"><FaLinkedinIn /></a>
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-sm text-gray-400 font-light border-t border-gray-600/30 w-full pt-4">
          © 2024 <span className="text-[#E1B650]">Beyond Moksha</span>. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
