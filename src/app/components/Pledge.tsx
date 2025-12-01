"use client";
import Image from "next/image";
import hands from "../../../public/hands.png";

export const Pledge = () => {
  return (
    <div className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-16">
      <div className="flex flex-col items-center justify-center gap-8">
        {/* 3 Cards in a Row (stack on small screens) */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 w-full max-w-6xl">
          {/* Card 1 */}
          <div className="h-full flex items-start justify-center">
            <div className="border-2 border-[#1F3A52] p-6 w-full sm:w-[300px] md:w-[320px] shadow-sm">
            <h2 className="text-[#C89C2E] text-xl mb-3 font-lora font-normal">
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
          </div>

          {/* Card 2 */}
          <div className="md:flex justify-evenly items-end gap-8 mt-10">
            <div className="flex items-stretch">
            <div className="border-2 border-[#1F3A52] p-6 w-full sm:w-[300px] md:w-[320px] shadow-sm">
              <h2 className="text-[#C89C2E] text-xl mb-3 text-center font-lora font-normal">
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
          <div className="flex items-start sm:items-stretch flex-col sm:flex-col">
            <div className="flex justify-center sm:justify-center w-full">
              <Image
                src={hands}
                alt="Hands icon"
                className="object-contain"
                width={120}
                height={120}
                priority
              />
            </div>

            <div className="border-2 border-[#1F3A52] p-6 w-full sm:w-[300px] md:w-[320px] shadow-sm mt-4 sm:mt-6">
              <h2 className="text-[#C89C2E] text-xl mb-3 font-lora font-normal">
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
