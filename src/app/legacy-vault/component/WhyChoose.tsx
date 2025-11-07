export default function WhyChooseLegacyVault() {
  return (
    <section className="w-full bg-[#F1F8FC] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold text-[#1A2E46]">
          Why Choose{" "}
          <span className="text-[#0A66FF]">Legacy Vault?</span>
        </h2>

        {/* Top Row Cards */}
        <div className="mt-20 flex justify-center h-120 gap-10">

          <div className=" flex flex-col justify-between">
                <div className="flex h-70 gap-10">
                    {/* Card 1 */}
                    <div className="bg-[#0b2248] text-white rounded-[24px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-75">
                        <h3 className="text-xl font-semibold">One Secure Vault</h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#CDD6E3]">
                        Store all financial records, IDs,
                        policies, and legal papers in
                        one encrypted place. No loss,
                        no confusion.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-[24px] p-8 border border-[#3B82F6]/40 shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-75">
                        <h3 className="text-xl font-semibold text-[#1A2E46]">Your Memories Preserved</h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#4E5A6C]">
                        Save photos, videos, voice
                        notes, and final messages so
                        your story lives on for your
                        loved ones.
                        </p>
                    </div>
                </div>


                {/* Bottom Wide Card */}
                <div className="mt-10 h-50 w-160 bg-[#0b2248] text-white rounded-[24px] p-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <h3 className="text-xl font-semibold">Your Wishes, Honored</h3>
                <p className="mt-4 text-sm max-w-2xl leading-relaxed text-[#CDD6E3]">
                    Keep wills, nominees, and instructions ready. No confusion for your
                    family when it matters most.
                </p>
                </div>
          </div>

          {/* Card 3 - Tall Card */}
          <div className="bg-[#0b2248] text-white rounded-[24px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-xl font-semibold">Controlled Sharing</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#CDD6E3]">
                Choose who sees what and
                when. You control every
                access.
              </p>
            </div>

            {/* Simple Placeholder Icon Shape */}
            <div className="mt-10 flex justify-end">
              <div className="w-20 h-20 border-2 border-white/40 rounded-[20px] relative">
                <div className="absolute -bottom-6 -right-4 w-16 h-16 border-2 border-white/40 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>

        

      </div>
    </section>
  );
}
