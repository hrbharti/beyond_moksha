export default function WhyChooseLegacyVault() {
  return (
    <section className="w-full bg-[#F1F8FC] py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-medium mb-16">
          Why Choose <span className="text-[#0A66FF]">Legacy Vault?</span>
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: One Secure Vault */}
          <div className="bg-[#0b2248] text-white rounded-3xl px-6 py-10 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-medium mb-4">
              One Secure Vault
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-300">
              Store all financial records, IDs, policies, and legal papers in
              one encrypted place. No loss, no confusion.
            </p>
          </div>

          {/* Card 2: Your Memories Preserved */}
          <div className="bg-white text-[#1A2E46] rounded-2xl px-6 py-10 border border-gray-100 shadow-sm flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-medium mb-4">
              Your Memories Preserved
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-500">
              Save photos, videos, voice notes, and final messages so your story
              lives on for your loved ones.
            </p>
          </div>

          {/* Card 3: Controlled Sharing (Tall) */}
          <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 bg-[#0b2248] text-white rounded-3xl px-6 py-10 flex flex-col justify-between min-h-[220px] lg:min-h-full">
            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-4">
                Controlled Sharing
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-[#CDD6E3]">
                Choose who sees what and when. You control every access.
              </p>
            </div>
            {/* Geometric Shape Decoration */}
            <div className="w-20 h-20 border-2 border-white/20 rounded-xl hidden md:relative">
              <div className="absolute -bottom-6 -right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
            </div>
          </div>

          {/* Card 4: Your Wishes, Honored (Wide) */}
          <div className="lg:col-span-2 bg-[#0b2248] text-white rounded-3xl p-8 min-h-[220px] flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-medium mb-4">
              Your Wishes, Honored
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-[#CDD6E3] max-w-2xl">
              Keep wills, nominees, and instructions ready. No confusion for
              your family when it matters most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
