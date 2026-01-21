import Image from "next/image";

export default function EmotionalWillBanner() {
  return (
    <section className="w-full py-20 px-6 flex justify-center">
      <Image
        src="/images/Frame400.png"
        alt="clipboard illustration"
        width={1400}
        height={1000}
      />
    </section>
  );
}
