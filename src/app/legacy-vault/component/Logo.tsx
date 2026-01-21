"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo({
  isNav,
  className,
}: {
  isNav?: boolean;
  className?: string;
}) {
  const beyondClassName = isNav
    ? "bg-gradient-to-b from-[#0866FF] to-[#0866FF] bg-clip-text text-transparent"
    : "white";

  const router = useRouter();

  return (
    <div
      className="w-[340px] h-[58px] cursor-pointer flex items-center -mt-2.5"
      onClick={() => router.push("/")}
    >
      <div className="h-full w-17">
        <Image
          src="/images/bird.png"
          alt="Beyond-moksha image"
          width={68}
          height={58}
        />
      </div>
      <div className="h-full ">
        <div className={`${className} mt-3`}>
          <span className={beyondClassName}>Beyond</span>
          <span
            className={`${isNav ? "text-[#1E293B] text-gradient-to-t from-[#1E293B] to-[#1E293B]" : "text-white"}`}
          >
            Moksha
          </span>
        </div>
        <div className="text-[#s1E293B] text-right">Legacy Vault</div>
      </div>
    </div>
  );
}
