import Image from "next/image";
import clipboardImg from "../../../../public/file.svg"; // left illustration

import videoImg from "../../../../public/file.svg";
import audioImg from "../../../../public/globe.svg";
import pictureImg from "../../../../public/people.png";
import textImg from "../../../../public/file.svg";

export default function EmotionalWillBanner() {
  return (
    <section className="w-full py-20 px-6 flex justify-center ">
      

        <Image
          src='/Frame400.png'
          alt="clipboard illustration"
          width={1400}
          height={1000}
          className=""
        />
      
    </section>
  );
}
