import { Hammer, Thermometer, Home, TreePine, HardHat, Search } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Diagnostic IA",
    description:
      "Analyse complete de votre toiture par intelligence artificielle a partir d'une simple photo satellite.",
  },
  {
    icon: Hammer,
    title: "Reparation de toiture",
    description:
      "Intervention rapide pour fuites, tuiles cassees, faitage endommage et tous types de reparations.",
  },
  {
    icon: Home,
    title: "Renovation complete",
    description:
      "Renovation integrale de couverture : depose, charpente, pose de nouvelles tuiles ou ardoises.",
  },
  {
    icon: Thermometer,
    title: "Isolation thermique",
    description:
      "Isolation de combles et sous-toiture pour reduire votre facture energetique et gagner en confort.",
  },
  {
    icon: TreePine,
    title: "Demoussage et traitement",
    description:
      "Nettoyage haute pression, traitement anti-mousse et hydrofuge pour proteger votre toiture.",
  },
  {
    icon: HardHat,
    title: "Charpente",
    description:
      "Expertise et travaux de charpente : renforcement, remplacement de pieces, traitement du bois.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">Nos services</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Une expertise complete pour votre habitat
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            De l{"'"}analyse par IA a la realisation des travaux, ACO-HABITAT vous
            accompagne a chaque etape.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <service.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
