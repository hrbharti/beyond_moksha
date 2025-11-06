"use client";

import { useState } from "react";
import Link from "next/link";

export default function TributeNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-[#1F3A4B] text-white py-4">
            <div className="container mx-auto px-10 md:px-24 flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-4xl font-serif text-[#D4A043] tracking-wide">
                    Tribute
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 text-xl">
                    <Link href="#" className="text-[#D4A043] hover:text-[#E6B75B] transition font-thin">
                        Overview
                    </Link>
                    <Link href="#" className="hover:text-[#D4A043] transition font-thin">
                        Designs
                    </Link>
                    <Link href="#" className="hover:text-[#D4A043] transition font-thin">
                        Features
                    </Link>
                    <Link href="#" className="hover:text-[#D4A043] transition font-thin">
                        F.A.Q
                    </Link>
                    <Link href="#" className="hover:text-[#D4A043] transition font-thin">
                        Login
                    </Link>
                    <Link
                        href="#"
                        className="bg-gradient-to-b from-[#e1a935] to-[#c19232] text-white px-2 py-2 rounded-md hover:bg-[#C18E33] transition font-thin"
                    >
                        Create memorial
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col space-y-1 focus:outline-none"
                >
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#1F3A4B] px-6 pt-3 pb-5 space-y-3 border-t border-[#2E4D5F]">
                    <Link href="#" className="block text-[#D4A043] font-medium">
                        Overview
                    </Link>
                    <Link href="#" className="block hover:text-[#D4A043]">
                        Designs
                    </Link>
                    <Link href="#" className="block hover:text-[#D4A043]">
                        Features
                    </Link>
                    <Link href="#" className="block hover:text-[#D4A043]">
                        F.A.Q
                    </Link>
                    <Link href="#" className="block hover:text-[#D4A043]">
                        Login
                    </Link>
                    <Link
                        href="#"
                        className="block bg-[#D4A043] text-center text-white font-medium px-4 py-2 rounded-md hover:bg-[#C18E33] transition"
                    >
                        Create memorial
                    </Link>
                </div>
            )}
        </nav>
    );
}
