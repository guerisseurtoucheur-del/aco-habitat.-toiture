import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-black tracking-tight text-primary font-serif">
                ACO
              </span>
              <span className="text-2xl font-black tracking-tight text-background font-serif">
                -HABITAT
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed">
              Specialiste en toiture et renovation de l&apos;habitat.
              Diagnostic IA, couverture, isolation et charpente.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/80">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-background/60 hover:text-background transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-background/60 hover:text-background transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-sm text-background/60 hover:text-background transition-colors">
                  Realisations
                </Link>
              </li>
              <li>
                <Link href="/diagnostic" className="text-sm text-background/60 hover:text-background transition-colors">
                  Diagnostic IA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-background/60 hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/80">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-background/60">Couverture & Toiture</li>
              <li className="text-sm text-background/60">Charpente</li>
              <li className="text-sm text-background/60">Isolation thermique</li>
              <li className="text-sm text-background/60">Zinguerie</li>
              <li className="text-sm text-background/60">Diagnostic satellite IA</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/80">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <a href="tel:+33600000000" className="text-sm text-background/60 hover:text-background transition-colors">
                  06 00 00 00 00
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <a href="mailto:contact@aco-habitat.fr" className="text-sm text-background/60 hover:text-background transition-colors">
                  contact@aco-habitat.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-background/60">
                  France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            &copy; {new Date().getFullYear()} ACO-HABITAT. Tous droits reserves.
          </p>
          <p className="text-sm text-background/40">
            Artisan couvreur qualifie RGE
          </p>
        </div>
      </div>
    </footer>
  );
}
