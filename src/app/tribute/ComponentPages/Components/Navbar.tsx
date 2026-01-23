"use client";

import React from "react";
import { Menu } from "lucide-react";
import Logo from "@/app/components/utils/Logo";
import { useState } from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [activeTab, setActiveTab] = useState("#memorial");

  const handleNavClick = (hash: string) => {
    setActiveTab(hash);
  };

  const navLinks = [
    { name: "Memorial", href: "#memorial" },
    { name: "Gallery", href: "#gallery" },
    { name: "Memory Wall", href: "#memory-wall" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-[60]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo isNav={true} routeTo="/tribute"/>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-[#1F3A4B] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`transition ${
                activeTab === link.href
                  ? "text-[#D4A043] font-semibold"
                  : "hover:text-[#D4A043]"
              }`}
            >
              {link.name}
            </a>
          ))}
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
