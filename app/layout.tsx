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
  title: "ACO-HABITAT | Expert Couverture & Charpente - Diagnostic Toiture IA | France Entiere",
  description:
    "Expert couverture et charpente sur toute la France. Diagnostic toiture par intelligence artificielle en 30 secondes. Reparation, renovation, isolation, demoussage et travaux de charpente. Devis gratuit sous 24h.",
  keywords: [
    "couvreur",
    "charpentier",
    "diagnostic toiture",
    "diagnostic toiture IA",
    "couverture",
    "charpente",
    "renovation toiture",
    "reparation toiture",
    "isolation thermique",
    "demoussage toiture",
    "ACO-HABITAT",
    "France entiere",
  ],
  openGraph: {
    title: "ACO-HABITAT | Expert Couverture & Charpente - France Entiere",
    description:
      "Diagnostic toiture par IA en 30 secondes. Expert couverture et charpente. Devis gratuit.",
    type: "website",
    locale: "fr_FR",
    siteName: "ACO-HABITAT",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://aco-habitat.fr",
              name: "ACO-HABITAT",
              alternateName: "ACO-HABITAT Expert Couverture & Charpente",
              description:
                "Expert couverture et charpente sur toute la France. Diagnostic toiture par intelligence artificielle. Reparation, renovation, isolation, demoussage et travaux de charpente.",
              url: "https://aco-habitat.fr",
              telephone: "+33233311979",
              email: "aco.habitat@orange.fr",
              areaServed: {
                "@type": "Country",
                name: "France",
              },
              serviceType: [
                "Couverture",
                "Charpente",
                "Diagnostic toiture",
                "Reparation de toiture",
                "Renovation de toiture",
                "Isolation thermique",
                "Demoussage",
                "Traitement de charpente",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services Toiture & Charpente",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Diagnostic Toiture par IA",
                      description:
                        "Analyse complete de votre toiture par intelligence artificielle a partir d'une photo satellite ou drone.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Travaux de Couverture",
                      description:
                        "Reparation, renovation complete, demoussage et isolation de toiture.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Travaux de Charpente",
                      description:
                        "Expertise et travaux de charpente : renforcement, remplacement de pieces, traitement curatif du bois.",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                ratingCount: "500",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "19:00",
              },
              priceRange: "$$",
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
