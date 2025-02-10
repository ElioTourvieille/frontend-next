"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import clsx from "clsx";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass: string;
}

function AnimatedTitle({ title, containerClass }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = containerRef.current?.querySelectorAll(".animated-word");

    if (words) {
      words.forEach((word) => {
        // Create a ScrollTrigger for each word
        ScrollTrigger.create({
          trigger: word,
          start: "top 95%", 
          end: "top 80%",
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            gsap.fromTo(
              word,
              {
                opacity: 0, // Initial state
                transform:
                  "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
              },
              {
                opacity: 1, // Final state
                transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
                ease: "power2.out",
                duration: 0.6,
              }
            );
          },
          onLeaveBack: () => {
            gsap.to(word, {
              opacity: 0,
              transform:
                "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
              ease: "power2.in",
              duration: 0.6,
            });
          },
        });
      });
    }

    // Clean up ScrollTriggers to avoid memory leaks
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnimatedTitle;
