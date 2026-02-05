"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="w-full py-10 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 md:gap-16 px-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-normal leading-tight text-[#3C609B]">
            Legacy Vault
          </h1>

          <h2 className="mt-2 text-3xl md:text-5xl font-normal leading-snug text-black">
            dedicated to securing your legacy
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-black max-w-lg mx-auto md:mx-0">
            Create, protect, and preserve your legacy for your loved ones with
            care and trust.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 mt-8 md:mt-10">
            <button
              className="px-6 py-3 text-white text-sm rounded-lg bg-[linear-gradient(90deg,#0866FF,#053D99)] hover:opacity-90 transition flex items-center gap-2"
              onClick={() => router.push("/legacy-vault/dashboard")}
            >
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="px-6 py-3 text-[#2955A0] text-sm rounded-lg border border-[#3B82F6] bg-white hover:bg-[#eaf2ff] transition">
              Learn more
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={"/images/vault.png"}
            alt="Vault Icon"
            height={300}
            width={300}
          />
        </div>
      </div>
    </section>
  );
}
