import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aco-habitat.fr"

  const services = [
    "couverture",
    "charpente",
    "diagnostic-ia",
    "reparation-toiture",
    "renovation-toiture",
    "isolation-thermique",
    "demoussage",
  ]

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages,
  ]
}
