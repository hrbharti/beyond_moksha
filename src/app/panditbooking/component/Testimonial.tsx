"use client";

import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const testimonials = [
  {
    text: "Excellent service! The pandit ji was very knowledgeable and performed the Griha Pravesh with complete devotion. Booking was seamless and the team was very professional.",
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
  },
  {
    text: "I booked for my daughter's wedding. The pandit was punctual, well-prepared, and explained every ritual. Very satisfied with the service. Highly recommended!",
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 4.5,
  },
  {
    text: "Amazing experience! Booked Satyanarayan Pooja for our new business. The pandit ji was excellent and brought all the necessary materials. Very convenient service.",
    name: "Anita Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
  },
  {
    text: "The Mahamrityunjaya Jaap was conducted with such purity and dedication. My family felt a deep sense of peace. Thank you for the wonderful arrangement.",
    name: "Vikram Singh",
    location: "Bangalore, Karnataka",
    rating: 5,
  },
  {
    text: "We were worried about finding a good pandit in a new city. This platform made it so easy! The Namkaran ceremony was beautiful.",
    name: "Suman Gupta",
    location: "Pune, Maharashtra",
    rating: 4,
  },
  {
    text: "Highly professional service. The pandit for the Office Opening Pooja was on time and completed all rituals authentically. Will definitely book again.",
    name: "Rohan Mehta",
    location: "Surat, Gujarat",
    rating: 4.5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl text-[#1F3A52] font-lora font-normal">
          What <span className="text-[#D29D39]">Devotees</span> Say
        </h2>

        {/* Decorative Divider */}
        <div className="flex justify-center mt-3">
          <Image
            src="/svgs/divider.svg"
            alt="Divider"
            width={664}
            height={50}
            className="w-[664px] h-[50px] object-contain"
          />
        </div>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust us for their religious
          ceremonies. Read their experience and feedback.
        </p>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="border h-100 border-gray-200 shadow-sm p-6 text-left hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Quote + Stars */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#D29D39] text-xl font-bold">”</span>
                <div className="flex text-[#D29D39] text-sm gap-1 items-center">
                  {[...Array(5)].map((_, i) =>
                    item.rating >= i + 1 ? (
                      <FaStar key={i} />
                    ) : item.rating >= i + 0.5 ? (
                      <FaStarHalfAlt key={i} />
                    ) : (
                      <FaStar key={i} className="text-gray-300" />
                    ),
                  )}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xl text-gray-700 leading-relaxed italic">
                {item.text}
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="pl-5">
                  <p className="text-lg font-bold text-[#1F3A52]">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
