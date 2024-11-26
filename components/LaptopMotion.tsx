"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const LaptopMotion = () => {
  const laptopRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const laptop = laptopRef.current;

    if (laptop) {
      gsap.fromTo(
        laptop,
        { scale: 0.4 },
        {
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: laptop,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <Image
      ref={laptopRef}
      src="/img/laptop.webp"
      width={920}
      height={920}
      alt="laptop"
      className="max-w-[700px] 2xl:max-w-[800px]"
    />
  );
};

export default LaptopMotion;
