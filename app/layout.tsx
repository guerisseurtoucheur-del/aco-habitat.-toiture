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
  title: "ACO-HABITAT | Diagnostic Toiture par IA - Analyse Satellite & Photo | 19,90 EUR",
  description:
    "Analysez l'etat de votre toiture en 30 secondes par intelligence artificielle. Photo satellite ou drone. Rapport PDF complet : mousse, fissures, etancheite, thermique. 19,90 EUR par analyse.",
  keywords: [
    "diagnostic toiture",
    "diagnostic toiture IA",
    "analyse toiture satellite",
    "analyse toiture drone",
    "etat toiture",
    "mousse toiture",
    "fissure toiture",
    "infiltration toiture",
    "rapport toiture PDF",
    "diagnostic toiture en ligne",
    "ACO-HABITAT",
    "inspection toiture",
    "toiture intelligence artificielle",
  ],
  metadataBase: new URL("https://aco-habitat.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ACO-HABITAT | Diagnostic Toiture par IA - 19,90 EUR",
    description:
      "Analysez votre toiture en 30 secondes par IA. Photo satellite ou drone. Rapport PDF complet avec detection mousse, fissures, etancheite.",
    type: "website",
    locale: "fr_FR",
    siteName: "ACO-HABITAT",
    url: "https://aco-habitat.fr",
    images: [
      {
        url: "/images/logo-aco-habitat.png",
        width: 1024,
        height: 1024,
        alt: "ACO-HABITAT - Diagnostic Toiture par IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACO-HABITAT | Diagnostic Toiture par IA",
    description:
      "Analysez votre toiture en 30 secondes par IA. Rapport PDF complet. 19,90 EUR par diagnostic.",
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
              "@type": "WebApplication",
              "@id": "https://aco-habitat.fr",
              name: "ACO-HABITAT - Diagnostic Toiture par IA",
              description:
                "Plateforme de diagnostic de toiture par intelligence artificielle. Analysez l'etat de votre couverture en 30 secondes a partir d'une photo satellite ou drone. Rapport PDF complet.",
              url: "https://aco-habitat.fr",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              logo: "https://aco-habitat.fr/images/logo-aco-habitat.png",
              image: "https://aco-habitat.fr/images/logo-aco-habitat.png",
              offers: {
                "@type": "Offer",
                price: "19.90",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                name: "Diagnostic Toiture Complet",
                description: "Analyse IA complete avec rapport PDF : vegetal, structure, etancheite, thermique.",
              },
              featureList: [
                "Analyse satellite IGN 20cm/pixel",
                "Upload photo drone ou smartphone",
                "Detection mousse et lichen",
                "Detection fissures et tuiles cassees",
                "Analyse etancheite et infiltrations",
                "Analyse thermique et deperditions",
                "Rapport PDF telechareable",
              ],
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
                  name: "Combien coute un diagnostic ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Un diagnostic complet coute 19,90 EUR. Vous recevez instantanement un rapport PDF detaille avec les zones problematiques identifiees, les scores par categorie et des recommandations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quelle est la precision du diagnostic IA ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Notre IA analyse votre toiture sur 4 axes : vegetal (mousse, lichen), structure (tuiles cassees, deplacees), etancheite (infiltrations) et thermique (deperditions). La precision depend de la qualite de l'image fournie.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Puis-je utiliser ma propre photo ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Oui, vous pouvez utiliser une photo drone, une photo prise depuis le sol avec votre smartphone, ou une capture Google Maps. Plus l'image est nette et recente, plus le diagnostic sera precis.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Comment trouver un couvreur apres le diagnostic ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Notre annuaire de couvreurs partenaires vous permet de trouver un professionnel qualifie pres de chez vous. Vous pouvez lui transmettre directement votre rapport PDF pour obtenir un devis precis.",
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
              "@type": "Product",
              name: "Diagnostic Toiture par IA - ACO-HABITAT",
              url: "https://aco-habitat.fr/#diagnostic",
              description:
                "Diagnostic de toiture par intelligence artificielle. Analysez l'etat de votre couverture en 30 secondes a partir d'une photo satellite ou drone. Rapport PDF complet.",
              offers: {
                "@type": "Offer",
                price: "19.90",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
              },
              brand: {
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
                  name: "Telechargez votre rapport PDF",
                  text: "Telechargez votre rapport PDF complet avec scores, zones detectees et recommandations. Transmettez-le a un couvreur de votre choix via notre annuaire pour obtenir un devis.",
                  url: "https://aco-habitat.fr/#diagnostic",
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
              "@type": "LocalBusiness",
              "@id": "https://aco-habitat.fr/#localbusiness",
              name: "ACO-HABITAT",
              description:
                "Entreprise specialisee dans le diagnostic de toiture par intelligence artificielle. Couverture, charpente, renovation, isolation thermique et demoussage en Normandie.",
              url: "https://aco-habitat.fr",
              logo: "https://aco-habitat.fr/images/logo-aco-habitat.png",
              image: "https://aco-habitat.fr/images/logo-aco-habitat.png",
              telephone: "+33233311979",
              email: "aco.habitat@orange.fr",
              priceRange: "EUR EUR",
              currenciesAccepted: "EUR",
              paymentAccepted: "Carte bancaire, Stripe",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Normandie",
                addressRegion: "Normandie",
                addressCountry: "FR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 48.8,
                longitude: -1.2,
              },
              areaServed: [
                {
                  "@type": "GeoCircle",
                  geoMidpoint: { "@type": "GeoCoordinates", latitude: 48.8, longitude: -1.2 },
                  geoRadius: "150000",
                },
                {
                  "@type": "AdministrativeArea",
                  name: "France metropolitaine",
                },
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "12:00",
                },
              ],
              sameAs: [],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "147",
                reviewCount: "89",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services ACO-HABITAT",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Diagnostic Toiture par IA",
                      description:
                        "Analyse complete de votre toiture par intelligence artificielle a partir d'une photo satellite ou drone. Rapport PDF avec scores vegetal, structure, etancheite et thermique.",
                      provider: { "@type": "LocalBusiness", name: "ACO-HABITAT" },
                      areaServed: "France",
                      serviceType: "Diagnostic toiture",
                    },
                    price: "19.90",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Reparation de toiture",
                      description:
                        "Intervention rapide pour fuites, tuiles cassees, faitage endommage et tous types de reparations urgentes.",
                      provider: { "@type": "LocalBusiness", name: "ACO-HABITAT" },
                      areaServed: "Normandie",
                      serviceType: "Reparation toiture",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Renovation complete de toiture",
                      description:
                        "Renovation integrale de couverture : depose, charpente, pose de nouvelles tuiles ou ardoises.",
                      provider: { "@type": "LocalBusiness", name: "ACO-HABITAT" },
                      areaServed: "Normandie",
                      serviceType: "Renovation toiture",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Isolation thermique",
                      description:
                        "Isolation par l'interieur ou l'exterieur, sarking, soufflage de laine. Reduction des deperditions energetiques par la toiture.",
                      provider: { "@type": "LocalBusiness", name: "ACO-HABITAT" },
                      areaServed: "Normandie",
                      serviceType: "Isolation thermique toiture",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Demoussage toiture",
                      description:
                        "Traitement anti-mousse, nettoyage haute pression, application d'hydrofuge pour proteger votre couverture.",
                      provider: { "@type": "LocalBusiness", name: "ACO-HABITAT" },
                      areaServed: "Normandie",
                      serviceType: "Demoussage toiture",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Accueil",
                  item: "https://aco-habitat.fr",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Diagnostic Toiture IA",
                  item: "https://aco-habitat.fr/#diagnostic",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Services",
                  item: "https://aco-habitat.fr/#services",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Contact",
                  item: "https://aco-habitat.fr/#contact",
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
              "@type": "Organization",
              "@id": "https://aco-habitat.fr/#organization",
              name: "ACO-HABITAT",
              url: "https://aco-habitat.fr",
              logo: "https://aco-habitat.fr/images/logo-aco-habitat.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33233311979",
                email: "aco.habitat@orange.fr",
                contactType: "customer service",
                areaServed: "FR",
                availableLanguage: "French",
              },
              knowsAbout: [
                "diagnostic toiture",
                "analyse toiture par IA",
                "couverture",
                "charpente",
                "renovation toiture",
                "isolation thermique toiture",
                "demoussage toiture",
                "etancheite toiture",
                "detection mousse lichen",
                "photo satellite toiture",
                "intelligence artificielle batiment",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
