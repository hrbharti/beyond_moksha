"use client";

const Memorial: React.FC = () => {
  return (
    <section className="w-full max-w-4xl" id="memorial">
      {/* Heading */}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 text-3xl md:text-5xl font-serif mb-8">
        Memorial
      </h1>

      {/* Paragraphs */}
      <div className="space-y-6 text-base leading-relaxed text-gray-800">
        <p>
          Tommy, a beloved companion and cherished member of the family, passed away peacefully on March 25, 2023. Born on March 10, 2010, Tommy brought unconditional love, comfort, and joy into every moment of our lives.
        </p>

        <p>
          From quiet mornings to joyful walks and playful evenings, Tommy was always present with loyalty and warmth. He had a gentle nature, an intuitive understanding of his family, and a way of turning ordinary days into special memories.
        </p>

        <p>
          Tommy was more than a pet, he was family. His presence filled the home with affection, routine, and a sense of calm that will always be remembered.
        </p>

        <p>
          He is survived by the family who loved him deeply and will forever carry his memory in their hearts.
        </p>

        <p>
          Om Shanti.
        </p>
      </div>
    </section>
  );
};

export default Memorial;
