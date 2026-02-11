import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "ACO-HABITAT | Diagnostic Toiture par IA",
  description:
    "Analysez l'etat de votre toiture grace a l'intelligence artificielle. Diagnostic vegetal, structurel et etancheite en quelques secondes.",
}

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
