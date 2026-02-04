export default function EmoCard({
  title,
  desc,
  className,
}: {
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[20px] p-6 h-60 w-70 border shadow-[inset_-6px_5px_6px_2px_rgba(0,0,0,0.1)] ${className}`}
    >
      <h3 className=" font-semibold text-[#1A2E46] text-[24px]">{title}</h3>
      <p className="mt-2 text-[16px] text-[#4E5A6C] leading-relaxed">{desc}</p>
    </div>
  );
}
