import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
import Icon from "./utils/Icon";
import { useState } from "react";
import Logo from "@/app/components/utils/Logo"

const navList = ["Home", "About Us", "Our Services", "Special Services", "Blogs"];


export const Navbar = ()=>{

    const [activepage, setActivePage] = useState("Home");

    return <div className="h-[138px] w-full bg-red-300 ">

        {/* contact info */}
        <div className="h-[52px]  flex items-center justify-between  bg-[#F4F6F8] px-[141px]">
            <div className="flex gap-5 text-[#1F3A52] font-[16px]">
                <div className="cursor-pointer">+91-8142884149</div>
                <div className="cursor-pointer">ajdio@gmail.com</div>
            </div>
            <div className="flex gap-4 text-black">

                <Icon icon={FaFacebook} />
                <Icon icon={RiTwitterXLine}/>
                <Icon icon={BsInstagram}/>
                <Icon icon={ImLinkedin}/>
                <Icon icon={IoLogoYoutube}/>


            </div>
        </div>


        {/* navbar */}

        <div className="h-[86px] bg-white flex items-center justify-between px-[141px]">

            {/* logo */}
            <Logo isNav={true}/>

            {/* nav list */}

            <div className="flex items-center gap-4">
                {navList.map((item, key)=>{
                    return <div
                     className={`cursor-pointer ${item == activepage ? "text-[#1867AE]" : "text-black"} `} 
                     key={key} 
                     onClick={()=>setActivePage(item)}

                     >
                        {item}
                    </div>
                })}


                <Icon icon={BiSolidDonateHeart} className="text-2xl text-[red]"/>
            </div>

        </div>
    </div>
}