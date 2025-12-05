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
              Our Responsibility
            </h2>
            <p className="text-[#1F3A52] text-sm leading-relaxed">
              Every life deserves respect. We ensure dignity and care for your loved one in their final journey, and we support those they leave behind.
            </p>
          </div>
          </div>

          {/* Card 2 */}
          <div className="md:flex justify-evenly items-end gap-8 mt-10">
            <div className="flex items-stretch">
            <div className="border-2 border-[#1F3A52] p-6 w-full sm:w-[300px] md:w-[320px] shadow-sm">
              <h2 className="text-[#C89C2E] text-xl mb-3 text-center font-lora font-normal">
                Why We Exist
              </h2>
              <p className="text-[#1F3A52] text-sm leading-relaxed">
                Families need space to mourn, remember, and heal. We organise everything properly so you can focus on saying goodbye and honouring memories.
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
                What Drives Us
              </h2>
              <ul className="list-disc pl-5 text-[#1F3A52] text-sm leading-relaxed">
                <li>Putting families first, always</li>
                <li>Being there before, during, and after</li>
                <li>A team that cares deeply</li>
                <li>Dignity in every small detail</li>
                <li>Service from the heart</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
