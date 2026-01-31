"use client";
import Icon from "./utils/Icon";
import Logo from "./utils/Logo";

import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-end items-center text-white">
      <div className="w-full bg-[#1F3A52] flex flex-col justify-between items-center gap-10 p-4 py-6">
        {/* Logo */}
        <Logo isNav={false} />

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
          <div
            className="cursor-pointer"
            onClick={() => router.push("/tribute")}
          >
            Tribute
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/legacy-vault")}
          >
            Legacy Vault
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/aboutus")}
          >
            About us
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/blogs")}>
            Blogs
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <Icon
            icon={FaFacebook}
            onClick={() => window.open("https://facebook.com", "_blank")}
          />
          <Icon
            icon={RiTwitterXLine}
            onClick={() =>
              window.open("https://x.com/beyondmoksha360", "_blank")
            }
          />
          <Icon
            icon={BsInstagram}
            onClick={() =>
              window.open("https://www.instagram.com/beyondmoksha360", "_blank")
            }
          />
          <Icon
            icon={ImLinkedin}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/beyondmoksha360/",
                "_blank",
              )
            }
          />
          <Icon
            icon={IoLogoYoutube}
            onClick={() =>
              window.open("https://youtube.com/@beyondmoksha360", "_blank")
            }
          />
        </div>

        {/* Rights Notice */}
        <div className="text-sm text-center px-4">
          &copy; {new Date().getFullYear()} Beyond Moksha. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
