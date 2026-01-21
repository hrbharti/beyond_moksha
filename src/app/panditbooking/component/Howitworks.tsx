"use client";

import Image from "next/image";
import StepItem from "./Step";
import Divider from "@public/svgs/divider.svg";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl text-[#1F3A52] font-lora font-normal">
            How It Works
          </h2>

          {/* Decorative Divider */}
          <div className="flex justify-center mt-3">
            <Image
              src={Divider}
              alt="Divider"
              className="w-[664px] h-[50px] object-contain"
            />
          </div>
        </div>

        {/* Two Column Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Beyond Moksha offers simple, reliable, and well-organized Puja
              services. All ceremonies are conducted by verified and experienced
              Pandits based on your requirements.
              <br />
              You choose the Puja, and we take care of everything else.
              <br />
              All essential Puja materials are arranged and provided on time.
              <br />
              Each ritual is performed following traditional practices with
              modern convenience.
            </p>

            <ul className="space-y-2 font-semibold text-gray-800 mt-6">
              <li className="flex items-start">
                <span className="mr-2 text-[#D29D39]">•</span> Verified &
                Experienced Pandits
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#D29D39]">•</span> Multilingual
                Support Across Regions (Hindi, English, Kannada, Tamil,
                Maithili, and Bengali)
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#D29D39]">•</span> All Puja
                Essentials Included
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#D29D39]">•</span> Region-Specific
                Ritual Expertise
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#D29D39]">•</span> Seamless,
                End-to-End Experience
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative h-[300px] lg:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="/images/how.png"
              alt="How Beyond Moksha Works"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <StepItem
            icon="/images/image30.png"
            title="Select a Pooja"
            description="Explore 50+ pujas and pick the one that matches your needs."
          />

          <StepItem
            icon="/images/Frame464.png"
            title="Select Date & Time"
            description="Choose a convenient time slot. Same-day bookings available."
          />

          <StepItem
            icon="/images/image32.png"
            title="Confirm Booking"
            description="Secure payment + instant confirmation via SMS & email."
          />

          <StepItem
            icon="/images/image30.png"
            title="Pandit Visits You"
            description="A verified pandit performs pooja at your place as per rituals."
          />
        </div>
      </div>
    </section>
  );
}
