import { Search, ClipboardCheck, SprayCan, FileCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Inspection sur place",
    description: "Nous examinons votre charpente, identifions les agresseurs (insectes, mérule) et l'étendue des dégâts.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Diagnostic & devis",
    description: "Vous recevez un diagnostic clair et un devis détaillé, gratuit et sans engagement.",
  },
  {
    number: "03",
    icon: SprayCan,
    title: "Traitement",
    description: "Bûchage, injection, pulvérisation : nous appliquons le traitement adapté avec des produits certifiés.",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Garantie",
    description: "Nous vous remettons une attestation de traitement et garantissons notre intervention.",
  },
]

export function MethodSection() {
  return (
    <section
      id="methode"
      className="border-t border-border bg-background py-16 sm:py-24"
      aria-label="Notre méthode de traitement du bois en 4 étapes"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            Notre méthode
          </span>
          <h2
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            De l&apos;inspection à la garantie
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Une démarche transparente, pensée pour vous rassurer à chaque étape.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 list-none p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <article className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <step.icon size={22} className="text-primary" aria-hidden="true" />
                  </div>
                  <span
                    className="text-4xl font-semibold text-foreground/10"
                    style={{ fontFamily: "var(--font-heading)" }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
