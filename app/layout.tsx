import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ACO-HABITAT | Diagnostic Toiture par IA",
  description:
    "Analysez l'etat de votre toiture grace a l'intelligence artificielle. Diagnostic vegetal, structurel et etancheite en quelques secondes. ACO-HABITAT, expert toiture.",
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
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans min-h-screen">
        {children}
      </body>
    </html>
  )
}
