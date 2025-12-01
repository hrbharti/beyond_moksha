"use client";

import Logo from "@/app/components/utils/Logo";
import Image from "next/image";
import Icon from "../../components/utils/Icon";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-[#17344B] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Row (kept desktop structure intact) */}
        <div className="flex flex-col justify-between items-start gap-6">
          {/* Logo + Tagline */}
          <div className="w-full flex justify-start">
            <Logo isNav={false} />
          </div>

          {/* Payment Icons - responsive sizing and alignment */}
          <div className="w-full flex flex-col items-start md:items-end text-left md:text-right">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image src="/gpay.png" alt="UPI Accepted" fill className="object-contain" />
              </div>
              <div className="w-8 h-8 relative">
                <Image src="/bhim.png" alt="Card Accepted" fill className="object-contain" />
              </div>
            </div>
            <p className="text-gray-200 text-sm mt-1">Upi and Card Accepted</p>
          </div>

          {/* Navigation (wraps on small screens) */}
          <div className="flex flex-wrap justify-start md:justify-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">About us</a>
            <a href="#" className="hover:text-gray-300">Our Services</a>
            <a href="#" className="hover:text-gray-300">Special Services</a>
            <a href="#" className="hover:text-gray-300">Blogs</a>
          </div>
        </div>

        {/* Social Icons (center on small screens, left on md+) */}
        <div className="flex flex-wrap items-center gap-6 text-lg mt-10 justify-center md:justify-start">
          <Icon icon={FaFacebook} onClick={() => window.open('https://facebook.com', '_blank')} />
          <Icon icon={RiTwitterXLine} onClick={() => window.open('https://x.com/beyondmoksha360?t=D9sL0243Mb32RhXAy-vZ2A&s=09', '_blank')} />
          <Icon icon={BsInstagram} onClick={() => window.open('https://www.instagram.com/beyondmoksha360?igsh=MWNhMHdhYzlnbzRhaw==', '_blank')} />
          <Icon icon={ImLinkedin} onClick={() => window.open('https://www.linkedin.com/company/beyondmoksha360/', '_blank')} />
          <Icon icon={IoLogoYoutube} onClick={() => window.open('https://youtube.com/@beyondmoksha360?si=s5YThsuU4FPCRwz4', '_blank')} />
        </div>

        {/* Divider / Copyright */}
        <div className="mt-8 pt-4 text-center">
          <p className="text-gray-200 text-sm">
            © 2025 Beyond Moksha. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
