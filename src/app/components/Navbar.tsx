"use client"
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
import Icon from "./utils/Icon";
import { use, useState } from "react";
import Logo from "@/app/components/utils/Logo"
import Link from "next/link";
import { useRouter } from "next/navigation";

const navList = ["Home", "About Us", "Our Services", "Pandit Booking", "Blogs"];

interface navProps{

    onNavigate?:(section: string) => void
}

export const Navbar = ({onNavigate}:navProps) => {

    const [activepage, setActivePage] = useState("Home");
    const router = useRouter();
    const [donationFlag, setDonationFlag] = useState(false); 

    const onClickHandler = (item: string)=>{
        
        setActivePage(item);
        if(onNavigate && item != 'About Us' && item != 'Pandit Booking' && item != 'Blogs'){
            onNavigate(item)
        }

        if(item == 'Home'){
            router.push('/')
        }
        if(item == 'Blogs'){
            router.push('/Blogs')
        }
        if(item == 'About Us'){
            router.push('/aboutus')
        }
    }

    return <div className="h-30 w-full bg-red-500 sticky top-0 z-10">

        {/* contact info */}
        <div className="h-10  flex items-center justify-between  bg-[#F4F6F8] px-34">
            <div className="flex gap-5 text-[#1F3A52] font-[16px]">
                <div className="cursor-pointer">+91-8142884149</div>
                <div className="cursor-pointer">ajdio@gmail.com</div>
            </div>
            <div className="flex gap-4 text-black">

                <Icon icon={FaFacebook} onClick={() => window.open('https://facebook.com', '_blank')} />
                <Icon icon={RiTwitterXLine} onClick={() => window.open(' https://x.com/beyondmoksha360?t=D9sL0243Mb32RhXAy-vZ2A&s=09', '_blank')} />
                <Icon icon={BsInstagram} onClick={() => window.open('https://www.instagram.com/beyondmoksha360?igsh=MWNhMHdhYzlnbzRhaw==', '_blank')} />
                <Icon icon={ImLinkedin} onClick={() => window.open('https://www.linkedin.com/company/beyondmoksha360/', '_blank')} />
                <Icon icon={IoLogoYoutube} onClick={() => window.open('https://youtube.com/@beyondmoksha360?si=s5YThsuU4FPCRwz4', '_blank')} />


            </div>
        </div>


        {/* navbar */}

        <div className="h-20 bg-white flex items-center justify-between px-34 shadow">

            {/* logo */}
            <Logo isNav={true} />

            {/* nav list */}

            <div className="flex items-center gap-4">
                {navList.map((item, key) => {
                    return <div
                        className={`cursor-pointer ${item == activepage && !donationFlag ? "text-[#1867AE]" : "text-black"} `}
                        key={key}
                        onClick={() => onClickHandler(item)}

                    >
                        {item}
                    </div>
                })}

                <Link href='/donation' onClick={()=> setDonationFlag(true)}>
                    <Icon icon={BiSolidDonateHeart} className="text-2xl text-[red]" />
                </Link>
                
            </div>

        </div>
    </div>
}

