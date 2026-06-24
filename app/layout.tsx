import type { Metadata, Viewport } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"
import { ChatbotWrapper } from "@/components/chatbot-wrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://diag.aco-habitat.fr"),
  title: {
    default: "Traitement du Bois & Charpente | ACO-HABITAT Expert Mérule depuis 2006",
    template: "%s | ACO-HABITAT Traitement du Bois",
  },
  description:
    "Expert du traitement du bois et de la charpente depuis 2006. Traitement curatif et préventif contre les insectes xylophages (capricorne, vrillette, lyctus), la mérule et les champignons lignivores. Diagnostic gratuit et devis sans engagement. Orne, Sarthe, Mayenne, Eure et Eure-et-Loir.",
  keywords: [
    "traitement du bois",
    "traitement charpente",
    "traitement mérule",
    "mérule",
    "insectes xylophages",
    "capricorne des maisons",
    "vrillette",
    "lyctus",
    "champignons lignivores",
    "traitement curatif bois",
    "traitement préventif bois",
    "traitement charpente Orne",
    "traitement mérule Normandie",
    "ACO-HABITAT Alençon",
    "diagnostic charpente gratuit",
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
    siteName: "ACO-HABITAT Traitement du Bois",
    title: "Traitement du Bois & Charpente | ACO-HABITAT Expert Mérule depuis 2006",
    description:
      "Traitement curatif et préventif contre insectes xylophages, mérule et champignons lignivores. Expert depuis 2006. Diagnostic gratuit et devis sans engagement.",
    images: [
      {
        url: "/images/charpente-hero.png",
        width: 1200,
        height: 630,
        alt: "ACO-HABITAT - Traitement du bois et de la charpente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traitement du Bois & Charpente | ACO-HABITAT Expert Mérule",
    description:
      "Traitement curatif et préventif contre insectes xylophages, mérule et champignons lignivores. Expert depuis 2006. Diagnostic gratuit.",
    images: ["/images/charpente-hero.png"],
  },
  category: "construction",
}

export const viewport: Viewport = {
  themeColor: "#b04a25",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans min-h-screen overflow-x-hidden">
        {/* Schema Organization global (le detail LocalBusiness + FAQ est gere par page via StructuredData) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://diag.aco-habitat.fr/#organization",
              name: "ACO-HABITAT",
              alternateName: "ACO-HABITAT Traitement du Bois & Charpente",
              url: "https://diag.aco-habitat.fr",
              logo: "https://diag.aco-habitat.fr/images/logo-aco-habitat.png",
              image: "https://diag.aco-habitat.fr/images/charpente-hero.png",
              foundingDate: "2006",
              description:
                "Expert du traitement du bois et de la charpente depuis 2006 : traitement curatif et préventif contre les insectes xylophages (capricorne, vrillette, lyctus), la mérule et les champignons lignivores.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33233311979",
                email: "aco.habitat@orange.fr",
                contactType: "customer service",
                areaServed: "FR",
                availableLanguage: "French",
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Orne (61)" },
                { "@type": "AdministrativeArea", name: "Sarthe (72)" },
                { "@type": "AdministrativeArea", name: "Mayenne (53)" },
                { "@type": "AdministrativeArea", name: "Eure (27)" },
                { "@type": "AdministrativeArea", name: "Eure-et-Loir (28)" },
              ],
              knowsAbout: [
                "traitement du bois",
                "traitement de charpente",
                "traitement de la mérule",
                "champignons lignivores",
                "insectes xylophages",
                "capricorne des maisons",
                "vrillette",
                "lyctus",
                "traitement curatif du bois",
                "traitement préventif du bois",
                "diagnostic de charpente",
                "humidité et bois",
              ],
            }),
          }}
        />
        {children}
        <ChatbotWrapper />
      </body>
    </html>
  )
}
