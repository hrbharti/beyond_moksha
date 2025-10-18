import Image, { StaticImageData } from "next/image";
import { MdArrowRightAlt } from "react-icons/md";

interface BlogCardProps{
    image: StaticImageData,
    content: string
}

export const BlogCard = ({image,content}:BlogCardProps)=>{

    return <div className=" h-full w-full rounded-2xl shadow-2xl hover:scale-105 transition-all duration-100 overflow-hidden border border-black "> 
        
        <div className="h-[70%] w-full  ">
            <Image src={image} alt="image"/>
        </div>
        <div className="flex flex-col justify-center py-2 px-2">

            <div className="text-[13px] text-black">{content}</div>
            <div className="mt-4 flex items-center justify-start text-[#BC911B] cursor-pointer hover:underline" >LearnMore <MdArrowRightAlt/></div>
        </div>
    </div>
}