
import Image, { StaticImageData } from "next/image";
import { MdArrowRightAlt } from "react-icons/md";

interface ServicesCardProps{
    heading: string,
    subHeading:string,
    icon: StaticImageData
}
export const ServicesCard =({heading, subHeading, icon}:ServicesCardProps)=>{

    return <div className=" flex items-center justify-center bg-white  rounded-lg shadow-2xl p-2 border border-black hover:scale-105 transition-all">
        
        <div className="flex  h-full w-full items-center justify-around">
            <div className="h-25 w-30  ">
                <Image src={icon} alt={heading}/>
            </div>
            <div className="w-[50%]">
                <div className="text-2xl font-semibold tracking-wider bg-gradient-to-t from-[#1F3A52] to-[#4682B8] bg-clip-text text-transparent">
                    {heading}
                </div>
                <div className="text-[13px] text-black">
                    {subHeading}
                </div>
                <div className="mt-4 flex items-center justify-start text-[#BC911B] cursor-pointer hover:underline" >LearnMore <MdArrowRightAlt/></div>
            </div>
        </div>
    </div>
}