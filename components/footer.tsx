import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Traitements",
    links: [
      { label: "Insectes xylophages", href: "/#traitements" },
      { label: "Mérule & champignons", href: "/#traitements" },
      { label: "Traitement préventif", href: "/#traitements" },
      { label: "Charpente", href: "/#traitements" },
    ],
  },
  {
    title: "L'entreprise",
    links: [
      { label: "Notre expertise", href: "/#expertise" },
      { label: "Notre méthode", href: "/#methode" },
      { label: "Zone d'intervention", href: "/#zone" },
      { label: "Conseils", href: "/blog" },
    ],
  },
  {
    title: "Départements",
    links: [
      { label: "Orne (61)", href: "/#zone" },
      { label: "Sarthe (72)", href: "/#zone" },
      { label: "Mayenne (53)", href: "/#zone" },
      { label: "Eure (27)", href: "/#zone" },
      { label: "Eure-et-Loir (28)", href: "/#zone" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      {/* CTA Banner */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <h3
            className="text-balance text-2xl font-semibold text-foreground sm:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Un doute sur l&apos;état de votre charpente&nbsp;?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
            Ne laissez pas la mérule ou les insectes gagner du terrain. Faites-vous conseiller
            par un expert dès aujourd&apos;hui.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/#devis"
              className="rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Demander un devis gratuit
            </a>
            <a
              href="tel:+33233311979"
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Phone size={15} className="text-primary" />
              02 33 31 19 79
            </a>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
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
                  <span className="text-[10px] font-medium text-muted-foreground tracking-[0.15em] uppercase">
                    Traitement du bois
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Spécialiste du traitement des bois et charpentes : insectes xylophages, mérule
                et champignons lignivores. Expert depuis 2006.
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="tel:+33233311979" className="flex items-center gap-2 transition-colors hover:text-foreground">
                  <Phone size={14} className="text-primary" />
                  02 33 31 19 79
                </a>
                <a href="mailto:aco.habitat@orange.fr" className="flex items-center gap-2 transition-colors hover:text-foreground">
                  <Mail size={14} className="text-primary" />
                  aco.habitat@orange.fr
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  Orne · Sarthe · Mayenne · Eure · Eure-et-Loir
                </span>
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

      {/* Legal info */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>ACO-HABITAT — 18 rue Bernard Palissy, 61000 Alençon</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span>SIRET&nbsp;: 344 616 412 00062</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span>TVA&nbsp;: FR65 344 616 412</span>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="/mentions-legales" className="transition-colors hover:text-foreground">Mentions légales</a>
              <a href="/mentions-legales#donnees" className="transition-colors hover:text-foreground">Confidentialité</a>
              <a href="/admin" className="transition-colors hover:text-foreground">Espace Pro</a>
            </div>
          </div>
          <div className="mt-4 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
            <p>© 2026 ACO-HABITAT — Spécialiste du traitement du bois depuis 2006.</p>
            <p className="mt-1">
              ACO-HABITAT · Marque déposée à l&apos;INPI n° 5266768 · Méthode et format de rapport
              protégés (dépôt e-Soleau INPI).
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
