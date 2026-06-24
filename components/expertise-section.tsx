import { ShieldCheck, Clock, BadgeCheck, Users } from "lucide-react"

const stats = [
  { value: "2006", label: "Année de création" },
  { value: "100%", label: "Bois inspecté avant devis" },
  { value: "5", label: "Départements couverts" },
  { value: "48h", label: "Délai de réponse moyen" },
]

const reasons = [
  {
    icon: BadgeCheck,
    title: "Produits certifiés",
    description: "Nous utilisons exclusivement des produits homologués et appliqués selon les normes en vigueur.",
  },
  {
    icon: ShieldCheck,
    title: "Intervention garantie",
    description: "Nos traitements curatifs et préventifs sont garantis. Vous achetez la tranquillité, pas un pari.",
  },
  {
    icon: Clock,
    title: "Réactivité",
    description: "La mérule n'attend pas. Nous intervenons rapidement pour limiter la propagation et les dégâts.",
  },
  {
    icon: Users,
    title: "Artisan, pas intermédiaire",
    description: "Vous traitez directement avec l'entreprise qui réalise les travaux, de l'inspection à la garantie.",
  },
]

export function ExpertiseSection() {
  return (
    <section id="expertise" className="border-t border-border bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
              Pourquoi ACO-HABITAT
            </span>
            <h2
              className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Un savoir-faire au service de votre patrimoine
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              Depuis 2006, nous protégeons les charpentes et les bois de construction des
              maisons normandes et de leurs régions voisines. Notre métier exige rigueur,
              honnêteté et expertise — c&apos;est ce que nous mettons dans chaque chantier.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1 bg-card px-5 py-6">
                  <span
                    className="text-3xl font-semibold text-primary"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <r.icon size={20} className="text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
