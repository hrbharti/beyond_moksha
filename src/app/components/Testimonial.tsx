"use client";
import { InfiniteMovingCardsDemo } from "./utils/TestimonialCard";

export const Testimonials = () => {
  return (
    <div className="w-screen h-auto gap-4 px-4 sm:px-6 lg:px-0 ">
      <InfiniteMovingCardsDemo direction="left" />
    </div>
  );
};
