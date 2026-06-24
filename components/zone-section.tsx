import { MapPin } from "lucide-react"

const departments = [
  { name: "Orne", code: "61" },
  { name: "Sarthe", code: "72" },
  { name: "Mayenne", code: "53" },
  { name: "Eure", code: "27" },
  { name: "Eure-et-Loir", code: "28" },
]

export function ZoneSection() {
  return (
    <section id="zone" className="border-t border-border bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
              Zone d&apos;intervention
            </span>
            <h2
              className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Présents dans votre département
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              ACO-HABITAT intervient sur 5 départements du Grand Ouest. Vous êtes situé en
              dehors de cette zone&nbsp;? Contactez-nous quand même, nous vous orienterons vers
              une solution adaptée.
            </p>
            <a
              href="#devis"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Vérifier ma zone & demander un devis
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {departments.map((d) => (
              <div
                key={d.code}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-4 py-8 text-center"
              >
                <MapPin size={22} className="text-primary" />
                <span className="text-base font-semibold text-foreground">{d.name}</span>
                <span className="text-sm text-muted-foreground">{d.code}</span>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-border bg-card/50 px-4 py-8 text-center">
              <span className="text-sm font-medium text-muted-foreground">+ alentours</span>
              <span className="text-xs text-muted-foreground">sur demande</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
