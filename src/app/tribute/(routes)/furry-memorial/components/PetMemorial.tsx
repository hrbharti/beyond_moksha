"use client";

interface PetMemorialProps {
  name: string;
  bio?: string;
  dob: string;
  dod?: string;
  accentColor?: string;
  textColor?: string;
}

const Memorial: React.FC<PetMemorialProps> = ({
  name,
  bio,
  dob,
  dod,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
}) => {
  return (
    <section className="w-full max-w-4xl" id="memorial">
      {/* Heading */}
      <h1
        className="text-3xl md:text-5xl font-serif mb-8 pb-4 inline-block border-b-2 text-black"
        style={{ borderColor: accentColor }}
      >
        Memorial
      </h1>

      {/* Paragraphs */}
      <div
        className="space-y-6 text-base leading-relaxed text-gray-800"
        style={{ color: textColor }}
      >
        {bio ? (
          <div className="whitespace-pre-wrap">{bio}</div>
        ) : (
          <>
            <p>
              {name}, a beloved companion and cherished member of the family.
              Born on {dob}
              {dod ? ` and passed away on ${dod}` : ""}. {name} brought
              unconditional love, comfort, and joy into every moment of our
              lives.
            </p>
            <p>
              From quiet mornings to joyful walks and playful evenings, {name}{" "}
              was always present with loyalty and warmth.
              {name} had a gentle nature, an intuitive understanding of the
              family, and a way of turning ordinary days into special memories.
            </p>
            <p>
              {name} was more than a pet, they were family. Their presence
              filled the home with affection, routine, and a sense of calm that
              will always be remembered.
            </p>
            <p>Om Shanti.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Memorial;
