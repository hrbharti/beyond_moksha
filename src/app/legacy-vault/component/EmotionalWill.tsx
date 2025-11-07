import EmoCard from "./EmoCard";

export default function EmotionalWill() {
  return (
    <section className="w-full bg-[#F1F8FC] py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-[48px] md:text-[64px] font-semibold text-[#1A2E46]">
            Emotional Will
          </h2>

          <p className="mt-5 text-[#4E5A6C] text-[20px] leading-relaxed max-w-md">
            Legacy vaults Emotional Will is where you leave your heartfelt messages — in your
            voice, through videos, or in writing — and have them delivered to your loved ones at 
            the right time.
          </p>

          <button className="mt-10 px-6 py-3 text-white rounded-lg bg-[linear-gradient(90deg,#0866FF,#053D99)]
            hover:opacity-90 transition">
            Explore Now
          </button>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="grid grid-cols-2 gap-8">

          <div className=" flex flex-col gap-8">
                {/* Image */}
                <EmoCard 
                title="Image" 
                desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort."
                className="bg-[#E3F6F5] border-[#9BE7D9]" />

                {/* Audio */}
                <EmoCard 
                title="Audio" 
                desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort." 
                className="bg-[#FCE7F3] border-[#F3B8D2]"/>
          </div>

          <div className=" flex flex-col -mt-20 gap-8">
                {/* Video */}
                <EmoCard 
                title="Video" 
                desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort."
                className="bg-[#E8EDFF] border-[#B7C8FF]" />

                {/* Text */}
                <EmoCard 
                title="Text" 
                desc="Let your voice carry your love. A few words, in your tone, can bring immense comfort." 
                className="bg-[#FFF4E0] border-[#B6E5B6]"/>
                </div>

        </div>
      </div>
    </section>
  );
}
