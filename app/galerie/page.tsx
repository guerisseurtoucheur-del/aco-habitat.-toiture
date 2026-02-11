import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Realisations | ACO-HABITAT",
  description:
    "Decouvrez nos realisations en couverture, charpente et isolation. Galerie de projets de renovation de toiture.",
};

const projects = [
  {
    src: "/images/gallery-1.jpg",
    title: "Renovation ardoise",
    location: "Lyon 6e",
    type: "Couverture",
    description:
      "Remplacement complet d'une toiture en ardoise naturelle sur une maison bourgeoise.",
  },
  {
    src: "/images/gallery-2.jpg",
    title: "Pose de tuiles",
    location: "Villeurbanne",
    type: "Couverture",
    description:
      "Installation de tuiles terre cuite sur une villa neuve avec isolation integree.",
  },
  {
    src: "/images/gallery-3.jpg",
    title: "Toiture zinc",
    location: "Caluire",
    type: "Zinguerie",
    description:
      "Renovation complete en zinc a joints debout sur une maison contemporaine.",
  },
  {
    src: "/images/gallery-4.jpg",
    title: "Isolation combles",
    location: "Ecully",
    type: "Isolation",
    description:
      "Isolation thermique par l'interieur avec laine de roche haute performance.",
  },
  {
    src: "/images/gallery-5.jpg",
    title: "Restauration patrimoine",
    location: "Beaujolais",
    type: "Charpente",
    description:
      "Restauration d'une charpente traditionnelle et couverture en tuiles canal sur un corps de ferme.",
  },
  {
    src: "/images/gallery-6.jpg",
    title: "Toiture plate EPDM",
    location: "Bron",
    type: "Etancheite",
    description:
      "Realisation d'une etancheite EPDM sur une extension a toit plat.",
  },
];

const categories = ["Tous", "Couverture", "Zinguerie", "Isolation", "Charpente", "Etancheite"];

export default function GaleriePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Nos realisations
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance max-w-2xl">
            Un savoir-faire prouve sur chaque chantier
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            Decouvrez une selection de nos projets recents en couverture,
            charpente, isolation et zinguerie.
          </p>
        </div>
      </section>

      {/* Filter tags */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  cat === "Tous"
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-border"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-md">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-primary text-sm font-medium mt-1">
                    {project.location}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-balance">
            Votre projet est le prochain ?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Contactez-nous pour discuter de votre projet et obtenir un devis
            gratuit et personnalise.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-lg text-base font-semibold hover:bg-foreground/90 transition-colors"
            >
              Demander un devis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
