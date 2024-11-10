import { GridBackground } from "@/components/GridBackground";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ChevronDown } from "lucide-react";

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
    </>
  );
}
