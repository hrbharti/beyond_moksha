"use client";

import React from "react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

export default function AboutUsPage() {
  return (
    <>
      {/* == TOP HERO / FOUNDER (DESKTOP CLASSES PRESERVED) == */}
      <section className="w-full bg-white text-[#1F3A52] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-24 pb-32 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* LEFT: Founder Image */}
          <div className="flex md:justify-start justify-center">
            {/* original desktop sizes preserved at md+: */}
            <div className="w-[310px] h-[400px] sm:w-[340px] md:w-[360px] aspect-square rounded-[111px] overflow-hidden shadow-sm">
              <Image
                src="/images/founder.jpeg"
                alt="Hrithik Bharti"
                width={720}
                height={720}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT: Dual-outline Card */}
          <div className="relative md:ml-auto flex justify-center md:justify-end">
            {/* preserved original dual-outline transforms and rounded-[150px] on md */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[150px] ring-1 ring-[#D7D7D7] -translate-x-[8px] -translate-y-[8px] hidden md:block"
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-[150px] ring-1 ring-[#D1B26F] translate-x-[8px] translate-y-[8px] hidden md:block"
            />

            {/* Card container: keep original desktop classes — add mobile friendly rounded/padding */}
            <div className="relative bg-white rounded-[28px] md:rounded-[150px] p-6 md:p-10 max-w-[600px] shadow-sm">
              <h2 className="text-[28px] md:text-[30px] font-lora font-normal text-center">
                A Note from Our Founder
              </h2>

              <div className="mt-5 flex items-center gap-3 text-[18px] font-semibold justify-center md:justify-start">
                <span>Hrithik Bharti</span>
                <a
                  href="https://www.linkedin.com/in/imhrbharti?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  aria-label="LinkedIn"
                  className="inline-flex"
                >
                  <span>
                    <FaLinkedin />
                  </span>
                </a>
                <a
                  href=" https://x.com/imhrbharti?t=4iFzQAmYQGlMkduWkAH7Qw&s=09"
                  aria-label="Website"
                  className="text-current hover:opacity-80"
                >
                  <span className="text-[20px] leading-none">
                    <FaXTwitter />
                  </span>
                </a>
              </div>

              <p className="mt-6 text-[15.5px] leading-[1.7] tracking-wide text-[#30343A]">
                Beyond Moksha was born from a simple truth: loss is hard enough
                without added burden. After seeing families struggle, I built a
                service that combines compassion with quiet professionalism. We
                handle every detail with care so you can focus on being with
                loved ones and honoring memories that last.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Wave — unchanged */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="200px"
          viewBox="0 0 1440 216"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 56.0457C0 56.0457 259.601 -6.44549 428 0.545723C624.889 8.71972 721.277 109.548 918 121.046C981.157 124.737 1016.83 124.508 1080 121.046C1222.65 113.228 1440 56.0457 1440 56.0457V216.046H712H0V56.0457Z"
            fill="#1867AE"
          />
        </svg>
      </section>

      {/* == OUR PLEDGE (keeps desktop look unchanged; adds mobile fallbacks) == */}
      <section className="mt-20">
        <div className="h-auto w-full flex items-center justify-center px-4">
          <div className="flex flex-col lg:flex-row px-10 py-10 lg:py-[10vh] items-center justify-between w-full max-w-6xl">
            <div className="mb-8 lg:mb-0 lg:mr-8 flex flex-col items-start justify-around w-full lg:w-3/5">
              {/* Keep desktop large title (pl-50 preserved visually on md by using md:pl-[50px]) */}
              <div className="text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] text-[#1867AE] font-lora font-normal md:pl-50 sm:text-center sm:w-full md:w-auto md:text-normal">
                Our Pledge and Promise
              </div>

              <div className="p-6 flex items-center justify-end mt-4 w-full">
                <div className="h-auto bg-[#D8EDFF] w-full md:w-[85%] flex items-center justify-center p-6 md:p-8 text-lg md:text-xl rounded-3xl shadow-inner">
                  <span className="text-center">
                    We stand with every family through compassion, respect, and
                    steady support. Every step is managed with dignity, ensuring
                    each farewell reflects a life lived fully.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start w-full lg:w-2/5">
              <div className="bg-[#1867AE] h-auto w-full md:w-100 rounded-[40px] px-6 md:px-10 py-8 md:py-12 shadow-sm text-white text-[1rem] md:text-[1.25rem] leading-[1.6] md:leading-[1.75]">
                <ul className="space-y-2 md:space-y-4">
                  <li>• Dignified care at every moment</li>
                  <li>• Services tailored to your traditions</li>
                  <li>• Transparent pricing with no surprises</li>
                  <li>• 24x7 availability and prompt response</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* == MISSION & VISION (desktop preserved) == */}
      <section className="w-full bg-white py-12 mt-20">
        <div>
          <div className="flex items-center justify-center pt-6 pb-10">
            <h1 className="text-[2.5rem] md:text-[2.8rem] text-[#2471B6] text-center font-lora font-normal">
              Mission Statement & Principals
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto px-4 mt-10">
            {/* Left: Mission & Vision */}
            <div className="flex flex-col gap-8 w-full md:w-[55%]">
              <div className="bg-[#2471B6] rounded-2xl shadow-md px-8 py-10 text-white">
                <div className="text-2xl font-semibold mb-2 text-center ">
                  Mission:
                </div>
                <div className="text-lg text-center  leading-relaxed">
                  To deliver compassionate, dignified funeral services that ease
                  grief and honor every life with empathy and care.
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md px-8 py-10 text-[#222] border border-[#ececec]">
                <div className="text-2xl font-semibold mb-2 text-center ">
                  Vision:
                </div>
                <div className="text-lg text-center  leading-relaxed">
                  To be India&apos;s most trusted name in end-of-life care,
                  known for integrity, warmth, and reliability in life’s hardest
                  moments.
                </div>
              </div>
            </div>

            {/* Right: Target Icon */}
            <div className=" items-center justify-center w-full md:w-[45%] hidden lg:flex">
              <div className="w-full md:w-[350px]">
                <Image
                  src={"/images/mark.png"}
                  alt="markpng"
                  width={350}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* == CORE PRINCIPLES (desktop preserved) == */}
      <section className="w-full bg-white py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center pb-12 ">
            <h1 className="text-[2.5rem] md:text-[2.8rem] text-[#1867AE] text-center font-lora font-normal">
              Our Core Principles
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-[#D8EDFF] rounded-xl shadow-lg px-8 py-12 inset-shadow-sm">
              <h2 className="text-xl font-bold text-center text-[#1F3A52] mb-4">
                Compassion and Empathy
              </h2>
              <p className="text-center text-[#1F3A52]">
                We listen, we care, we walk beside you.
              </p>
            </div>

            <div className="bg-[#2471B6] rounded-xl shadow-lg px-8 py-12 inset-shadow-sm">
              <h2 className="text-xl font-bold text-center text-white mb-4">
                Dignity and Respect
              </h2>
              <p className="text-center text-white">
                Every life is sacred. Every farewell is graceful.
              </p>
            </div>

            <div className="bg-[#0B4975] rounded-xl shadow-lg px-8 py-12 inset-shadow-sm">
              <h2 className="text-xl font-bold text-center text-white mb-4">
                Transparency
              </h2>
              <p className="text-center text-white">
                Clear answers, honest costs, complete trust.
              </p>
            </div>

            <div className="bg-[#D8EDFF] rounded-xl shadow-lg px-8 py-12 inset-shadow-sm">
              <h2 className="text-xl font-bold text-center text-[#1F3A52] mb-4">
                Professionalism
              </h2>
              <p className="text-center text-[#1F3A52]">
                Trained, calm, and precise in every service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
