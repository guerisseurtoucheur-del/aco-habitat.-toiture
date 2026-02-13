"use client"

import { Check, Zap, FileText, Brain, Scan, Shield, Droplets, Thermometer } from "lucide-react"

const features = [
  { icon: Brain, label: "Analyse IA multi-calques" },
  { icon: Scan, label: "Detection mousse et lichen" },
  { icon: Shield, label: "Detection fissures et tuiles" },
  { icon: Droplets, label: "Analyse etancheite" },
  { icon: Thermometer, label: "Analyse thermique" },
  { icon: FileText, label: "Rapport PDF complet" },
]

export function PricingSection() {
  return (
    <section id="tarifs" className="relative py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-glow-blue),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide">
            Tarif simple
          </span>
          <h2
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Un diagnostic complet pour{" "}
            <span className="text-gradient">9,90 EUR</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Pas d{"'"}abonnement, pas de frais caches. Payez uniquement quand vous en avez besoin.
          </p>
        </div>

        {/* Pricing card */}
        <div className="mx-auto mt-14 max-w-lg">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/80 p-10 backdrop-blur-sm">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-6xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  9,90
                </span>
                <span className="text-xl text-muted-foreground">EUR</span>
                <span className="ml-2 text-sm text-muted-foreground">/ diagnostic</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Analyse complete de votre toiture par intelligence artificielle
                avec rapport PDF telechareable instantanement.
              </p>

              <a
                href="#diagnostic"
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Zap size={18} className="transition-transform group-hover:scale-110" />
                Analyser ma toiture
              </a>

              <ul className="mt-8 flex flex-col gap-3">
                {features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check size={13} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Paiement securise par Stripe.</span>{" "}
                  Vous ne payez que lorsque vous lancez un diagnostic. Aucun abonnement, aucun engagement.
                  Le rapport PDF est genere instantanement apres l{"'"}analyse.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Pourquoi 9,90 EUR ?
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                title: "Expert sur place",
                price: "150 - 300 EUR",
                desc: "Deplacement + attente de RDV",
                highlight: false,
              },
              {
                title: "ACO-HABITAT IA",
                price: "9,90 EUR",
                desc: "Instantane, depuis chez vous",
                highlight: true,
              },
              {
                title: "Drone professionnel",
                price: "200 - 500 EUR",
                desc: "Operateur + post-traitement",
                highlight: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-6 text-center ${
                  item.highlight
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card/30"
                }`}
              >
                <span className="text-xs font-medium text-muted-foreground">{item.title}</span>
                <span
                  className={`text-2xl font-bold ${item.highlight ? "text-primary" : "text-foreground"}`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.price}
                </span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
