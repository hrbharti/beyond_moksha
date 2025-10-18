import Image from "next/image"
import { PledgeCard } from "./utils/PledgeCard"
import hands from "../../../public/hands.png"


export const Pledge = ()=>{

    const texts = ["We pledge that all who are entrusted into our care will be afforded the Care, Protection, and Dignity shown to them throughout their life by their loved ones. Our duty is to serve both the living and those that have passed and respect the wishes of those who have been left behind and those who have gone forth.",
         "It is the mission of Beyond Moksha to facilitate a meaningful way for a family to grieve their loss and also celebrate the life and memories of their loved one. We will provide our range of services, information, guidance and options to fulfill this and do so diligently, with the highest level of attention, courtesy and compassion.",
        "Enhance the Customer Experience, Commitment to Aftercare, Commitment to our Team, Superior Facilities, Community Spirit"]

    return <div className="h-170 px-34 bg-white mt-20">
        
        <div className="h-full flex items-center justify-between gap-4">
            <div className=" h-full w-1/3  flex items-center"><PledgeCard text={texts[0]} heading="Our Pledge & Promise" title="Promises"/></div>
            <div className="h-full w-1/3  flex flex-col gap-4">
                <div className="h-1/3  bg-white ">
                    <div className="h-full px-14 p-2 hover:shadow-2xl shadow-xl rounded-lg">
                        <Image src={hands} alt="Hands.png" className="h-full rounded-b-lg "/>
                    </div>
                </div>
                <div className="h-2/3">
                    <PledgeCard text={texts[1]} heading="Our Core Principles" title="Core Values"/>
                </div>
            </div>
            <div className="h-full w-1/3  flex items-center"><PledgeCard text={texts[2]} heading="Mission Statement & Principles" title="Principle"/></div>
        </div>
    </div>
}