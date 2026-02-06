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
        <div className="flex flex-col gap-2">
          <span className="inline w-fit text-xl px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm">
            Bank account details
          </span>
          <span className="inline w-fit text-xl px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm">
            Jewelry & precious metals
          </span>
          <span className="inline w-fit text-xl px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm">
            Insurance policies
          </span>
          <span className="inline w-fit text-xl px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm">
            Loan tracker
          </span>
          <span className="inline w-fit text-xl px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm">
            Vehicle records
          </span>
          <span className="inline w-fit text-xl px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm">
            Real estate ownership
          </span>
          <span className="inline w-fit text-xl px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm">
            Crypto and digital assets
          </span>
        </div>

        <div className="md:text-right flex flex-col md:items-end items-start justify-evenly gap-5">
          <h2 className="text-3xl md:text-5xl">Asset Vault</h2>
          <p className="text-[#4E5A6C] leading-relaxed text-xl">
            Asset Vault lets you list and share all your financial and important
            information with your trusted ones at a time you choose
          </p>
          <button className="px-6 py-2 bg-[linear-gradient(90deg,#0866FF,#053D99)] text-white rounded-lg text-lg hover:opacity-90 transition-colors">
            Explore Now
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white mt-12 rounded-[22px] shadow-md p-10 text-center border border-[#0B3A85]/30">
        <p className="text-[#4E5A6C] text-xl">Leave a lasting legacy.</p>
        <p className="mt-5 text-4xl font-medium text-[#1A2E46] ">
          List your first asset on <br />
          <span className="text-[#0866FF]">Asset Vault</span> today.
        </p>

        <button className="mt-5 px-12 py-3 bg-[linear-gradient(90deg,#0866FF,#053D99)] text-white rounded-lg text-sm hover:opacity-90 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
