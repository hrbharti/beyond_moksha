"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react"; // ✅ cross icon
import bird from "../../../../../public/bird.png";
import Link from "next/link";

interface MemorialSidebarProps {
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

const MemorialSidebar: React.FC<MemorialSidebarProps> = ({
  isOpen = false,
  toggleSidebar,
}) => {
  const navItems = [
    {name : "Memorial", href: "#memorial"},
    {name : "Timeline", href: "#timeline"},
    {name : "Gallery", href: "#gallery"},
    {name : "Memory Wall", href: "#memory-wall"},
    {name : "Family Tree", href: "#family-tree"},
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-md flex flex-col pt-8 z-50
        transition-transform duration-500 ease-in-out
        ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"
        }`}
      >
        {/* Close Button (Mobile only) */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-[#1F3A4B] hover:text-[#D4A043] transition-colors"
          >
            <X size={26} />
          </button>
        </div>

        {/* Logo Section */}
        <Link href={"/"} className="flex flex-col items-center space-y-1 mb-12">
          <div>
          <div className="flex items-center space-x-2">
            <Image src={bird} alt="Logo" width={36} height={36} />
            <h1 className="font-serif text-xl text-[#1F3A4B] font-semibold">
              Beyond <span className="text-[#D4A043]">Moksha</span>
            </h1>
          </div>
          <div className="text-xs text-[#1F3A4B]/60 text-right">
            सर्वसंस्कारसहायाः
          </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col items-start space-y-8 pl-8 font-serif text-[#1F3A4B] w-full">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={toggleSidebar}
              className="hover:text-[#D4A043] text-lg transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto mb-8 text-xs text-[#1F3A4B]/60 text-center">
          © Beyond Moksha
        </div>
      </aside>
    </>
  );
};

export default MemorialSidebar;
