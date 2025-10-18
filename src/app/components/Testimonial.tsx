'use client'
import { InfiniteMovingCardsDemo } from "./utils/TestimonialCard"

export const Testimonials = ()=>{

    return <div className="h-full w-full gap-4 ">
        <InfiniteMovingCardsDemo direction="left"/>
    </div>
}