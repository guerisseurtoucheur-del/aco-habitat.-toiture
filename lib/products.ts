export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [
  {
    id: "diagnostic-toiture",
    name: "Diagnostic Toiture par IA",
    description:
      "Analyse complete de votre toiture : vegetal, structure, etancheite, thermique. Rapport PDF inclus.",
    priceInCents: 5990, // 59,90 EUR
  },
]
