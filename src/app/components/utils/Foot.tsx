import Icon from "./Icon";
import Logo from "./Logo";

import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";

export default function Foot(){

    return <div className="h-full w-full px-[141px]  flex flex-col items-center"> 

            <div className="flex flex-col h-full justify-between items-center p-2">
                {/* logo */}
                <div>
                    <Logo isNav={false} />
                </div>

                {/* services */}
                <div className="flex gap-14">
                    <div className="cursor-pointer">Home</div>
                    <div className="cursor-pointer">About Us</div>
                    <div className="cursor-pointer">Services</div>
                    <div className="cursor-pointer">Special Services</div>
                    <div className="cursor-pointer">Blogs</div>
                </div>

                {/* links */}
                <div className="flex gap-4 justify-between items-center">
                    
                    <Icon icon={FaFacebook} />
                    <Icon icon={RiTwitterXLine}/>
                    <Icon icon={BsInstagram}/>
                    <Icon icon={ImLinkedin}/>
                    <Icon icon={IoLogoYoutube}/>
                    

                </div>

                {/* rights */}
                <div>
                    <div className="text-[20px] ">© 2024 Beyond Moksha. All Rights Reserved.</div>
                </div>
            </div>
    </div>
}