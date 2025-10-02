import { ReactEventHandler } from "react"

interface IconProps {

    icon: React.ElementType,
    onClick?: ReactEventHandler,
    className?: string
}
export default function Icon({ icon: IconComponent, onClick, className }: IconProps) {

    return <div onClick={onClick} className="cursor-pointer">

        <IconComponent className={className} />

    </div>
}