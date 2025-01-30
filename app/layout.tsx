import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNavbar from "@/components/UserNavbar";
import Image from "next/image";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poker ProGrid - Maîtrisez vos tournois. Optimisez vos gains.",
  description: "Votre plateforme de poker pour gérer vos grilles de tournois afin d'optimiser vos gains.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();

  return (
    <AuthProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${roboto.className} bg-[#0A0F1C] min-h-screen`}>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
            <Image
              src="/img/bg-icons.png"
              alt="Background Pattern"
              fill
              className="object-cover opacity-[0.08]"
              priority
            />
          </div>
          <div className="relative z-1">
            {isAuthed && <UserNavbar />}
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
