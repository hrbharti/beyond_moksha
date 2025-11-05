"use client";
import candles from '../../../../public/flame-candles.webp'
import Image from "next/image";

export default function TributeSection() {
  return (
    <section className="relative flex items-center justify-start h-screen bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={candles} // place your image in /public/images/
          alt="Burning candles in darkness"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0" /> {/* Dark overlay */}
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-xl px-6 md:px-16 text-white ml-20">
        <h1 className="text-6xl md:text-6xl font-serif font-bold leading-tight mb-6">
          Pay Your <br /> Tribute
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          Your compassion can bring peace to families navigating their most
          profound moments. Together, we&apos;re creating a world where every
          farewell is filled with dignity, love, and respect.
        </p>
      </div>
    </section>
  );
}
