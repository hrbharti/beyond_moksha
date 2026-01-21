import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavProps {
  isNav: boolean;
}
export default function Logo({ isNav }: NavProps) {
  const beyondClassName = isNav
    ? "bg-gradient-to-b from-[#4682B8] to-[#1F3A52] bg-clip-text text-transparent"
    : "bg-[linear-gradient(90deg,#68553D_0%,#000_32.21%)] bg-clip-text text-transparent";

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
        <div className={`text-4xl mt-3  `}>
          <span className={beyondClassName}>Beyond</span>
          <span className="text-[#BC911B] text-gradient-to-t from-[#BC911B] to-[#DFAA16]">
            Moksha
          </span>
        </div>
        <div className="text-red-500">सर्वसंस्कारसहायाः</div>
      </div>
    </div>
  );
}
