"use client";
import { IoCameraOutline } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";

interface EmotionalWillCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

export default function EmotionalWillPage() {
  const cards: EmotionalWillCard[] = [
    {
      id: "image",
      title: "Create Image\nEmotional Will",
      icon: (
        <IoCameraOutline size={40}/>
      ),
      bgColor: "bg-[#D4F1E8]",
    },
    {
      id: "video",
      title: "Create Video\nEmotional Will",
      icon: (
        <IoVideocamSharp size={40}/>
      ),
      bgColor: "bg-[#E8D8F5]",
    },
    {
      id: "audio",
      title: "Create Audio\nEmotional Will",
      icon: (
        <FaMicrophone  size={40}/>
      ),
      bgColor: "bg-[#F5D8E8]",
    },
    {
      id: "text",
      title: "Create Text\nEmotional Will",
      icon: (
        <IoDocumentTextSharp size={40}/>
      ),
      bgColor: "bg-[#F5EDDA]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC]">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto  py-12 px-34 ">
        <div className=" border-2 border-[#1C1F3B] rounded-3xl ">

          {/* Dark Header Section */}
        <div className="bg-[#1C1F3B] rounded-3xl p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Start Creating <span className="text-[#0866FF]">Emotional Wills</span>
          </h1>
          <p className="text-white text-[15px] leading-relaxed">
            Tell your story, share your truths, and pass on your memories—your Emotional Will keeps your legacy alive for generations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className=" rounded-3xl  p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`${card.bgColor} rounded-3xl p-12 flex flex-col items-center justify-center gap-6 min-h-[140px] hover:shadow-lg transition cursor-pointer shadow-[inset_-6px_5px_6px_2px_rgba(0,0,0,0.1)]`}
              >
                <div className="flex items-center justify-center">
                  {card.icon}
                </div>
                <p className="text-center font-semibold text-[#1F3A52] text-lg whitespace-pre-line">
                  {card.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
