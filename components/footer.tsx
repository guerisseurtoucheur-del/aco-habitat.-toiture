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
      { label: "Exemple de rapport PDF", href: "#tarifs" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Glossaire toiture", href: "/guide/glossaire-toiture" },
      { label: "Degats de grele", href: "/guide/degats-grele-toiture" },
      { label: "Duree de vie d'une toiture", href: "/guide/duree-de-vie-toiture" },
      { label: "Signes mauvaise isolation", href: "/guide/signes-mauvaise-isolation-toiture" },
      { label: "Notre methodologie IA", href: "/guide/methodologie-diagnostic-ia" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "A propos", href: "#methode" },
      { label: "Contact / Support", href: "mailto:aco.habitat@orange.fr" },
      { label: "Mentions legales & CGV", href: "/mentions-legales" },
      { label: "Espace pro", href: "/admin" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      {/* CTA Banner */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-6 text-center sm:rounded-2xl sm:p-10">
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
                Analyser ma toiture - 19,90 EUR
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

      {/* Cross-selling charpente banner */}
      <div className="border-t border-amber-500/20 bg-amber-500/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <path d="M3 21h18" />
                <path d="M12 2L2 7h20L12 2z" />
                <path d="M6 12v7" />
                <path d="M18 12v7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Diagnostic charpente par IA
              </p>
              <p className="text-xs text-muted-foreground">
                Analysez aussi votre charpente sur notre site dedie
              </p>
            </div>
          </div>
          <a
            href="https://aco-habitat.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-400 transition-all hover:bg-amber-500/20"
          >
            aco-habitat.fr
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
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
                  <span className="text-xs font-semibold text-foreground">19,90 EUR par diagnostic</span>
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
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
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
