import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-16 h-110">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-[64px] font-bold leading-tight text-[#3C609B]">
            Legacy Vault
          </h1>

          <h2 className="mt-2 text-[48px] font-semibold leading-snug text-black">
            dedicated to securing your<br/>legacy.
          </h2>

          <p className="mt-6 text-lg text-black max-w-lg">
            Create, protect, and preserve your legacy for your loved ones with care and trust.
          </p>

          {/* BUTTONS */}
          <div className="flex items-center gap-4 mt-10">
            <button className="px-6 py-3 text-white text-sm rounded-lg bg-[linear-gradient(90deg,#0866FF,#053D99)] hover:opacity-90 transition flex items-center gap-2">
              Get Started
              <span>↗</span>
            </button>

            <button className="px-6 py-3 text-[#2955A0] text-sm rounded-lg border border-[#3B82F6] bg-white hover:bg-[#eaf2ff] transition">
              Learn more
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (Image Card) */}
        <div className="flex justify-end h-full w-full">
          <div className=" rounded-[22px] bg-[linear-gradient(to bottom,#3B82F6,#000)]">
            <div className="rounded-[20px]  h-full w-full">
              <Image
                src={'/vault.png'}
                alt="Vault Icon"
                className="rounded-[18px] h-full w-full object-cover"
                height={350}
                width={350}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
