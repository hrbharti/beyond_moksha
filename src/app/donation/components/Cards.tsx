
interface OneCardProps{
    heading:string, 
    content1:string,
    content2?:string,
    className?:string
}
const OneCard = ({heading, content1, content2 , className}:OneCardProps)=>{

    return <div className={`h-90 w-1/3 flex flex-col items-center justify-around shadow-xl rounded-md border-2 ${className} text-white`}>
            <div className="h-3/10 w-full flex items-center justify-center text-xl font-semibold">{heading}</div>
            <div className="h-9/12 w-full flex flex-col items-center justify-center text-center gap-2 px-4">
                <div>{content1}</div>
                <div>{content2}</div>
            </div>
    </div>
}
export const Cards = ()=>{

    return <div>
        <div className="flex items-center justify-between gap-10">
            <OneCard 
            heading="Tech-Enabled Compassion" 
            content1="Simplifying bookings and documentation so families can focus on what matters most - being together and saying goodbye with peace."
            content2="Bringing comfort through technology when words aren't enough."
            className="bg-[#25CCC0]"
            />
            <OneCard 
            heading="Preserving Precious Memories"
            content1="A secure digital sanctuary where love letters, final wishes, and cherished memories live forever for future generations to discover."
            content2="Creating lasting legacies that transcend time and heal hearts."
            className="bg-[#1769B2]"
            />
            <OneCard 
            heading="Gentle Return to Earth"
            content1="Eco-friendly farewell ceremonies that honor both the departed and our planet, offering comfort through sustainable, meaningful rituals."
            content2="Providing a gentle return to nature, offering comfort and peace to both the departed and their loved ones."
            className="bg-[#E8504E]"
            />
        </div>
        <div className="mt-20">
            <div className="bg-[#DFAA16] bg-[linear-gradient(181deg,rgba(223,170,22,1)_0%,rgba(188,145,27,1)_55%)] h-70 px-54 flex flex-col items-center justify-around rounded-md shadow-xl text-white">
                <div className="text-2xl font-semibold">Every Gift Becomes a Blessing</div>
                <div>
                    Your generosity doesn't just support our services - it wraps grieving families in love, brings comfort to their hearts, and honors the memory of those they've lost.
                </div>
                <div>
                    Bringing comfort through technology when words aren't enough.
                </div>
            </div>
        </div>
        <div className="mt-20">
            <div className=' flex flex-col items-center justify-center px-44'>
                <div>
                <h1 className='text-4xl text-[#1867AE]'>Your Kindness Creates Miracles</h1> 
                </div>
                <div className='text-center'>
                In moments when families feel most alone, your generosity becomes their strength. Every contribution is a hand extended in love, a promise that they are not forgotten.
                </div>
            </div>
        </div>
    </div>
}