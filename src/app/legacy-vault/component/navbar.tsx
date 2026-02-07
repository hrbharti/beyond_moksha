"use client";

import { useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar({ isNav }: { isNav?: boolean }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navList = ["Products", "Top Performers", "Privacy & Protection"];

  return (
    <>
      <div className="h-24 md:h-40 w-full flex justify-center items-center px-4 md:px-30 sticky top-0 z-50">
        <div className="flex h-16 md:h-[50%] w-full items-center justify-between px-4 md:px-6 py-2 md:py-12 rounded-[20px] border border-[#3B82F6]/30 bg-[#F1F8FC]/90 md:bg-[#F1F8FC]/65 backdrop-blur-sm shadow-sm">
          {/* Logo */}
          <div className="ml-0 md:ml-4">
            <Logo
              isNav={isNav}
              className="text-xl md:text-2xl"
              routeTo="/legacy-vault"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2 px-16 items-center">
            <div className="flex items-center ml-20 text-[#1E293B] text-lg">
              {navList.map((item) => (
                <span
                  key={item}
                  className="mx-4 cursor-pointer hover:text-[#0866FF] transition"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/legacy-vault/login"
              className="bg-[linear-gradient(90deg,#0866FF,#053D99)] px-6 py-2 text-white rounded-md hover:opacity-90 transition shadow-md"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-[#1E293B]"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="absolute top-0 right-0 h-full w-[280px] bg-[#F1F8FC] shadow-2xl p-6 flex flex-col gap-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <span className="font-lora font-semibold text-xl text-[#3C609B]">
                Menu
              </span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navList.map((item) => (
                <span
                  key={item}
                  className="text-lg text-[#1E293B] font-medium hover:text-[#0866FF] transition cursor-pointer"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-auto">
              <Link
                href="/legacy-vault/login"
                className="w-full bg-[linear-gradient(90deg,#0866FF,#053D99)] px-6 py-3 text-white rounded-lg hover:opacity-90 transition shadow-md font-medium"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
