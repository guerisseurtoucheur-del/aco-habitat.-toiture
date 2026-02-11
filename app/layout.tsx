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
  title: "ACO-HABITAT | Diagnostic Toiture par IA - Expert Couverture France Entiere",
  description:
    "Analysez l'etat de votre toiture en quelques secondes grace a l'intelligence artificielle. Diagnostic vegetal, structurel et etancheite. Devis gratuit. Expert toiture France entiere.",
  keywords: ["diagnostic toiture", "IA", "couverture", "renovation toiture", "France entiere", "ACO-HABITAT"],
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
