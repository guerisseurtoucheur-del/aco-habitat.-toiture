import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Marie Dubois",
    location: "Versailles (78)",
    rating: 5,
    text: "Incroyable ! J'ai juste envoye une capture Google Maps de ma toiture et en 30 secondes j'avais un diagnostic complet. L'equipe est intervenue 3 jours apres pour le demoussage. Travail impeccable.",
    service: "Diagnostic IA + Demoussage",
  },
  {
    name: "Philippe Martin",
    location: "Creteil (94)",
    rating: 5,
    text: "Le diagnostic IA a detecte des tuiles deplacees que je ne voyais meme pas depuis le sol. Reparation rapide et propre. Je recommande vivement ACO-HABITAT pour leur professionnalisme.",
    service: "Reparation toiture",
  },
  {
    name: "Isabelle Moreau",
    location: "Saint-Denis (93)",
    rating: 5,
    text: "Renovation complete de notre toiture suite au diagnostic. Le rapport detaille nous a permis de comprendre exactement les travaux necessaires. Excellent rapport qualite/prix.",
    service: "Renovation complete",
  },
  {
    name: "Laurent Petit",
    location: "Boulogne (92)",
    rating: 5,
    text: "L'outil de diagnostic est bluffant. On voit clairement les zones problematiques avec les calques superposes. Intervention rapide pour l'isolation des combles. Tres satisfait.",
    service: "Isolation thermique",
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
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Decouvrez les retours de nos clients en Ile-de-France.
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
