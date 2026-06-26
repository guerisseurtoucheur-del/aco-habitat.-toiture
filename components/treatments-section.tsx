import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const treatments = [
  {
    title: "Insectes xylophages",
    image: "/images/insectes-bois.png",
    alt: "Dégâts d'insectes xylophages dans une poutre en bois",
    description:
      "Capricornes, vrillettes et lyctus dévorent votre charpente de l'intérieur. Traitement curatif par injection et pulvérisation pour stopper l'infestation.",
    points: ["Bûchage des bois attaqués", "Injection sous pression", "Pulvérisation fongicide"],
    accent: "#b04a25",
    tag: "Curatif",
  },
  {
    title: "Mérule",
    image: "/images/merule.png",
    alt: "Mérule (Serpula lacrymans) se développant sur une charpente en bois",
    description:
      "La mérule est le pire ennemi du bâti : elle se propage vite et fragilise toute la structure. Diagnostic, assèchement et traitement en profondeur.",
    points: ["Recherche des causes d'humidité", "Traitement des maçonneries", "Remplacement des bois détruits"],
    accent: "#3c5a4a",
    tag: "Urgent",
  },
  {
    title: "Traitement préventif",
    image: "/images/traitement-charpente.png",
    alt: "Artisan traitant une charpente en bois de manière préventive",
    description:
      "Protégez une charpente saine avant qu'il ne soit trop tard. Traitement préventif longue durée contre insectes et champignons.",
    points: ["Application certifiée", "Produits homologués", "Protection longue durée"],
    accent: "#c8912f",
    tag: "Préventif",
  },
]

export function TreatmentsSection() {
  return (
    <section id="traitements" className="border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            Nos traitements
          </span>
          <h2
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Une solution pour chaque agression du bois
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Que votre charpente soit attaquée par des insectes, rongée par la mérule ou simplement
            à protéger, nous intervenons avec des méthodes éprouvées et des produits certifiés.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {treatments.map((t) => (
            <article
              key={t.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ borderTop: `3px solid ${t.accent}` }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={t.image || "/placeholder.svg"}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  style={{ backgroundColor: t.accent }}
                >
                  {t.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  {t.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                <ul className="mt-auto flex flex-col gap-2 pt-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.accent }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#devis"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                  style={{ color: t.accent }}
                >
                  Demander un devis
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
