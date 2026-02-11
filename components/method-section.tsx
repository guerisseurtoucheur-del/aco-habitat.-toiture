import { Upload, Brain, FileText, Wrench } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Uploadez votre photo",
    description:
      "Prenez une capture satellite (Google Maps) ou une photo drone/aerienne de votre toiture.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Analyse par l'IA",
    description:
      "Notre intelligence artificielle analyse chaque zone : vegetation, structure et etancheite.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Rapport detaille",
    description:
      "Recevez un rapport complet avec les calques de diagnostic et les recommandations d'intervention.",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Intervention pro",
    description:
      "Si necessaire, notre equipe intervient rapidement pour les reparations identifiees.",
  },
]

export function MethodSection() {
  return (
    <section id="methode" className="border-y border-border bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">Comment ca marche</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Du diagnostic a l{"'"}intervention en 4 etapes
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              <span className="text-5xl font-bold text-primary/15">
                {step.number}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <step.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
