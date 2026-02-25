import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const _spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://diag.aco-habitat.fr"),
  title: {
    default: "Diagnostic Toiture IA 59,90\u20AC | ACO-HABITAT Expert Couvreur France",
    template: "%s | ACO-HABITAT Diagnostic Toiture",
  },
  description:
    "Analysez l'etat de votre toiture en 30 secondes par intelligence artificielle pour seulement 59,90\u20AC. Diagnostic vegetal, structurel, etancheite et thermique. Couvreur expert demoussage, infiltration, renovation toiture. Devis d'intervention gratuit partout en France.",
  keywords: [
    "diagnostic toiture IA 59 euros",
    "diagnostic toiture IA",
    "analyse toiture satellite",
    "couvreur France",
    "expert toiture",
    "demoussage toiture",
    "infiltration toiture",
    "renovation toiture",
    "reparation toiture",
    "couvreur Normandie",
    "couvreur Alencon",
    "devis toiture gratuit",
    "ACO-HABITAT",
  ],
  authors: [{ name: "ACO-HABITAT", url: "https://diag.aco-habitat.fr" }],
  creator: "ACO-HABITAT",
  publisher: "ACO-HABITAT",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://diag.aco-habitat.fr",
    siteName: "ACO-HABITAT Diagnostic Toiture",
    title: "Diagnostic Toiture IA 59,90\u20AC en 30s | ACO-HABITAT Expert Couvreur",
    description:
      "Analysez votre toiture par IA pour 59,90\u20AC : vue satellite, diagnostic vegetal, structurel, etancheite et thermique. Devis d'intervention gratuit. Couvreur expert France entiere.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ACO-HABITAT - Diagnostic toiture par intelligence artificielle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnostic Toiture IA 59,90\u20AC | ACO-HABITAT",
    description:
      "Analysez votre toiture en 30s par IA pour 59,90\u20AC. Diagnostic complet : vegetal, structure, etancheite, thermique. Devis d'intervention gratuit.",
    images: ["/og-image.jpg"],
  },
  category: "construction",
}

export const viewport: Viewport = {
  themeColor: "#060a13",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
