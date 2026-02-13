import { Search, MapPin, Star, ArrowRight, Bell } from "lucide-react"

const regions = [
  "Ile-de-France",
  "Auvergne-Rhone-Alpes",
  "Provence-Alpes-Cote d'Azur",
  "Occitanie",
  "Nouvelle-Aquitaine",
  "Grand Est",
  "Hauts-de-France",
  "Bretagne",
  "Pays de la Loire",
  "Normandie",
  "Centre-Val de Loire",
  "Bourgogne-Franche-Comte",
]

export function CouvreurSection() {
  return (
    <section id="couvreurs" className="relative py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Search size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">ANNUAIRE COUVREURS</span>
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Trouvez un couvreur pres de chez vous
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Transmettez votre rapport PDF a un professionnel qualifie pour obtenir un devis
            precis et adapte aux problemes detectes par notre IA.
          </p>
        </div>

        {/* Coming soon card */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center">
            {/* Subtle grid bg */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Bell size={28} className="text-primary" />
              </div>
              <h3
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Annuaire en cours de construction
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Nous constituons un reseau de couvreurs partenaires verifies dans toute la France.
                Laissez votre email pour etre prevenu du lancement.
              </p>

              {/* Email signup */}
              <div className="mx-auto mt-8 flex max-w-md gap-3">
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  className="h-12 flex-1 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                  Me prevenir
                  <ArrowRight size={14} />
                </button>
              </div>

              <p className="mt-4 text-[10px] text-muted-foreground/60">
                Aucun spam. Juste une notification au lancement de l{"'"}annuaire.
              </p>
            </div>
          </div>
        </div>

        {/* Regions grid */}
        <div className="mt-12">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Regions couvertes prochainement
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
            {regions.map((region) => (
              <div
                key={region}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
              >
                <MapPin size={10} />
                {region}
              </div>
            ))}
          </div>
        </div>

        {/* Couvreur CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Vous etes couvreur et souhaitez rejoindre notre reseau ?
          </p>
          <a
            href="mailto:aco.habitat@orange.fr?subject=Inscription annuaire couvreurs"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Contactez-nous
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
