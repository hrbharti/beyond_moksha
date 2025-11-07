import React from "react";
import TextBubble from "./TextBubble";

export default function AssetVaultSection() {
  return (
    <section className="relative w-full bg-[#F1F8FC] py-24 px-6 overflow-hidden">
      {/* Floating Circles */}
      <div className="absolute top-10 right-10 w-24 h-24 border border-[#9ab7f7] rounded-full"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 border border-[#bde7b6] rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-36 h-36 border border-[#9ab7f7] rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-[#f7b6b6] rounded-full"></div>
      <div className="absolute top-1/3 left-1/3 w-14 h-14 border border-[#bde7b6] rounded-full"></div>
      <div className="absolute bottom-16 right-1/3 w-28 h-28 border border-[#f7b6b6] rounded-full"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-16 relative z-10">

        {/* LEFT TAG LIST */}
        <div className="flex flex-col gap-1">
          
            <TextBubble className="text-[#B1DFB1]" text={"Bank account details"} />
            <TextBubble className="text-[#93DBCE]" text={"Jewelry & precious metals"} />
            <TextBubble className="text-[#ECB3CC]" text={"Insurance policies"} />
            <TextBubble className="text-[#B2C3F8]" text={"Loan tracker"} />
            <TextBubble className="text-[#93DBCE]" text={"Vehicle records"} />
            <TextBubble className="text-[#ECB3CC]" text={"Real estate ownership"} />
            <TextBubble className="text-[#ADD5AD]" text={"Crypto and digital assets"} />
        
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-center md:text-right flex flex-col items-end h-90 justify-evenly">
          <h2 className="text-[64px] md:text-[48px] font-semibold text-[#1A2E46]">
            Asset Vault
          </h2>
          <p className="mt-4 text-[#4E5A6C] leading-relaxed   text-right text-[20px]">
            Asset Vault lets you list and share all your financial and important
            information with your trusted ones at a time you choose
          </p>

          <button className="mt-8 px-6 py-2 bg-[linear-gradient(90deg,#0866FF,#053D99)] text-white rounded-lg text-sm hover:opacity-90 transition">
            Explore Now
          </button>

          <p className="mt-6 inline-block px-6 py-2 bg-[#0b2248] text-[24px] text-white rounded-full text-sm shadow-sm">
            and many more.....
          </p>
        </div>

      </div>

      {/* BOTTOM CTA CARD */}
      <div className="relative z-10 max-w-3xl mx-auto bg-white mt-24 rounded-[22px] shadow-md p-10 h-80 text-center border border-[#0B3A85]/30">
        <p className="text-[#4E5A6C]">
          Leave a lasting legacy.
        </p>
        <p className="mt-1 text-3xl font-medium text-[#1A2E46] ">
          List your first asset on{" "} <br />
          <span className="text-[#0866FF] cursor-pointer">Asset Vault</span> today.
        </p>

        <button className="mt-24 px-12 py-3 bg-[linear-gradient(90deg,#0866FF,#053D99)] text-white rounded-lg text-sm hover:opacity-90 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
