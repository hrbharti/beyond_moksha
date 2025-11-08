"use client";
import Image from "next/image";

export default function JoinPanditSection() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden  mt-20">

      {/* Background Image */}
      <Image
        src="/pandithero.jpg"  // <-- replace with actual image path
        alt="Pandit performing ritual"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative h-full flex items-center px-6 md:px-16 lg:px-24">
        <div className="text-white w-full">
          <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
            Are you a qualified Pandit/Astrologer?
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-200 w-120">
            Join our community of trusted Pandits & Astrologers! Partner with us to receive verified bookings,
            flexible schedules, and prompt support. Let your skills bring positive change to countless homes!
          </p>

          <button
            className="mt-6 px-6 py-2 bg-white text-[#1F3A52] rounded-md shadow hover:bg-gray-100 transition font-medium"
          >
            Send a Request
          </button>
        </div>
      </div>

    </section>
  );
}
