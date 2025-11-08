"use client"
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
import Icon from "./utils/Icon";
import { useState } from "react";
import Logo from "@/app/components/utils/Logo"
import Link from "next/link";
import { useRouter } from "next/navigation";
import GmailLink from "./GmailLink";

const navList = ["Home", "About Us", "Legacy Vault", "Pandit Booking", "Blogs"];

interface navProps{
    onNavigate?:(section: string) => void
}

export const Navbar = ({onNavigate}:navProps) => {
    const [activepage, setActivePage] = useState("Home");
    const router = useRouter();
    const [donationFlag, setDonationFlag] = useState(false); 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const onClickHandler = (item: string)=>{
        setActivePage(item);
        setMobileMenuOpen(false);

        if(onNavigate && item !== 'About Us' && item !== 'Pandit Booking' && item !== 'Blogs'){
            onNavigate(item)
        }

        if(item === 'Home') router.push('/');
        if(item === 'Blogs') router.push('/Blogs')
        if(item === 'About Us') router.push('/aboutus')
        if(item === 'Pandit Booking') router.push('/panditbooking')
        if(item === 'Legacy Vault') router.push('/legacy-vault')
    }

    return (
        <div className="w-full sticky top-0 z-50 shadow bg-white">

            {/* contact bar */}
<div className="h-10 bg-[#F4F6F8] px-3 sm:px-6 md:px-10 text-sm flex items-center justify-between overflow-x-auto whitespace-nowrap">

  {/* Contact Info */}
  <div className="flex items-center gap-3 text-[#1F3A52]">
    <span className="cursor-pointer">+91-8142884149</span>
    <span className="cursor-pointer">ajdio@gmail.com</span>
  </div>

  {/* Social Icons */}
  <div className="flex items-center gap-3 text-black text-lg sm:text-xl">
    <Icon icon={FaFacebook} onClick={() => window.open('https://facebook.com', '_blank')} />
    <Icon icon={RiTwitterXLine} onClick={() => window.open('https://x.com/beyondmoksha360', '_blank')} />
    <Icon icon={BsInstagram} onClick={() => window.open('https://www.instagram.com/beyondmoksha360', '_blank')} />
    <Icon icon={ImLinkedin} onClick={() => window.open('https://www.linkedin.com/company/beyondmoksha360/', '_blank')} />
    <Icon icon={IoLogoYoutube} onClick={() => window.open('https://youtube.com/@beyondmoksha360', '_blank')} />
  </div>

</div>


            {/* main navbar */}
            <div className="h-20 flex items-center justify-between px-4 md:px-10 lg:px-20">

                {/* logo */}
                <Logo isNav={true} />

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navList.map((item, key) => (
                        <div
                            key={key}
                            className={`cursor-pointer ${item === activepage && !donationFlag ? "text-[#1867AE]" : "text-black"} hover:text-[#1867AE] transition`}
                            onClick={() => onClickHandler(item)}
                        >
                            {item}
                        </div>
                    ))}

                    <Link href='/donation' onClick={()=> setDonationFlag(true)}>
                        <Icon icon={BiSolidDonateHeart} className="text-2xl text-red-600" />
                    </Link>
                </div>

                {/* Hamburger button (mobile) */}
                <button className="md:hidden text-3xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden flex flex-col gap-4 px-6 py-4 bg-white border-t shadow-sm">
                    {navList.map((item, key) => (
                        <div
                            key={key}
                            className={`cursor-pointer text-lg ${item == activepage && !donationFlag ? "text-[#1867AE]" : "text-black"}`}
                            onClick={() => onClickHandler(item)}
                        >
                            {item}
                        </div>
                    ))}

                    <Link href='/donation' onClick={()=> {setDonationFlag(true); setMobileMenuOpen(false)}}>
                        <Icon icon={BiSolidDonateHeart} className="text-3xl text-red-600" />
                    </Link>
                </div>
            )}
        </div>
    );
};
