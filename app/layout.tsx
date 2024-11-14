import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNavbar from "@/components/UserNavbar";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poker ProGrid - Maîtrisez vos tournois. Optimisez vos gains.",
  description: "Maîtrisez vos tournois. Optimisez vos gains.",
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
        <body className={roboto.className}>
          {isAuthed && <UserNavbar />}
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
