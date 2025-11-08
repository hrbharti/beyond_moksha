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
          Rebecca Wilson, a beloved wife, mother, and dedicated community member,
          peacefully passed away on March 25, 2023 – at the age of 73.
          Born on March 10, 1950, Rebecca grew up with strong family values and
          a deep sense of community.
        </p>

        <p>
          She excelled academically and athletically in high school, eventually
          earning a Bachelor&apos;s degree in Business Administration.
          In 1975, Rebecca married her love, Mark, and they shared 48 years of a
          loving marriage, raising two children, Emily and Michael, and becoming
          adoring grandparents to Grace, Ethan, and Lily.
        </p>

        <p>
          Professionally, Rebecca had a distinguished career in finance, marked
          by her integrity and mentorship of young professionals. She also
          dedicated her time to various charitable causes, leaving a positive
          impact on her community.
        </p>

        <p>
          Rebecca had a passion for the outdoors, often spending weekends
          camping, fishing, and hiking with her family, instilling a love for
          nature in her loved ones.
        </p>

        <p>
          Rebecca is survived by her husband, children, grandchildren, and
          siblings, Robert Jr. and Susan. A memorial service will be held on
          October 2, 2023, at St. Mary&apos;s Community Church at 2:00 PM.
        </p>

        <p>
          In lieu of flowers, the family requests donations to the Rebecca
          Wilson Memorial Scholarship Fund, supporting underprivileged youth&apos;s
          education in the community. Rebecca&apos;s legacy lives on through the
          countless lives she touched, the values she upheld, and the love she
          shared. She will be deeply missed but forever cherished.
        </p>
      </div>
    </section>
  );
};

export default Memorial;
