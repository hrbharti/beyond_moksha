"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import founder from "../../../../../public/founder.jpeg"

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[30] transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-[72px] h-[calc(100vh-72px)] w-72 bg-white border-l border-gray-200 shadow-lg z-[40] transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-[#1F3A4B] hover:text-[#D4A043]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex flex-col items-center px-6 py-6 space-y-4 overflow-y-auto">
          {/* Profile section */}
          <div className="relative w-40 h-40 border-2 border-[#1F3A4B] rounded-[30px] overflow-hidden">
            <Image
              src={founder}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-xl font-serif font-semibold text-[#1F3A4B] mt-2">
            Name
          </h2>
          <p className="text-[#1F3A4B]/80 text-sm mb-6">DOB -- DOD</p>

          {/* Mobile Navigation Links */}
          <div className="md:hidden flex flex-col items-center space-y-4 text-[#1F3A4B] font-medium mt-4">
            <a
              href="#"
              className="hover:text-[#D4A043] transition"
              onClick={toggleSidebar}
            >
              Memorial
            </a>
            <a
              href="#"
              className="hover:text-[#D4A043] transition"
              onClick={toggleSidebar}
            >
              Gallery
            </a>
            <a
              href="#"
              className="hover:text-[#D4A043] transition"
              onClick={toggleSidebar}
            >
              Memory Wall
            </a>
            <a
              href="#"
              className="hover:text-[#D4A043] transition"
              onClick={toggleSidebar}
            >
              Favourites
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
