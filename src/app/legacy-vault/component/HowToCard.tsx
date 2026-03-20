import Image from "next/image";

export default function HowToCard({
  image,
  title,
  description,
  className = "",
}: {
  image: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`
        w-[280px] h-[326px] md:w-[498px] md:h-auto pb-6
        bg-white
        rounded-[18px]
        border border-[#3B82F6]/40
        shadow-sm
        transition-all hover:-translate-y-1 hover:shadow-lg
        flex flex-col overflow-hidden
        ${className}
      `}
    >
      <div className="relative w-full aspect-[498/220] overflow-hidden rounded-t-[18px]">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover"
        />
      </div>
      <div className="px-6 py-4 flex flex-col items-center">
        <h3 className="text-[#1A2E46] text-xl md:text-2xl font-semibold text-center mb-2">
          {title}
        </h3>
        <p className="text-[#4B5563] text-sm md:text-base text-center leading-relaxed max-w-[400px]">
          {description}
        </p>
      </div>
    </div>
  );
}

