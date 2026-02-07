"use client";
import EmoCard from "./EmoCard";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function EmotionalWill() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <section className="w-full bg-[#F1F8FC] py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl md:text-5xl font-medium text-[#1A2E46] text-center md:text-left">
            Emotional Will
          </h2>

          <p className="mt-5 text-[#4E5A6C] text-base md:text-[20px] leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
            Legacy vaults Emotional Will is where you leave your heartfelt
            messages — in your voice, through videos, or in writing — and have
            them delivered to your loved ones at the right time.
          </p>

          <button
            className="mt-10 px-6 py-3 text-white rounded-lg bg-[linear-gradient(90deg,#0866FF,#053D99)] hover:opacity-90 transition"
            onClick={() =>
              router.push(`/legacy-vault/${user ? "dashboard" : "login"}`)
            }
          >
            Explore Now
          </button>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8 items-center">
            {/* Image */}
            <EmoCard
              title="Image"
              desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort."
              className="bg-[#E3F6F5] border-[#9BE7D9]"
            />

            {/* Audio */}
            <EmoCard
              title="Audio"
              desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort."
              className="bg-[#FCE7F3] border-[#F3B8D2]"
            />
          </div>

          <div className="flex flex-col mt-0 sm:-mt-20 gap-8 items-center">
            {/* Video */}
            <EmoCard
              title="Video"
              desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort."
              className="bg-[#E8EDFF] border-[#B7C8FF]"
            />

            {/* Text */}
            <EmoCard
              title="Text"
              desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort."
              className="bg-[#FFF4E0] border-[#B6E5B6]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
