import Image from "next/image";

export default function SecureSection() {
  return (
    <section className="w-full bg-[#F1F8FC] py-24 px-6">
      <div className="max-w-7xl mx-auto">

       
        {/* Top layout */}
        <div className="mt-20 flex gap-10 h-120 w-full px-20">

          {/* Left Wide Card */}
          <div className=" w-2/3 flex flex-col justify-between rounded-[22px] ">
                {/* Heading */}
                <h2 className="text-start text-3xl md:text-5xl font-semibold text-[#1A2E46] leading-snug">
                What makes <br />
                Legacy vault <span className="text-[#0A66FF]">Secure?</span>
                </h2>

                <div className="md:col-span-2 h-60 bg-white rounded-[22px] border border-black shadow-sm flex justify-between items-center overflow-hidden">
                <div className="p-8">
                    <h3 className="text-xl font-semibold text-[#1A2E46]">Military-Grade Encryption</h3>
                    <p className="mt-3 text-sm text-[#4E5A6C] leading-relaxed max-w-sm">
                        Bank-level AES-256 + RSA protection for every file and message.
                    </p>
                </div>
                <div className="w-75 h-full bg-[#CFEDE9] rounded-l-full flex items-center justify-center">
                {/* Replace with your fingerprint icon */}
                    <Image src={'/shield.svg'} alt="shield" height={100} width={100}/>
                    <Image src={'/fingerprint.svg'} alt="fingerprint" width={70} height={70} className="absolute"/>
                </div>
                </div>
    

          </div>

          {/* Tall Card */}
          <div className="bg-[#0B2248] border border-black text-white rounded-[22px]  shadow-sm flex flex-col justify-between w-1/4 overflow-hidden" >
            <div className="p-8">
              <h3 className="text-xl font-semibold">Zero-Knowledge Privacy</h3>
              <p className="mt-3 text-sm text-[#CDD6E3] leading-relaxed">
                Data is encrypted before upload. Even our team cannot view it.
              </p>
            </div>

            {/* Icon Placeholder */}
            <div className="mt-12 w-full flex justify-center h-2/5">
              <div className="bg-[#E9F3FF] w-full rounded-[22px] py-8 flex justify-center rounded-t-full">
                <Image src={'/secure.svg'} alt="secure" width={100} height={100}/>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 px-20  h-75">

          <div className="bg-white rounded-[18px] border border-black shadow-sm p-6 flex flex-col justify-evenly">
            <div className="w-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#FBE4EC] flex justify-center items-center text-[#F0A8C8]">
              ●
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#1A2E46] text-[28px]">Isolated Private Cloud</h3>
            <p className="mt-2 text-[16px] text-[#4E5A6C] leading-relaxed ">
              Your vault stays separate from shared servers and public networks.
            </p>
          </div>

          <div className="bg-white rounded-[18px] border border-black shadow-sm p-6 flex flex-col justify-evenly">
            <div className="w-full flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#E8F1FF] flex justify-center items-center text-[#9AB7F7]">
                ●
              </div>
            </div>
            
            <h3 className="mt-4 text-lg font-semibold text-[#1A2E46] text-[28px]">Time-Locked Access</h3>
            <p className="mt-2 text-[16px] text-[#4E5A6C] leading-relaxed">
              Multi-factor login and OTPs prevent unauthorized access.
            </p>
          </div>
 
          <div className="bg-white rounded-[18px] border border-black shadow-sm p-6 flex flex-col justify-evenly">
            <div className="w-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#FFF3D9] flex justify-center items-center text-[#F7C76B]">
              ●
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#1A2E46] text-[28px]">Disaster-Proof Backup</h3>
            <p className="mt-2 text-[16px] text-[#4E5A6C] leading-relaxed">
              Multi-region backups protect against fire, flood, hacks, and failure.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
