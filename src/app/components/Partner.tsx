import Image from "next/image";
import Link from "next/link";

export default function Partner() {
  return (
    <div className="w-full bg-[#004551] flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 md:gap-8">
          {/* Left Content */}
          <div className="flex flex-col text-white max-w-full md:max-w-[39rem]">
            <h2 className="text-2xl sm:text-3xl md:text-3xl leading-snug font-lora font-normal">
              Join Beyond Moksha as a Verified Partner
            </h2>

            <p className="mt-4 text-sm sm:text-[0.975rem] leading-relaxed">
              If you provide funeral, transport, ritual services, or pandit services,
              partner <br className="hidden sm:inline" />
              with us to serve families with dignity.
            </p>

            <p className="text-sm sm:text-[0.975rem] mt-4 leading-relaxed">
              Expand your reach and support families in their time of need.
            </p>

            <div className="mt-6">
              <Link
                href={"https://docs.google.com/forms/d/e/1FAIpQLSe8v00Jmqw97l4lMEobeZqDmlxqhAl7IZF8u-jHYGpggOblnQ/viewform?usp=dialog"}
                className="inline-block px-5 py-2 min-w-[10.8125rem] border bg-white border-white rounded-full text-[#004551] text-sm hover:bg-[#004551] hover:text-white transition-all"
              >
                Register as Partner →
              </Link>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center items-center flex-shrink-0 w-full md:w-auto">
            <div className="w-44 sm:w-56 md:w-72 lg:w-96">
              <Image
                src="/partner.png"
                alt="Partner Collaboration"
                width={800}
                height={800}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
