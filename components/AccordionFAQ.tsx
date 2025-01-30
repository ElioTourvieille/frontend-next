"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

export function AccordionFAQ() {
  const accordionRef = useRef<React.ElementRef<typeof Accordion>>(null);

  useEffect(() => {
    const items = accordionRef.current?.querySelectorAll(".accordion-item");

    // GSAP animation for each item
    items?.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      ref={accordionRef}
    >
      <AccordionItem value="item-1" className="accordion-item">
        <AccordionTrigger className="text-xl font-semibold text-gray-200">
          Quels tournois sont disponibles sur la plateforme?
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium text-gray-300">
          Les tournois disponibles sont ceux des principales rooms présentes en
          francophonie pour le moment.{" "}
          <p>
            Nous essayerons d&apos;ajouter de nouvelles rooms à l&apos;avenir
            pour les pays voisins. D&apos;autres langues (English, Espanol)
            seront également ajoutées prochainement.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="accordion-item">
        <AccordionTrigger className="text-xl font-semibold text-gray-200">
          Est-ce que je dois payer pour chercher des tournois?
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium text-gray-300">
          Non, le système de filtrage simple est disponible via un compte
          gratuit.{" "}
          <p>
            Toutefois, en passant à un compte payant vous aurez accès à
            d&apos;autres filtres plus avancés et la possibilité de créer vos
            propres grilles de session. Un assistant IA vous aidera également à
            optimiser vos choix de tournois (disponibilité future).
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="accordion-item">
        <AccordionTrigger className="text-xl font-semibold text-gray-200">
          Puis-je modifier ou annuler mon abonnement quand je souhaite?
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium text-gray-300">
          Oui bien sûr vous pouvez upgrade ou annuler votre abonnement à tout
          moment. Pour ce faire, rendez-vous sur la page{" "}
          <span className="text-blue-600 cursor-pointer">Mon profil</span> et
          cliquez sur{" "}
          <span className="text-blue-600">Modifier mon abonnement</span>.
          <p>
            Toutefois si vous annulez un compte payant, vous ne pourrez plus
            accéder aux fonctionnalités de l&apos;application et aux grilles de
            session que vous avez créées.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" className="accordion-item">
        <AccordionTrigger className="text-xl font-semibold text-gray-200">
          J&apos;ai d&apos;autres questions, comment vous contacter?
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium text-gray-300">
          La meilleure façon de nous contacter est par email à{" "}
          <span className="text-blue-600">support@pokerprogrid.com</span> ou
          directement via nos réseaux sociaux.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
