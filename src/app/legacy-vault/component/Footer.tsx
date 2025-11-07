import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // <-- replace this with your logo path
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(90deg,#02204a,#04306d)] text-white py-8 px-4 h-60 flex items-end justify-centers">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-6">

        {/* Left Logo + Subtitle */}
        <Logo />

        {/* Navigation */}
        <div className="flex gap-10 text-sm">
          <a href="#" className="hover:text-gray-300 transition">Products</a>
          <a href="#" className="hover:text-gray-300 transition">Top Performers</a>
          <a href="#" className="hover:text-gray-300 transition">Privacy & Protection</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-xl">
          <FaFacebook className="hover:text-gray-300 cursor-pointer transition" />
          <FaXTwitter className="hover:text-gray-300 cursor-pointer transition" />
          <FaInstagram className="hover:text-gray-300 cursor-pointer transition" />
          <FaYoutube className="hover:text-gray-300 cursor-pointer transition" />
          <FaLinkedin className="hover:text-gray-300 cursor-pointer transition" />
        </div>

      </div>
    </footer>
  );
}
