import { Upload, Brain, FileText, Search } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Uploadez votre photo",
    description:
      "Prenez une capture satellite (Google Maps) ou une photo drone de votre toiture.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    number: "02",
    icon: Brain,
    title: "Analyse par l'IA",
    description:
      "Notre intelligence artificielle analyse chaque zone : vegetation, structure et etancheite.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
  {
    number: "03",
    icon: FileText,
    title: "Rapport detaille",
    description:
      "Recevez un rapport complet avec calques de diagnostic et recommandations d'intervention.",
    color: "text-etancheite-cyan",
    bgColor: "bg-etancheite-cyan/10",
    borderColor: "border-etancheite-cyan/20",
  },
  {
    number: "04",
    icon: Search,
    title: "Trouvez un couvreur",
    description:
      "Transmettez votre rapport PDF a un couvreur via notre annuaire pour obtenir un devis precis et adapte.",
    color: "text-vegetal-red",
    bgColor: "bg-vegetal-red/10",
    borderColor: "border-vegetal-red/20",
  },
]

export function MethodSection() {
  return (
    <section
      id="methode"
      className="relative border-y border-border bg-card/30 py-16 sm:py-28"
      aria-label="Comment diagnostiquer votre toiture avec notre IA en 4 etapes"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-glow-accent),_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent tracking-wide">
            Comment ca marche
          </span>
          <h2
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >

            Du diagnostic au couvreur en{" "}
            <span className="text-gradient-accent">4 etapes</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Un processus simple et rapide pour analyser votre toiture et trouver un professionnel qualifie.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-4 list-none p-0 m-0 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.number} className="relative flex flex-col">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+32px)] hidden h-px w-[calc(100%-32px)] bg-gradient-to-r from-border to-transparent lg:block" />
              )}

              <article className={`flex flex-col gap-5 rounded-2xl border ${step.borderColor} bg-card/50 p-7 transition-all hover:bg-card/80`}>
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.bgColor}`}>
                    <step.icon size={22} className={step.color} aria-hidden="true" />
                  </div>
                  <span
                    className="text-4xl font-bold text-foreground/10"
                    style={{ fontFamily: "var(--font-heading)" }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Etape {step.number} : {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
