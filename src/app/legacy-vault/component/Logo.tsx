"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo({
  isNav,
  className,
  routeTo = "/",
}: {
  isNav?: boolean;
  className?: string;
  routeTo?: string;
}) {
  const beyondClassName = isNav
    ? "bg-gradient-to-b from-[#0866FF] to-[#0866FF] bg-clip-text text-transparent"
    : "white";

  const router = useRouter();

  return (
    <div
      className="cursor-pointer flex items-center"
      onClick={() => router.push(routeTo)}
    >
      <Image
        src="/images/bird.png"
        alt="Beyond-moksha image"
        width={40}
        height={40}
      />
      <div className="h-full">
        <div className={`${className}`}>
          <span className={beyondClassName}>Beyond</span>
          <span
            className={`${isNav ? "text-[#1E293B] text-gradient-to-t from-[#1E293B] to-[#1E293B]" : "text-white"}`}
          >
            Moksha
          </span>
        </div>
        <div className="text-[#1E293B] text-right">Legacy Vault</div>
      </div>
    </div>
  );
}
