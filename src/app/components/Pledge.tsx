"use client";
import Image from "next/image";
import hands from "../../../public/hands.png";

export const Pledge = () => {
  return (
    <div className="w-full  py-20 px-16">
      <div className="flex flex-col items-center justify-center gap-12  h-120">
        {/* 3 Cards in a Row */}
        <div className="flex flex-wrap justify-center gap-10 w-full max-w-6xl  h-full">
          {/* Card 1 */}
          <div className="border-2 border-[#1F3A52] p-6 w-[300px] md:w-[320px] h-[80%] shadow-sm ">
            <h2 className="text-[#C89C2E] font-semibold text-xl mb-3">
              Our Pledge & Promise
            </h2>
            <p className="text-[#1F3A52] text-sm leading-relaxed">
              We pledge that all who are entrusted into our care will be
              afforded the Care, Protection, and Dignity shown to them
              throughout their life by their loved ones. Our duty is to serve
              both the living and those that have passed and respect the wishes
              of those who have been left behind and those who have gone forth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-end">
            <div className="border-2 border-[#1F3A52] p-6 w-[300px] md:w-[320px] h-[80%] shadow-sm">
            <h2 className="text-[#C89C2E] font-semibold text-xl mb-3 text-center">
              Mission Statement & Principles
            </h2>
            <p className="text-[#1F3A52] text-sm leading-relaxed">
              It is the mission of Beyond Moksha to facilitate a meaningful way
              for a family to grieve their loss and also celebrate the life and
              memories of their loved one. We will provide our range of
              services, information, guidance and options to fulfill this and do
              so diligently, with the highest level of attention, courtesy and
              compassion.
            </p>
          </div>
          </div>

          {/* Card 3 with Icon */}
          <div className="flex justify-end flex-col">
            <div className="flex flex-col items-center justify-start">
            <Image
              src={hands}
              alt="Hands icon"
              className="w-50 h-50 mb-4 object-contain"
            />
            <div className="border-2 border-[#1F3A52] p-6 w-[300px] md:w-[320px] min-h-[260px] shadow-sm ">
              <h2 className="text-[#C89C2E] font-semibold text-xl mb-3">
                Our Core Principles
              </h2>
              <ul className="list-disc pl-5 text-[#1F3A52] text-sm leading-relaxed">
                <li>Enhance the Customer Experience</li>
                <li>Commitment to Aftercare</li>
                <li>Commitment to our Team</li>
                <li>Superior Facilities</li>
                <li>Community Spirit</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
