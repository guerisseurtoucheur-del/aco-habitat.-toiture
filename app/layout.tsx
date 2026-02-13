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
    "couverture toiture",
    "charpente bois",
    "renovation toiture",
    "reparation toiture",
    "isolation thermique toiture",
    "demoussage toiture",
    "traitement charpente",
    "couvreur France",
    "charpentier France",
    "devis toiture gratuit",
    "ACO-HABITAT",
    "France entiere",
  ],
  metadataBase: new URL("https://aco-habitat.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ACO-HABITAT | Expert Couverture & Charpente - France Entiere",
    description:
      "Diagnostic toiture par IA en 30 secondes. Expert couverture et charpente. Reparation, renovation, isolation et charpente. Devis gratuit.",
    type: "website",
    locale: "fr_FR",
    siteName: "ACO-HABITAT",
    url: "https://aco-habitat.fr",
    images: [
      {
        url: "/images/logo-aco-habitat.png",
        width: 1024,
        height: 1024,
        alt: "ACO-HABITAT - Expert Couverture & Charpente - Diagnostic Toiture IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACO-HABITAT | Expert Couverture & Charpente",
    description:
      "Diagnostic toiture par IA en 30 secondes. Expert couverture et charpente sur toute la France.",
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
}

export const viewport: Viewport = {
  themeColor: "#060a13",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
              logo: "https://aco-habitat.fr/images/logo-aco-habitat.png",
              image: "https://aco-habitat.fr/images/logo-aco-habitat.png",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Comment fonctionne le diagnostic IA de toiture ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Notre intelligence artificielle analyse votre photo satellite ou aerienne en superposant trois calques de diagnostic : vegetal (mousse, lichen), structure (tuiles cassees, deplacees) et etancheite (traces d'humidite, infiltrations). Le resultat est disponible en moins de 30 secondes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quelle photo dois-je utiliser pour le diagnostic ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vous pouvez utiliser une capture d'ecran de Google Maps en vue satellite, une photo prise par drone, ou toute photo aerienne de votre toiture. Plus l'image est nette et recente, plus le diagnostic sera precis.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Le diagnostic en ligne est-il vraiment gratuit ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Oui, le diagnostic IA en ligne est 100% gratuit et sans engagement. Vous recevez instantanement un rapport detaille avec les zones problematiques identifiees et des recommandations d'intervention.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Dans quelles zones intervenez-vous ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ACO-HABITAT intervient sur toute la France. Que vous soyez en Ile-de-France, en Normandie, dans le Nord ou partout ailleurs, nous nous deplacons pour diagnostiquer et reparer votre toiture.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Combien coute une intervention de reparation ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Le cout depend de la nature et de l'etendue des travaux identifies lors du diagnostic. Nous etablissons un devis gratuit et detaille avant toute intervention. Nos prix sont transparents et competitifs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quelle est la precision du diagnostic IA ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Notre IA atteint un taux de precision de 98% pour la detection des problemes de vegetation, de structure et d'etancheite. Le diagnostic est ensuite valide par nos experts couvreurs avant toute intervention.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Diagnostic Toiture IA - ACO-HABITAT",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              url: "https://aco-habitat.fr/#diagnostic",
              description:
                "Outil gratuit de diagnostic de toiture par intelligence artificielle. Analysez l'etat de votre couverture en 30 secondes a partir d'une photo satellite ou drone. Detection de mousse, tuiles cassees, infiltrations et problemes d'isolation.",
              featureList: [
                "Analyse par calque vegetal (mousse, lichen, vegetation)",
                "Analyse par calque structurel (tuiles cassees, deplacees, faitage)",
                "Analyse par calque etancheite (infiltrations, traces d'humidite)",
                "Analyse thermique (deperditions energetiques)",
                "Rapport detaille en PDF",
                "Recommandations d'intervention personnalisees",
              ],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                ratingCount: "500",
              },
              author: {
                "@type": "Organization",
                name: "ACO-HABITAT",
                url: "https://aco-habitat.fr",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "Comment diagnostiquer l'etat de sa toiture avec l'IA ?",
              description:
                "Guide etape par etape pour utiliser l'outil de diagnostic de toiture par intelligence artificielle ACO-HABITAT. Obtenez un rapport complet en moins de 30 secondes.",
              totalTime: "PT1M",
              tool: [
                {
                  "@type": "HowToTool",
                  name: "Photo satellite ou drone de votre toiture",
                },
                {
                  "@type": "HowToTool",
                  name: "Navigateur web (ordinateur ou mobile)",
                },
              ],
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Capturez votre toiture",
                  text: "Prenez une capture d'ecran de votre toiture sur Google Maps en vue satellite, ou utilisez une photo prise par drone. Assurez-vous que l'image est nette et couvre l'ensemble de la toiture.",
                  url: "https://aco-habitat.fr/#diagnostic",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Envoyez la photo a l'IA",
                  text: "Deposez votre photo dans l'outil de diagnostic sur notre site. L'intelligence artificielle accepte les formats JPG, PNG et les captures d'ecran directes.",
                  url: "https://aco-habitat.fr/#diagnostic",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Analysez le rapport de diagnostic",
                  text: "En moins de 30 secondes, l'IA superpose trois calques d'analyse : vegetal (mousse, lichen), structure (tuiles cassees) et etancheite (infiltrations). Chaque probleme est localise et evalue par niveau de gravite.",
                  url: "https://aco-habitat.fr/#diagnostic",
                },
                {
                  "@type": "HowToStep",
                  position: 4,
                  name: "Recevez vos recommandations et devis",
                  text: "Un expert ACO-HABITAT vous contacte avec un devis detaille et des recommandations d'intervention adaptees aux problemes identifies. Le devis est gratuit et sans engagement.",
                  url: "https://aco-habitat.fr/#contact",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
