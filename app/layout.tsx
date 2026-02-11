import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ACO-HABITAT | Diagnostic Satellite Toiture",
  description:
    "Outil de diagnostic toiture par intelligence artificielle. Importez une vue satellite pour une analyse immediate des materiaux et defauts.",
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
