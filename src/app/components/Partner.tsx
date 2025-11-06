import Image from "next/image";

export default function Partner() {
  return (
    <div className="w-full bg-[#004551] flex justify-center">
      <div className="flex w-full h-[29.5625rem] justify-between items-center gap-[1.625rem] px-[6.5rem] pr-[6.4375rem] pb-[1.625rem]">

        {/* Left Content */}
        <div className="flex flex-col text-white max-w-[39rem]">
          <h2 className="text-3xl font-semibold leading-snug">
            Join Beyond Moksha as a Verified Partner
          </h2>

          <p className="mt-4 text-[0.975rem] leading-relaxed">
            If you provide funeral, transport, ritual services, or pandit services,
            partner <br />with us to serve families with dignity.
          </p>

          <p className="text-[0.975rem] mt-4 leading-relaxed">
            Expand your reach and support families in their time of need.
          </p>

          <button className="mt-6 px-5 py-2 w-[10.8125rem] border bg-white border-white rounded-full text-[#004551] text-sm hover:bg-[#004551] hover:text-white transition-all cursor-pointer">
            Register as Partner →
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center items-center flex-shrink-0">
          <Image 
            src="/partner.png" 
            alt="Partner Collaboration" 
            width={500} 
            height={500} 
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}
