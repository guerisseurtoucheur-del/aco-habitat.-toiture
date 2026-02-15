import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://diag.aco-habitat.fr"

  const services = [
    "couverture",
    "charpente",
    "diagnostic-ia",
    "reparation-toiture",
    "renovation-toiture",
    "isolation-thermique",
    "demoussage",
  ]

  const guides = [
    "diagnostic-toiture-satellite",
    "quand-renover-toiture",
    "prix-renovation-toiture",
    "mousse-toiture-dangers",
    "glossaire-toiture",
    "degats-grele-toiture",
    "duree-de-vie-toiture",
    "signes-mauvaise-isolation-toiture",
    "methodologie-diagnostic-ia",
  ]

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guide/${guide}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...servicePages,
    ...guidePages,
  ]
}
