"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title?: string;
    image: string;
    profession: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const originalCountRef = useRef(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
    // cleanup duplicated nodes on unmount
    return () => {
      if (scrollerRef.current && originalCountRef.current) {
        const cur = scrollerRef.current;
        const total = cur.children.length;
        const toRemove = total - originalCountRef.current;
        for (let i = 0; i < toRemove; i++) {
          const last = cur.lastElementChild;
          if (last) cur.removeChild(last);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scroller = scrollerRef.current;
      // store original count so we can clean up later
      originalCountRef.current = scroller.children.length;

      const scrollerContent = Array.from(scroller.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scroller.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
      role="region"
      aria-label="Testimonials scroller"
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            className="
              relative 
              max-w-full 
              shrink-0 
              rounded-2xl 
              border border-black 
              px-6 py-5 
              shadow-xl
              /* responsive card widths: mobile -> tablet -> desktop */
              w-[260px] sm:w-[320px] md:w-[350px] lg:w-[450px]
            "
            key={item.name}
          >
            <blockquote>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full shadow-md w-10 h-10 md:w-12 md:h-12"
                  />
                </div>

                <div className="ml-4">
                  <div className="flex items-center">
                    <span className="flex flex-col gap-1">
                      <span className="text-lg font-semibold leading-[1.2] text-neutral-500 dark:text-gray-400">
                        {item.name}
                      </span>
                      <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                        {item.profession}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* background border/overlay (non-interactive) */}
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-10 h-[calc(100%+4px)] w-[calc(100%+4px)]"
              />

              <p className="relative z-20 mt-3 text-sm leading-[1.6] font-normal text-neutral-800 dark:text-gray-100">
                {item.quote}
              </p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
