import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "N. Teixeira",
    location: "Meudon (92)",
    rating: 5,
    text: "On visitait une maison a acheter et la toiture nous inquietait. En 2 minutes on avait le diagnostic : mousse importante et faitage a reprendre. On a negocie 8 000 EUR de moins sur le prix. L'achat le plus rentable de ma vie.",
    service: "Achat immobilier",
  },
  {
    name: "V. Kratzer",
    location: "Colmar (68)",
    rating: 5,
    text: "Apres la grele de juin, je voulais savoir si ma toiture avait souffert avant d'appeler un couvreur. Le rapport a detecte 3 zones de tuiles deplacees. Le couvreur m'a dit que le PDF etait plus precis que certains devis qu'il recoit.",
    service: "Diagnostic complet",
  },
  {
    name: "A. Benkhedda",
    location: "Villeurbanne (69)",
    rating: 5,
    text: "Je mets en vente mon pavillon et l'agent immobilier m'a conseille de faire verifier la toiture. Le diagnostic IA montre que tout est en bon etat, je l'ai mis en annexe de l'annonce. Ca rassure les acheteurs.",
    service: "Vente immobiliere",
  },
  {
    name: "E. Lindqvist",
    location: "Bayonne (64)",
    rating: 5,
    text: "On a achete une longere en Bearn sans pouvoir monter sur le toit. Le diagnostic a revele des problemes d'etancheite au niveau de la noue. On a fait chiffrer les travaux avant de signer, ca nous a evite une mauvaise surprise.",
    service: "Achat immobilier",
  },
  {
    name: "H. Marechal",
    location: "Chartres (28)",
    rating: 5,
    text: "Ma toiture a 25 ans et je me demandais si c'etait le moment de la refaire. Le score global de 72/100 m'a rassure : encore quelques annees tranquille, juste un nettoyage a prevoir. J'ai economise un devis inutile.",
    service: "Diagnostic preventif",
  },
  {
    name: "S. Oliveira",
    location: "Perpignan (66)",
    rating: 5,
    text: "J'ai fait le diagnostic avant de vendre pour anticiper les remarques des acheteurs. Le rapport a montre une zone de mousse et un debut de fissure au faitage. J'ai fait reparer avant les visites, ca m'a coute 400 EUR au lieu de perdre 5 000 EUR en negociation.",
    service: "Vente immobiliere",
  },
]

export function TestimonialsSection() {
  return (
    <section id="temoignages" className="relative py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-glow-accent),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent tracking-wide">
            Temoignages
          </span>
          <h2
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ce que disent nos utilisateurs
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Des proprietaires qui ont fait analyser leur toiture avec ACO-HABITAT.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-7 transition-all hover:border-border/80 hover:bg-card/60"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <Quote size={24} className="text-border" />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {testimonial.text}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
                <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
