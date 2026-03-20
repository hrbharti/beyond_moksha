import HowToCard from "./HowToCard";

export default function HowToCreateEmotionalWill() {
  return (
    <section className="w-full bg-[#F1F8FC] py-10 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-medium text-[#1A2E46]">
          How to create <span className="text-[#0866FF]">Emotional will</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center">
          <HowToCard 
            image="/images/legacy-vault/step-1.png"
            title="Pen your thoughts"
            description="Reflect on your values, lessons, and blessings that you want to share with your loved ones."
          />
          <HowToCard 
            image="/images/legacy-vault/step-2.png"
            title="Digital memories"
            description="Add personal photos, videos, and voice recordings to give your message a more heartfelt touch."
          />
          <HowToCard 
            image="/images/legacy-vault/step-3.png"
            title="Share the legacy"
            description="Decide who will receive your emotional will and when they will be able to access it."
          />
          <HowToCard 
            image="/images/legacy-vault/step-4.png"
            title="Secure the vault"
            description="Everything is encrypted and securely stored, waiting to be shared as a lasting legacy."
          />
        </div>
      </div>
    </section>
  );
}
