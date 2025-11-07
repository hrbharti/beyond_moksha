
export default function TextBubble({ text , className }: { text: string , className?: string }) {

    return <span
              className={`inline w-fit text-[24px] px-5 bg-[#1C1F3B] py-2 text-white rounded-full shadow-sm ${className}`}
            >
              {text}
            </span>;
}
