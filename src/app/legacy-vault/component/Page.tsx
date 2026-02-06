import Image from "next/image";

export default function EmotionalWillBanner() {
  return (
    <Image
      src="/images/Frame400.png"
      alt="clipboard illustration"
      width={1400}
      height={1000}
      className="mx-auto hidden md:block py-10 md:py-20"
    />
  );
}
