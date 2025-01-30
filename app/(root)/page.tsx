import { AccordionFAQ } from "@/components/AccordionFAQ";
import { GridBackground } from "@/components/GridBackground";
import BlurIn from "@/components/ui/blur-in";
import { Button } from "@/components/ui/button";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronDown } from "lucide-react";
import { redirect } from "next/navigation";
import AnimatedTitle from "@/components/AnimatedTitle";
import LaptopMotion from "@/components/LaptopMotion";
import BackgroundAnimation from "@/components/BackgroundAnimation";

// Sticky scroll content
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
        Bénéficiez de l&apos;aide d&apos;un assistant IA pour vos sessions (à
        venir)
      </div>
    ),
  },
];

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();

  if (isAuthed) {
    redirect("/user");
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gray-900 h-[90vh]">
        <GridBackground>
          <div className="flex flex-col items-center">
            <div className="flex-center flex-col gap-10">
              <BlurIn word="Maîtrisez vos" nextWord="tournois." />
              <BlurIn prevWord="Optimisez" word="vos gains." />

              <RegisterLink>
                <Button className="mt-10" variant="elevated" size="lg">
                  Essayer gratuitement
                </Button>
              </RegisterLink>
            </div>
            <a
              href="#solutions"
              aria-label="Scroll to solutions"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            >
              <ChevronDown
                strokeWidth={3.5}
                width={70}
                height={70}
                className="text-gray-200 cursor-pointer animate-bounce"
              />
            </a>
          </div>
        </GridBackground>
      </section>

      {/* SOLUTIONS SECTION */}
      <section
        id="solutions"
        className="h-screen bg-blue-950 flex items-center justify-evenly flex-col"
      >
        <AnimatedTitle
          title="Découvrez nos solutions pour les grinders"
          containerClass="mt-5 text-center"
        />

        <div>
          <StickyScroll content={content} />
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section
        id="feature"
        className="relative bg-gray-900 h-screen flex-center flex-col z-0 py-10"
      >

        <BackgroundAnimation />

        <AnimatedTitle
          title="Créez vos propres grilles de session"
          containerClass="mt-5 text-center"
        />

        <LaptopMotion />

        <RegisterLink>
          <Button variant="elevated" size="lg">
            Commencer maintenant
          </Button>
        </RegisterLink>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="bg-blue-950 h-[90vh]">
        <div className="w-1/2 py-20">
          <AnimatedTitle
            title="Vous avez des questions ?"
            containerClass="mt-5 text-center"
          />
        </div>

        <div className="w-1/2 mx-auto">
          <AccordionFAQ />
        </div>
      </section>
    </>
  );
}