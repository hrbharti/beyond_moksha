import { ReactEventHandler } from "react"

const variant = {
    "primary": "bg-[#4682B8] bg-gradient-to-b from-[#4682B8] to-[#1F3A52]",
    "secondary": "bg-[#020024] bg-gradient-to-b from-[#020024] via-[#090979] to-[#00D4FF]",
    "danger": "bg-[#FD1D1D] bg-gradient-to-t from-[#FD1D1D] from-[54%] to-[#FCB045]"
}

const btnSize = {
    "sm": "w-[167.5px] h-[32px] text-[15px]",
    "lg": "w-[335px] h-[64px] text-[22px]"
}

interface btnProps {

    variantType: keyof typeof variant,
    size: keyof typeof btnSize,
    text: string,
    onClick: ReactEventHandler
}

export const Button = ({ variantType, size, text, onClick }: btnProps) => {


    return <div className={`${variant[variantType]} ${btnSize[size]} px-4 py-2 rounded text-white flex items-center justify-center cursor-pointer`}
        onClick={onClick}>

        <div className="h-full w-full  flex items-center justify-center">{text}</div>
    </div>
}