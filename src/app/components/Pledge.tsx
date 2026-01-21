"use client";
import Image from "next/image";
import hands from "@public/images/hands.png";

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
                Every life deserves respect. We care for your loved one with the
                same tenderness and dignity they knew in life, honoring their
                final journey with compassion. We understand your pain and are
                here to support you through this difficult time. From our first
                conversation to the final goodbye and beyond, we walk beside
                you. Your loved one is safe in our hands, and you are not alone
                in your grief.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:flex justify-evenly items-end gap-8 mt-10">
            <div className="flex items-stretch">
              <div className="border-2 border-[#1F3A52] p-6 w-full sm:w-[300px] md:w-[320px] shadow-sm">
                <h2 className="text-[#C89C2E] text-xl mb-3 text-left font-lora font-normal">
                  Why We Exist
                </h2>
                <p className="text-[#1F3A52] text-sm leading-relaxed">
                  Families need space to mourn, remember, and heal. We take care
                  of everything so you can focus on what matters is being with
                  family and honoring your loved one&apos;s memory. During this
                  painful time, you shouldn&apos;t carry the burden of
                  arrangements alone. We handle each detail with gentleness and
                  care, guiding you at every step. Let us support you through
                  this journey, so you can grieve, remember, and find comfort
                  together.
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
                  width={220}
                  height={220}
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
