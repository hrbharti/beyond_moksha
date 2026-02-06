"use client";
import { useState } from "react";
import { IoCameraOutline, IoClose } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import FileUpload from "@/app/components/FileUpload";

interface EmotionalWillCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

export default function EmotionalWillPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const cards: EmotionalWillCard[] = [
    {
      id: "image",
      title: "Create Image\nEmotional Will",
      icon: <IoCameraOutline size={40} />,
      bgColor: "bg-[#D4F1E8]",
    },
    {
      id: "video",
      title: "Create Video\nEmotional Will",
      icon: <IoVideocamSharp size={40} />,
      bgColor: "bg-[#E8D8F5]",
    },
    {
      id: "audio",
      title: "Create Audio\nEmotional Will",
      icon: <FaMicrophone size={40} />,
      bgColor: "bg-[#F5D8E8]",
    },
    {
      id: "text",
      title: "Create Text\nEmotional Will",
      icon: <IoDocumentTextSharp size={40} />,
      bgColor: "bg-[#F5EDDA]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC]">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-6 md:py-12 px-4 md:px-8">
        <div className="border-2 border-[#1C1F3B] rounded-3xl overflow-hidden">
          {/* Dark Header Section */}
          <div className="bg-[#1C1F3B] p-6 md:p-12 mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Creating{" "}
              <span className="text-[#0866FF]">Emotional Wills</span>
            </h1>
            <p className="text-white text-sm md:text-[15px] leading-relaxed max-w-2xl">
              Tell your story, share your truths, and pass on your memories—your
              Emotional Will keeps your legacy alive for generations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="p-6 md:p-12 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setActiveModal(card.id)}
                  className={`${card.bgColor} rounded-3xl p-6 md:p-12 flex flex-col items-center justify-center gap-4 md:gap-6 min-h-[140px] hover:shadow-lg transition cursor-pointer shadow-[inset_-6px_5px_6px_2px_rgba(0,0,0,0.1)]`}
                >
                  <div className="flex items-center justify-center">
                    {card.icon}
                  </div>
                  <p className="text-center font-semibold text-[#1F3A52] text-base md:text-lg whitespace-pre-line">
                    {card.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose size={24} className="text-[#1C1F3B]" />
            </button>

            <h2 className="text-2xl font-bold text-[#1C1F3B] mb-6 capitalize text-center">
              Create {activeModal} Emotional Will
            </h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <FileUpload category={activeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
