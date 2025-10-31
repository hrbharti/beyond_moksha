"use client";

import React from "react";
import Image from "next/image"; // replace with actual founder image

export default function AboutUsPage() {
  return (
    <div className="bg-[#F9FAFB] text-[#1F3A52]">

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-16 text-center bg-gradient-to-b from-white to-[#EAF2F9]">
        <h2 className="text-3xl font-semibold mb-8">Our Mission & Vision</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          To deliver compassionate, dignified funeral services that ease grief and honor every life with empathy and care.
          To be India’s most trusted name in end-of-life care, known for integrity, warmth, and reliability in life’s hardest moments.
        </p>

      </section>

      {/* Founder’s Note */}
      <section className="py-20 px-6 md:px-16 bg-white flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-full md:w-1/2 h-[350px]">
          <Image
            src={'/founder.jpeg'}
            alt="Founder"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">A Note from Our Founder</h2>
          <p className="text-lg leading-relaxed mb-6">
            “Beyond Moksha was born from a simple truth: loss is hard enough without added burden. After seeing families struggle, I built a service that combines compassion with quiet professionalism. We handle every detail with care so you can focus on being with loved ones and honoring memories that last.”
          </p>
          <p className="font-semibold text-[#4682B8]">— Hrithik Bharti</p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-t from-[#EAF2F9] to-white text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Compassion",
              text: "Every interaction is led by empathy, care, and respect.",
            },
            {
              title: "Integrity",
              text: "We uphold transparency and trust in every service we offer.",
            },
            {
              title: "Dignity",
              text: "We ensure every farewell is filled with peace and reverence.",
            },
            {
              title: "Community",
              text: "We stand with families, offering strength and support.",
            },
            {
              title: "Sustainability",
              text: "We commit to environmentally responsible practices.",
            },
            {
              title: "Legacy",
              text: "We help honor memories through mindful remembrance.",
            },
          ].map((value, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md border border-[#D1E2F0] hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold mb-3 text-[#1F3A52]">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-20 text-center bg-[#1F3A52] text-white">
        <h2 className="text-3xl font-semibold mb-6">Together, We Go Beyond</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white/90 mb-8">
          Beyond Moksha is more than a service — it’s a journey of compassion.
          Together, we strive to bring solace and meaning to life’s hardest
          moments.
        </p>
        <button className="bg-white text-[#1F3A52] font-semibold px-8 py-3 rounded-full hover:bg-[#4682B8] hover:text-white transition-all">
          Join Our Mission
        </button>
      </section>
    </div>
  );
}
