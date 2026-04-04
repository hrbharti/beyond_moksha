import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(90deg,#02204a,#04306d)] text-white py-8 px-4 min-h-[200px] flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-6">
        <Logo className="text-2xl" />

        <div className="flex gap-10 text-sm">
          <a href="#products" className="hover:text-gray-300 transition">
            Products
          </a>
          <a href="#why-choose" className="hover:text-gray-300 transition">
            Why Choose Us
          </a>
          <a
            href="#security"
            className="hover:text-gray-300 transition"
          >
            Security
          </a>
        </div>

        <div className="flex items-center gap-4 text-xl">
          <a href="https://www.facebook.com/beyondmoksha360" target="_blank" rel="noopener noreferrer" className="text-inherit">
            <FaFacebook className="hover:text-gray-300 cursor-pointer transition" />
          </a>
          <a href="https://x.com/beyondmoksha360" target="_blank" rel="noopener noreferrer" className="text-inherit">
            <FaXTwitter className="hover:text-gray-300 cursor-pointer transition" />
          </a>
          <a href="https://www.instagram.com/beyondmoksha360" target="_blank" rel="noopener noreferrer" className="text-inherit">
            <FaInstagram className="hover:text-gray-300 cursor-pointer transition" />
          </a>
          <a href="https://youtube.com/@beyondmoksha360" target="_blank" rel="noopener noreferrer" className="text-inherit">
            <FaYoutube className="hover:text-gray-300 cursor-pointer transition" />
          </a>
          <a href="https://www.linkedin.com/company/beyondmoksha360/" target="_blank" rel="noopener noreferrer" className="text-inherit">
            <FaLinkedin className="hover:text-gray-300 cursor-pointer transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
