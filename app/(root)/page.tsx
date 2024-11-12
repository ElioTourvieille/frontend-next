import { AccordionFAQ } from "@/components/AccordionFAQ";
import { GridBackground } from "@/components/GridBackground";
import { Button } from "@/components/ui/button";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const content = [
  {
    title: "Filtres personnalisés",
    description:
      "Cherchez, filtrez et découvrez des tournois par nom, par room, par buy-in, par type de tournoi, et bien plus encore. Retrouvez tous les tournois onlines des différentes rooms disponibles pour vous facilement et rapidement.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white text-center">
        Recherche par filtres personnalisés
      </div>
    ),
  },
  {
    title: "Statistiques avancées",
    description:
      "Prenez de meilleures décisions grâce à nos statistiques avancées. Visualisez le ROI, la variance et le nombre moyen de joueurs pour chaque tournoi ainsi que d'autre statistiques afin de maximiser vos profits et optimiser votre sélection de tournois.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-500))] flex items-center justify-center text-white text-center">
        Analysez vos performances avec des statistiques avancées
      </div>
    ),
  },
  {
    title: "Création de grilles de session",
    description:
      "Créez des grilles de session personnalisées directement dans l'app en fonction de vos préférences et stratégies. Sélectionnez des tournois depuis les recherches que vous avez effectuées et construisez une grille adaptée à vos objectifs et à votre style de jeu.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--teal-500),var(--blue-500))] flex items-center justify-center text-white text-center">
        Conception de grilles de session sur mesure
      </div>
    ),
  },
  {
    title: "Assistant IA (bientôt disponible)",
    description:
      "Notre assistant IA vous aidera bientôt à concevoir une grille de session adaptée à votre profil. Grâce à l'IA, optimisez vos choix de tournois selon votre niveau, votre ROI, votre volume de jeu et votre budget.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-600),var(--emerald-600))] flex items-center justify-center text-white text-center">
        Bénéficiez de l'aide d'un assistant IA pour vos sessions (à venir)
      </div>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gray-900 scroll-mt-12">
        <GridBackground>
          <div className="flex flex-col items-center">
            <div className="flex-center flex-col gap-12">
              <h1 className="font-bold text-5xl sm:text-7xl leading-[46px] text-center text-gray-200 drop-shadow-sm">
                Maîtrisez vos <span className="text-blue-600">tournois.</span>
                <br />
                <span className="text-blue-600">Optimisez</span> vos gains.
              </h1>
              <Button variant="elevated" size="lg">
                <RegisterLink>Essayer gratuitement</RegisterLink>
              </Button>
            </div>
            <a
              href="#solutions"
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <ChevronDown
                strokeWidth={3.5}
                width={70}
                height={70}
                className="text-gray-200 cursor-pointer hover:translate-y-2 transition ease-in"
              />
            </a>
          </div>
        </GridBackground>
      </section>

      {/* SOLUTIONS SECTION */}
      <section
        id="solutions"
        className="h-[90vh] bg-blue-950 flex items-center justify-evenly flex-col scroll-mt-12"
      >
        <h2 className="font-semibold text-3xl sm:text-5xl text-center text-gray-200">
          Découvrez nos solutions pour les grinders
        </h2>
        <div>
          <StickyScroll content={content} />
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section
        id="feature"
        className="relative bg-gray-900 h-[90vh] flex-center flex-col z-0 scroll-mt-12"
      >
        {/* Filters to background image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center opacity-20 -z-10"
          style={{ backgroundImage: "url('/img/bg-cards.png')" }}
        />
        <h2 className="font-semibold text-3xl sm:text-5xl text-center text-gray-200">
          Créez vos propres grilles de session
        </h2>
        <Image src="/img/laptop.png" width={900} height={900} alt="laptop" />
        <Button variant="elevated" size="lg">
          <RegisterLink>Commencer maintenant</RegisterLink>
        </Button>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="bg-blue-950 h-[80vh] scroll-mt-12">
        <div className="w-1/2 py-20">
          <h2 className="text-center font-semibold text-3xl sm:text-5xl text-gray-200">
            Vous avez des questions ?
          </h2>
        </div>

        <div className="w-1/2 mx-auto">
          <AccordionFAQ />
        </div>

      </section>
    </>
  );
}
