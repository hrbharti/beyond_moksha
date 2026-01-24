import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavProps {
  isNav: boolean;
  routeTo?: string;
}
export default function Logo({ isNav, routeTo = "/" }: NavProps) {
  const beyondClassName = isNav
    ? "bg-gradient-to-b from-[#4682B8] to-[#1F3A52] bg-clip-text text-transparent"
    : "bg-[linear-gradient(90deg,#68553D_0%,#000_32.21%)] bg-clip-text text-transparent";

  const router = useRouter();

  return (
    <div
      className="cursor-pointer flex items-center"
      onClick={() => router.push(routeTo)}
    >
      <div className="w-12">
        <Image
          src="/images/bird.png"
          alt="Beyond-moksha image"
          width={50}
          height={50}
        />
      </div>
      <div>
        <div className={`text-2xl mt-3  `}>
          <span className={beyondClassName}>Beyond</span>
          <span className="text-[#BC911B] text-gradient-to-t from-[#BC911B] to-[#DFAA16]">
            Moksha
          </span>
        </div>
        <div className="text-red-500 text-xs">सर्वसंस्कारसहायाः</div>
      </div>
    </div>
  );
}
