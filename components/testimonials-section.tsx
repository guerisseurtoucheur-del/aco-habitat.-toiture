import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "C. Durand",
    location: "Versailles (78)",
    rating: 5,
    text: "J'ai paye 9,90 EUR et en 30 secondes j'avais un diagnostic complet de ma toiture. Le rapport PDF m'a permis de negocier avec le couvreur en sachant exactement ce qu'il fallait faire.",
    service: "Diagnostic complet",
  },
  {
    name: "M. Garnier",
    location: "Lyon (69)",
    rating: 5,
    text: "Le diagnostic a detecte des tuiles deplacees que je ne voyais meme pas depuis le sol. J'ai transmis le PDF a un couvreur de l'annuaire, il a confirme et intervenu dans la semaine.",
    service: "Detection structure",
  },
  {
    name: "S. Lefevre",
    location: "Nantes (44)",
    rating: 5,
    text: "Avant de vendre ma maison, j'ai fait analyser la toiture. Le rapport m'a rassure : tout etait en bon etat. Ca m'a evite de payer un expert 200 EUR pour rien.",
    service: "Diagnostic pre-vente",
  },
  {
    name: "P. Rousseau",
    location: "Toulouse (31)",
    rating: 5,
    text: "L'analyse thermique est bluffante. On voit clairement les zones de deperdition. J'ai pu cibler exactement ou isoler, ce qui m'a fait economiser sur le devis.",
    service: "Analyse thermique",
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
