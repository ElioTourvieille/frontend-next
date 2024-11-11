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
      <section className="bg-gray-900">
        <GridBackground>
          <div className="flex flex-col items-center">
            <div className="flex-center flex-col gap-12">
              <h1 className="font-bold text-5xl sm:text-7xl text-center text-gray-200">
                Maîtrisez vos <span className="text-blue-600">tournois.</span>
                <br />
                <span className="text-blue-600">Optimisez</span> vos gains.
              </h1>
              <Button variant="elevated" size="lg">
                <RegisterLink>Essayer gratuitement</RegisterLink>
              </Button>
            </div>
            <ChevronDown
              strokeWidth={3}
              width={60}
              height={60}
              className="absolute bottom-1 text-gray-200 cursor-pointer hover:translate-y-2"
            />
          </div>
        </GridBackground>
      </section>

      <section className="h-[85vh] bg-blue-950 flex items-center justify-evenly flex-col">
        <h2 className="font-semibold text-3xl sm:text-5xl text-center text-gray-200">Découvrez nos solutions pour les grinders</h2>
        <div>
          <StickyScroll content={content} />
        </div>
      </section>
    </>
  );
}
