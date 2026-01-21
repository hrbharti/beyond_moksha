import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Divider from "@public/svgs/divider.svg";

const services = [
  {
    title: "जन्मोत्सव पूजा",
    desc: "आपके जीवन के खुशियों का पर्व! नवजात का स्वागत जीवन के उल्लास, विधियों, आशीर्वाद एवं परिवार के संग...",
    img: "/images/featuredPooja3.png",
  },
  {
    title: "सत्यनारायण पूजा",
    desc: "सत्यानारायण व्रत कथा पूर्णता! अर्थात जीवन में प्रगति साधारण का महत्वपूर्ण साधन है. हम सभी उसकी कृपा ग...",
    img: "/images/featuredPooja2.png",
  },
  {
    title: "भूमि पूजन एवं शिला स्थापना",
    desc: "भूमिपूजन एक शुभारंभ सिद्ध संस्कार है, जिसमें ईश्वर विज्ञान तत्व की दृष्टि समाहित रहती है. यह भवन निर्माण क...",
    img: "/images/featuredPooja1.png",
  },
];

export default function FeaturedPoojaServices() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl text-[#1F3A52] font-lora font-normal">
          Featured <span className="text-[#D29D39]">Pooja</span> Services
        </h2>

        {/* Decorative Divider */}
        <div className="flex justify-center mt-3">
          <Image src={Divider} alt="Divider" className="w-[80px]" />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Comprehensive religious services for every occasion. Our expert
          pandits ensure authentic vedic rituals with proper mantras and
          procedures.
        </p>

        {/* Cards */}
        {/* Cards */}
        <div className="mt-20 relative flex justify-center items-center">
          {/* Splash Behind Cards */}
          <div className="absolute -z-0 -mt-20 inset-0 justify-center overflow-visible pointer-events-none h-200 w-full top-0 hidden lg:flex">
            <Image
              src="/images/splash.png"
              alt="color splash"
              width={1200}
              height={600}
              className="object-contain translate-y-[-20px]"
            />
          </div>

          {/* Cards Row */}
          <div className="relative z-10 flex flex-wrap justify-center gap-10 mt-20">
            {services.map((s, i) => (
              <div
                key={i}
                className="w-[330px] bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-200 p-5"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    width={350}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-[#1F3A52]">
                  {s.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {s.desc}
                </p>

                <button className="mt-4 px-5 py-2 border border-[#D29D39] text-[#D29D39] rounded-md hover:bg-[#D29D39] hover:text-white transition text-sm">
                  Book Puja
                </button>
              </div>
            ))}

            {/* Right Scroll Button */}
            <button className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition absolute -right-18 top-2/5 ">
              <ChevronRight className="h-5 w-5 text-[#BC911B]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
