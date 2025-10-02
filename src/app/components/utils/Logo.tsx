
import Image from "next/image"

interface NavProps {
    isNav: boolean
}
export default function Logo({ isNav }: NavProps) {

    const beyondClassName = isNav
        ? "text-[#1F3A52] text-gradient-to-t from-[#1F3A52] to-[#4682B8]"
        : "text-[rgba(104,85,61,1)] text-gradient-to-r from-[rgba(104,85,61,1)] to-[rgba(0,0,0,1)] to-[55%]";

    return <div className="w-[340px] h-[58px] cursor-pointer flex items-center">

        <div className="h-full w-17"><Image src="/bird.png" alt="Beyond-moksha image" width={68} height={58} /></div>
        <div className="h-full ">
            <div className={`text-4xl mt-3  `}>
                <span className={beyondClassName}>
                    Beyond
                </span>
                <span className="text-[#BC911B] text-gradient-to-t from-[#BC911B] to-[#DFAA16]">Moksha</span></div>
            <div className="text-red-500">Tagline for beyond-moksha</div>

        </div>
    </div>
}