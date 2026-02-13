"use client"

import Link from "next/link"
import { Hammer, Thermometer, Home, TreePine, HardHat, Search, ArrowUpRight } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Diagnostic IA",
    slug: "diagnostic-ia",
    description:
      "Analyse complete de votre toiture par intelligence artificielle a partir d'une simple photo satellite ou drone.",
    highlight: true,
  },
  {
    icon: Hammer,
    title: "Reparation",
    slug: "reparation-toiture",
    description:
      "Intervention rapide pour fuites, tuiles cassees, faitage endommage et tous types de reparations urgentes.",
    highlight: false,
  },
  {
    icon: Home,
    title: "Renovation complete",
    slug: "renovation-toiture",
    description:
      "Renovation integrale de couverture : depose, charpente, pose de nouvelles tuiles ou ardoises.",
    highlight: false,
  },
  {
    icon: Thermometer,
    title: "Isolation thermique",
    slug: "isolation-thermique",
    description:
      "Isolation de combles et sous-toiture pour reduire votre facture energetique et ameliorer votre confort.",
    highlight: false,
  },
  {
    icon: TreePine,
    title: "Demoussage",
    slug: "demoussage",
    description:
      "Nettoyage haute pression, traitement anti-mousse et application d'hydrofuge protecteur longue duree.",
    highlight: false,
  },
  {
    icon: HardHat,
    title: "Charpente",
    slug: "charpente",
    description:
      "Expertise et travaux de charpente : renforcement, remplacement de pieces, traitement curatif du bois.",
    highlight: false,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-glow-blue),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide">
              Nos services
            </span>
            <h2
              className="mt-4 max-w-lg text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Une expertise complete pour votre habitat
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            De l{"'"}analyse par IA a la realisation des travaux, nous vous
            accompagnons a chaque etape de votre projet.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={`/services/${service.slug}`}
              className={`group relative flex flex-col gap-5 rounded-2xl border p-7 transition-all duration-300 ${
                service.highlight
                  ? "border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10"
                  : "border-border bg-card/40 hover:border-border/80 hover:bg-card/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    service.highlight ? "bg-primary/15" : "bg-secondary"
                  }`}
                >
                  <service.icon
                    size={22}
                    className={service.highlight ? "text-primary" : "text-muted-foreground group-hover:text-foreground transition-colors"}
                  />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground/0 transition-all group-hover:text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
