import promises from '../../../../public/promises.jpg'
import Image from 'next/image'
interface cardProps{
    text:string,
    title?:string,
    heading:string
}

export const PledgeCard = ({text, title, heading}:cardProps)=>{

    return <div className="rounded-lg overflow-hidden w-full h-full hover:shadow-2xl shadow-xl">
        <a href="#" className="group relative block h-full bg-black">
        <Image
            alt="promises"
            src={promises}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            
        />

        <div className="relative p-4 sm:p-6 lg:p-8 h-1/2">
            <p className="text-sm font-medium tracking-widest text-pink-500 uppercase">{heading}</p>

            <p className="text-xl font-bold text-white sm:text-2xl">{title}</p>

            <div className="mt-32 sm:mt-48 lg:mt-50">
            <div
                className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
            >
                <p className="text-sm text-white">
                {text}
                </p>
            </div>
            </div>
        </div>
</a>

    </div>
}