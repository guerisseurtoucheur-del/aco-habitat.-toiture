import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "ACO-HABITAT | Toiture & Renovation",
  description:
    "Specialiste en toiture et renovation de l'habitat. Diagnostic IA par satellite, couverture, isolation, charpente. Devis gratuit.",
  keywords: [
    "toiture",
    "couverture",
    "renovation",
    "habitat",
    "diagnostic IA",
    "charpente",
    "isolation",
    "devis gratuit",
  ],
};

export const viewport: Viewport = {
  themeColor: "#C45A3C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
