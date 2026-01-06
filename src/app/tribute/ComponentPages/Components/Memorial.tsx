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
          Mrs. Radha Devi Sharma passed away peacefully on March 25, 2023, at the age of 73. Born in Varanasi on March 10, 1950, she lived a life guided by grace and strong values.
        </p>

        <p>
          A Commerce graduate from Banaras Hindu University, she served at the State Bank of India with integrity and dedication. Married to Mr. Ramesh Kumar Sharma in 1975, she shared 48 years of family life. She is survived by her husband, children Priya and Aditya, and grandchildren Aaradhya, Arjun, and Ayushmati.
        </p>

        <p>
          The Terhvin ceremony will be held on April 7, 2023, at Kashi Vishwanath Temple.
        </p>

        <p>
          In her memory, contributions to the Radha Devi Memorial Scholarship Fund are welcome.
        </p>

        <p>
          Om Shanti.
        </p>
      </div>
    </section>
  );
};

export default Memorial;
