import HowToCard from "./HowToCard";

export default function HowToCreateEmotionalWill() {
  return (
    <section className="w-full bg-[#F1F8FC] py-10 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-medium text-[#1A2E46]">
          How to create <span className="text-[#0866FF]">Emotional will</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center">
          <HowToCard />
          <HowToCard />
          <HowToCard />
          <HowToCard />
        </div>
      </div>
    </section>
  );
}
