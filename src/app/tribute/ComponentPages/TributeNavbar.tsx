"use client";

import Link from "next/link";
import Logo from "@/app/components/utils/Logo";

export default function TributeNavbar() {
  return (
    <nav className="w-full bg-white text-white py-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo isNav={true} />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-xl text-[#D4A043]">
          <Link href="#overview" className="hover:text-[#B6761E] transition">
            Overview
          </Link>
          <Link href="#designs" className="hover:text-[#B6761E] transition">
            Designs
          </Link>
          <Link href="#features" className="hover:text-[#B6761E] transition">
            Features
          </Link>
          <Link href="/tribute/login">Login</Link>
          <Link
            href="/tribute/memorial?theme=1"
            className="bg-[#D4A043] text-white px-4 py-2 rounded-lg hover:bg-[#C18E33] transition"
          >
            Create memorial
          </Link>
        </div>
      </div>
    </nav>
  );
}
