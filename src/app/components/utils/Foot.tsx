"use client"
import Icon from "./Icon";
import Logo from "./Logo";

import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Foot() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col justify-end items-center">
      <div className="w-full bg-[#1F3A52] flex flex-col justify-between items-center gap-10 p-4 py-6">

        {/* Logo */}
        <div>
          <Logo isNav={false} />
        </div>

        {/* Navigation Links */}
        <div
          className="
            flex flex-wrap justify-center 
            gap-6 sm:gap-10 md:gap-14 
            text-center
          "
        >
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            Home
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/aboutus")}>
            About Us
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            Services
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            Special Services
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/Blogs")}>
            Blogs
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <Icon icon={FaFacebook} onClick={() => window.open("https://facebook.com", "_blank")} />
          <Icon icon={RiTwitterXLine} onClick={() => window.open("https://x.com/beyondmoksha360", "_blank")} />
          <Icon icon={BsInstagram} onClick={() => window.open("https://www.instagram.com/beyondmoksha360", "_blank")} />
          <Icon icon={ImLinkedin} onClick={() => window.open("https://www.linkedin.com/company/beyondmoksha360/", "_blank")} />
          <Icon icon={IoLogoYoutube} onClick={() => window.open("https://youtube.com/@beyondmoksha360", "_blank")} />
        </div>

        {/* Rights Notice */}
        <div className="text-sm text-center px-4">
          © 2025 Beyond Moksha. All Rights Reserved.
        </div>

      </div>
    </div>
  );
}
