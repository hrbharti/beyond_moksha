import Image from "next/image";
import clipboardImg from "../../../../public/file.svg"; // left illustration

import videoImg from "../../../../public/file.svg";
import audioImg from "../../../../public/globe.svg";
import pictureImg from "../../../../public/people.png";
import textImg from "../../../../public/file.svg";

export default function EmotionalWillBanner() {
  return (
    <section className="w-full bg-[#F1F8FC] py-20 px-6 flex justify-center">
      <div className="relative bg-black rounded-[40px] w-full max-w-6xl p-10 md:p-12 overflow-hidden">

        {/* horizontal lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-[1px] w-full bg-white/15 mb-10" />
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-center gap-10">

          {/* LEFT IMAGE */}
          <div className="flex justify-center md:justify-start">
            <Image
              src={clipboardImg}
              alt="Document Feather Icon"
              className="w-[180px] md:w-[230px] object-contain"
              height={20}
              width={20}
            />
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 gap-8 justify-items-center">

            <Image 
              src={videoImg} 
              alt="Video Icon" 
              className="w-16 h-16 object-contain" 
              height={20}
              width={20}
            />

            <Image 
              src={audioImg} 
              alt="Audio Icon" 
              className="w-16 h-16 object-contain" 
              height={20}
              width={20}
            />

            <Image 
              src={pictureImg} 
              alt="Image Icon" 
              className="w-16 h-16 object-contain"  
              height={20}
              width={20}
            />

            <Image 
              src={textImg} 
              alt="Text Icon" 
              className="w-16 h-16 object-contain" 
              height={20}
              width={20}
            />

          </div>

          {/* RIGHT TEXT */}
          <div className="mt-50">
            <div className="flex justify-center md:justify-end text-right">
            <p className="text-white font-['Patrick_Hand',cursive] text-2xl md:text-3xl leading-relaxed">
              Create your<br />Emotional Will now.
            </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
