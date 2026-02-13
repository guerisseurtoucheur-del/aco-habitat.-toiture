import Image from "next/image"
import { Zap, ExternalLink } from "lucide-react"

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const footerLinks: { title: string; links: FooterLink[] }[] = [
  {
    title: "Produit",
    links: [
      { label: "Diagnostic Toiture IA", href: "#diagnostic" },
      { label: "Comment ca marche", href: "#methode" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Exemple de rapport PDF", href: "#diagnostic" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Trouver un couvreur", href: "#couvreurs" },
      { label: "Guide : quand renover sa toiture", href: "/guide/quand-renover-toiture" },
      { label: "Guide : dangers de la mousse", href: "/guide/mousse-toiture-dangers" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "A propos", href: "#methode" },
      { label: "Contact / Support", href: "mailto:aco.habitat@orange.fr" },
      { label: "Mentions legales & CGV", href: "/mentions-legales" },
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
              Analyse complete par IA en 30 secondes. Rapport PDF instantane.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#diagnostic"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Zap size={16} className="transition-transform group-hover:scale-110" />
                Analyser ma toiture - 9,90 EUR
              </a>
              <a
                href="#couvreurs"
                className="rounded-xl border border-border bg-secondary/50 px-8 py-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary"
              >
                Trouver un couvreur
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
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/logo-aco-habitat.png"
                    alt="Logo ACO-HABITAT"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-foreground leading-tight">ACO-HABITAT</span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                    Diagnostic Toiture par IA
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Plateforme de diagnostic de toiture par intelligence artificielle.
                Analysez l{"'"}etat de votre couverture en 30 secondes. Rapport PDF complet.
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="tel:+33233311979" className="hover:text-foreground transition-colors">
                  02 33 31 19 79
                </a>
                <a href="mailto:aco.habitat@orange.fr" className="hover:text-foreground transition-colors">
                  aco.habitat@orange.fr
                </a>
              </div>

              {/* Price badge */}
              <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                <Zap size={16} className="text-primary" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">9,90 EUR par diagnostic</span>
                  <span className="text-[10px] text-muted-foreground">Rapport PDF complet inclus</span>
                </div>
              </div>
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
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        {link.external && <ExternalLink size={11} />}
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
            <a href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions legales & CGV</a>
            <a href="/mentions-legales#donnees" className="hover:text-foreground transition-colors">Confidentialite</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
