"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo({direction}:{direction: "left" | "right" | undefined}) {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden z-5">
      <InfiniteMovingCards
        items={testimonials}
        direction={direction}
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    name: "Priyanka Banerjee",
    quote:
      "We lost my father suddenly, and everything felt overwhelming. Beyond Moksha stepped in and handled everything so smoothly — from paperwork to the cremation arrangements. The team spoke gently, explained each step, and never rushed us. It felt like they truly cared, not just provided a service.",
  },
  {
    name: "Rumman Ahmed",
    quote:
      "I didn’t know where to start when my uncle passed away. A friend suggested Beyond Moksha, and I’m so glad they did. Their staff were calm, respectful, and took care of all the arrangements exactly as we wanted. They made a difficult time a little easier to get through.",
  },
  {
    name: "Siddharth Sekhar",
    quote:
      "The team at Beyond Moksha was a huge help when my grandfather passed. They were professional but also very empathetic. Everything happened on time and with complete respect for our traditions. You rarely come across such organized yet humane service.",
  },
  {
    name: "Misha Kapoor",
    quote:
      "We contacted Beyond Moksha late at night, and within an hour their team was at our doorstep. They managed everything — from the vehicle to the pandit and arrangements at the cremation ground. What really stayed with me was how gentle and patient they were with us.",
  },
  {
    name: "Neha Arora",
    quote:
      "Honestly, I didn’t expect funeral services in India to be this organized. Beyond Moksha handled everything with dignity and empathy. They spoke softly, gave us space to grieve, and quietly ensured every small detail was taken care of. It made a world of difference.",
  },
  {
    name: "Vikas Mehta",
    quote:
      "I reached out to Beyond Moksha after reading about them online, and they delivered exactly what they promised — professionalism, respect, and support. Their coordination was flawless, and they kept me updated at every step. Our family was very grateful for their work.",
  },
  {
    name: "Rashi Gulati",
    quote:
      "We used Beyond Moksha for my mother’s final rites. The entire process was handled with such care and compassion. They didn’t just organize the ceremony; they supported us emotionally. Their presence gave us strength and calm during a very hard time.",
  },
  {
    name: "Samveg Verma",
    quote:
      "Beyond Moksha’s team was outstanding. They arranged everything quickly and with so much respect. What stood out most was how they balanced professionalism with empathy — something that’s so rare. I’ll always recommend them to anyone in need.",
  },
  {
    name: "Kavita Nair",
    quote:
      "When we lost our grandmother, we were lost ourselves. Beyond Moksha took charge gently and respectfully. They arranged everything perfectly — even things we hadn’t thought of. They made us feel looked after, and for that, I’m truly thankful.",
  },
  {
    name: "Rohit Saini",
    quote:
      "It’s never easy to say goodbye, but Beyond Moksha made sure it was done with dignity. They treated my father’s last journey with so much care and respect. Every person on their team was polite and understanding. It’s rare to find such humanity in services today.",
  },
];