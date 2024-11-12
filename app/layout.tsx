import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poker Pro Grid",
  description: "Maîtrisez vos tournois. Optimisez vos gains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <AuthProvider>
      <html lang="en" className="scroll-smooth">
        <body className={roboto.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
