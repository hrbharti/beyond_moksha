"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/app/components/utils/Logo";
import { useUser } from "@/hooks/useUser";

export default function TributeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const navItems = [
    { name: "Overview", href: "#overview" },
    { name: "Designs", href: "#designs" },
    { name: "Features", href: "#features" },
  ];

  return (
    <>
      <div className="h-28 md:h-40 w-full flex justify-center items-center px-4 md:px-30 sticky top-0 z-50 pointer-events-none">
        <div className="pointer-events-auto flex h-16 md:h-[50%] w-full max-w-7xl items-center justify-between py-4 md:py-12 px-4 md:px-12 rounded-[20px] border-[2px] border-[#D4A043]/30 bg-white/95 backdrop-blur-md shadow-lg relative z-50">
          <div className="flex-shrink-0 w-[200px] md:w-auto -ml-2 md:ml-0">
            <div className="scale-[0.6] md:scale-100 origin-left">
              <Logo isNav={true} />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center text-[#D4A043] text-lg font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="mx-4 hover:text-[#B6761E] transition"
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Link
                  href="/tribute/profile"
                  className="mx-4 hover:text-[#B6761E] transition"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  href="/tribute/login"
                  className="mx-4 hover:text-[#B6761E] transition"
                >
                  Login
                </Link>
              )}
            </div>

            <div>
              <Link
                href="/tribute/memorial?theme=1"
                className="bg-[#D4A043] text-white px-6 py-2 rounded-md hover:bg-[#C18E33] transition shadow-md"
              >
                Create memorial
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#D4A043] p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/98 z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden flex flex-col items-center justify-center space-y-8`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl text-[#1E293B] hover:text-[#D4A043] font-medium transition"
          >
            {item.name}
          </Link>
        ))}
        <Link
          href="/tribute/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl text-[#1E293B] hover:text-[#D4A043] font-medium transition"
        >
          Login
        </Link>
        <Link
          href="/tribute/memorial?theme=1"
          onClick={() => setIsMobileMenuOpen(false)}
          className="bg-[#D4A043] text-white px-8 py-3 rounded-md text-xl font-medium hover:bg-[#C18E33] transition shadow-md"
        >
          Create memorial
        </Link>
      </div>
    </>
  );
}
