"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BackgroundAnimation = () => {
  useEffect(() => {
    gsap.fromTo(
      ".background-image",
      { opacity: 0 },
      {
        opacity: 0.15,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".background-image",
          start: "top+=200 center", // Animation commence au milieu de l'élément
          end: "bottom center", 
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      className="background-image absolute inset-0 h-full w-full bg-cover bg-center -z-10"
      style={{ backgroundImage: "url('/img/bg-cards.webp')" }}
    />
  );
};

export default BackgroundAnimation;
