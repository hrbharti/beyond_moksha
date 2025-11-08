export default function HowToCard({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        w-[280px] h-[326px] md:w-[498px]
        bg-white
        rounded-[18px]
        border border-[#3B82F6]/40
        shadow-sm
        transition-all hover:-translate-y-1 hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}
