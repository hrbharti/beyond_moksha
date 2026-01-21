"use client";

import React from "react";
import { Menu } from "lucide-react";
import bird from "@public/images/bird.png";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-[60]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={"/"} className="flex items-center space-x-2">
          <Image
            src={bird}
            alt="Beyond Moksha Logo"
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="text-xl font-serif text-[#1F3A4B]">
              <span className="text-[#1F3A4B]">Beyond</span>{" "}
              <span className="text-[#D4A043]">Moksha</span>
            </h1>
            <p className="text-sm text-gray-500 -mt-1">सर्वसंस्कारसहायाः</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-[#1F3A4B] font-medium">
          <a href="#memorial" className="hover:text-[#D4A043] transition">
            Memorial
          </a>
          <a href="#gallery" className="hover:text-[#D4A043] transition">
            Gallery
          </a>
          <a href="#memory-wall" className="hover:text-[#D4A043] transition">
            Memory Wall
          </a>
          <a href="#" className="hover:text-[#D4A043] transition">
            Favourites
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-[#1F3A4B] focus:outline-none"
        >
          <Menu size={26} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
