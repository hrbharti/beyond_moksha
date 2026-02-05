import Image from "next/image";

export default function SecureSection() {
  return (
    <section className="w-full bg-[#F1F8FC] py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top layout */}
        <div className="mt-10 md:mt-20 flex flex-col lg:flex-row gap-6 md:gap-10 h-auto w-full">
          {/* Left Wide Card */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6 md:gap-0 justify-between rounded-[22px]">
            {/* Heading */}
            <h2 className="text-start text-3xl md:text-5xl font-lora font-normal text-[#1A2E46] leading-snug">
              What makes <br />
              Legacy vault <span className="text-[#0A66FF]">Secure?</span>
            </h2>

            <div className="md:col-span-2 min-h-[15rem] h-auto md:h-60 bg-white rounded-[22px] border border-black shadow-sm flex flex-col md:flex-row justify-between items-center overflow-hidden">
              <div className="p-6 md:p-8 w-full md:w-auto">
                <h3 className="text-xl font-semibold text-[#1A2E46]">
                  Military-Grade Encryption
                </h3>
                <p className="mt-3 text-sm text-[#4E5A6C] leading-relaxed max-w-sm">
                  Bank-level AES-256 + RSA protection for every file and
                  message.
                </p>
              </div>
              <div className="w-full md:w-75 h-40 md:h-full bg-[#CFEDE9] rounded-t-[50%] md:rounded-t-none md:rounded-l-full flex items-center justify-center relative shrink-0">
                {/* Replace with your fingerprint icon */}
                <Image
                  src={"/svgs/shield.svg"}
                  alt="shield"
                  height={100}
                  width={100}
                  className="relative z-10"
                />
                <Image
                  src={"/svgs/fingerprint.svg"}
                  alt="fingerprint"
                  width={70}
                  height={70}
                  className="absolute z-0"
                />
              </div>
            </div>
          </div>

          {/* Tall Card */}
          <div className="bg-[#0B2248] border border-black text-white rounded-[22px] shadow-sm flex flex-col justify-between w-full lg:w-1/3 xl:w-1/4 overflow-hidden min-h-[18rem]">
            <div className="p-8">
              <h3 className="text-xl font-semibold">Zero-Knowledge Privacy</h3>
              <p className="mt-3 text-sm text-[#CDD6E3] leading-relaxed">
                Data is encrypted before upload. Even our team cannot view it.
              </p>
            </div>

            {/* Icon Placeholder */}
            <div className="mt-6 md:mt-12 w-full flex justify-center h-40 md:h-2/5 shrink-0">
              <div className="bg-[#E9F3FF] w-full rounded-[22px] py-8 flex justify-center rounded-t-full">
                <Image
                  src={"/svgs/secure.svg"}
                  alt="secure"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-auto">
          <div className="bg-white rounded-[18px] border border-black shadow-sm p-6 flex flex-col justify-between min-h-[250px]">
            <div className="w-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#FBE4EC] flex justify-center items-center text-[#F0A8C8]">
                <Image
                  src={"/images/Frame500.png"}
                  alt="cloud"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="mt-4 text-lg font-semibold text-[#1A2E46] text-[20px] md:text-[24px] lg:text-[28px]">
                Isolated Private Cloud
              </h3>
              <p className="mt-2 text-[14px] md:text-[16px] text-[#4E5A6C] leading-relaxed ">
                Your vault stays separate from shared servers and public
                networks.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[18px] border border-black shadow-sm p-6 flex flex-col justify-between min-h-[250px]">
            <div className="w-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#E8F1FF] flex justify-center items-center text-[#9AB7F7]">
                <Image
                  src={"/images/Frame501.png"}
                  alt="cloud"
                  width={50}
                  height={50}
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="mt-4 text-lg font-semibold text-[#1A2E46] text-[20px] md:text-[24px] lg:text-[28px]">
                Time-Locked Access
              </h3>
              <p className="mt-2 text-[14px] md:text-[16px] text-[#4E5A6C] leading-relaxed">
                Multi-factor login and OTPs prevent unauthorized access.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[18px] border border-black shadow-sm p-6 flex flex-col justify-between min-h-[250px]">
            <div className="w-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#FFF3D9] flex justify-center items-center text-[#F7C76B]">
                <Image
                  src={"/images/Frame502.png"}
                  alt="cloud"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="mt-4 text-lg font-semibold text-[#1A2E46] text-[20px] md:text-[24px] lg:text-[28px]">
                Disaster-Proof Backup
              </h3>
              <p className="mt-2 text-[14px] md:text-[16px] text-[#4E5A6C] leading-relaxed">
                Multi-region backups protect against fire, flood, hacks, and
                failure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
