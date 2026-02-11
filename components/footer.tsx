import { Zap } from "lucide-react"

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Diagnostic IA", href: "#diagnostic" },
      { label: "Reparation", href: "#services" },
      { label: "Renovation", href: "#services" },
      { label: "Isolation", href: "#services" },
      { label: "Demoussage", href: "#services" },
      { label: "Charpente", href: "#services" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Notre methode", href: "#methode" },
      { label: "Temoignages", href: "#temoignages" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Zones d'intervention",
    links: [
      { label: "Paris (75)", href: "#contact" },
      { label: "Hauts-de-Seine (92)", href: "#contact" },
      { label: "Seine-Saint-Denis (93)", href: "#contact" },
      { label: "Val-de-Marne (94)", href: "#contact" },
      { label: "Yvelines (78)", href: "#contact" },
      { label: "Toute Ile-de-France", href: "#contact" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      {/* CTA Banner */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-glow-blue),_transparent_60%)]" />
          <div className="relative">
            <h3
              className="text-balance text-2xl font-bold text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pret a analyser votre toiture ?
            </h3>
            <p className="mt-3 text-base text-muted-foreground">
              Diagnostic IA gratuit en moins de 30 secondes. Sans engagement.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#diagnostic"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Zap size={16} className="transition-transform group-hover:scale-110" />
                Lancer le diagnostic
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-border bg-secondary/50 px-8 py-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <span className="text-sm font-bold text-primary-foreground font-sans">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-foreground leading-tight">ACO-HABITAT</span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                    Expert Toiture
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Expert en diagnostic et travaux de toiture en Ile-de-France.
                Technologie IA pour un diagnostic precis et rapide.
              </p>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-foreground">{group.title}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {"2026 ACO-HABITAT. Tous droits reserves."}
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Mentions legales</a>
            <a href="#" className="hover:text-foreground transition-colors">Politique de confidentialite</a>
            <a href="#" className="hover:text-foreground transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
