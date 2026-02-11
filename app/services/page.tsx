import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Shield,
  Satellite,
  Clock,
  Home,
  Droplets,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Services | ACO-HABITAT",
  description:
    "Couverture, charpente, isolation, zinguerie et diagnostic IA satellite. Decouvrez l'ensemble de nos services de toiture et renovation.",
};

const services = [
  {
    icon: Wrench,
    title: "Couverture & Toiture",
    description:
      "Pose neuve et renovation complete de votre toiture. Nous travaillons tous types de materiaux : tuiles en terre cuite, ardoises naturelles, zinc, bac acier. Chaque chantier est realise dans le respect des normes DTU et des regles de l'art.",
    features: [
      "Pose de tuiles, ardoises et zinc",
      "Renovation et remplacement complet",
      "Traitement anti-mousse et nettoyage",
      "Reparation de fuites et infiltrations",
      "Etancheite toiture-terrasse",
    ],
  },
  {
    icon: Home,
    title: "Charpente",
    description:
      "Conception, fabrication et pose de charpentes traditionnelles ou industrielles. Nous intervenons pour les constructions neuves comme pour les renovations. Nos charpentiers qualifies garantissent solidite et durabilite.",
    features: [
      "Charpente traditionnelle en bois massif",
      "Charpente industrielle (fermettes)",
      "Modification et surelevement",
      "Traitement curatif et preventif",
      "Renforcement structurel",
    ],
  },
  {
    icon: Shield,
    title: "Isolation Thermique",
    description:
      "L'isolation de votre toiture represente jusqu'a 30% d'economies d'energie. Nous proposons des solutions d'isolation par l'interieur (ITI) et par l'exterieur (ITE), avec des materiaux certifies et eligibles aux aides de l'Etat.",
    features: [
      "Isolation par l'interieur (laine de verre, roche)",
      "Isolation par l'exterieur (sarking)",
      "Isolation des combles perdus",
      "Eligibilite aux aides MaPrimeRenov",
      "Bilan thermique gratuit",
    ],
  },
  {
    icon: Droplets,
    title: "Zinguerie",
    description:
      "La zinguerie assure l'etancheite et l'evacuation des eaux pluviales. Nous realisons la pose et le remplacement de gouttieres, chenaux, descentes et raccords en zinc, cuivre ou aluminium laque.",
    features: [
      "Gouttieres et descentes pluviales",
      "Chenaux et noues",
      "Raccords et abergements",
      "Habillage de bandeaux et debords",
      "Zinc, cuivre et aluminium laque",
    ],
  },
  {
    icon: Satellite,
    title: "Diagnostic IA Satellite",
    description:
      "Grace a notre technologie d'intelligence artificielle, nous analysons les images satellite de votre toiture pour detecter les anomalies : mousse, tuiles cassees, deformations, problemes d'etancheite. Un rapport detaille est genere en quelques secondes.",
    features: [
      "Analyse par intelligence artificielle",
      "Detection automatique des defauts",
      "Rapport d'expertise instantane",
      "Evaluation du niveau d'urgence",
      "Gratuit et sans engagement",
    ],
  },
  {
    icon: Clock,
    title: "Urgence & Depannage",
    description:
      "Fuite soudaine, degat de tempete, infiltration urgente ? Notre equipe intervient rapidement pour securiser votre toiture et effectuer les reparations necessaires. Disponible 7j/7 pour les urgences.",
    features: [
      "Intervention rapide sous 24h",
      "Bachage d'urgence",
      "Reparation ponctuelle",
      "Disponible 7 jours sur 7",
      "Devis sur place immediat",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Nos services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance max-w-2xl">
            L&apos;expertise toiture au service de votre habitat
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            De la couverture a l&apos;isolation, nous proposons une gamme
            complete de services pour entretenir, reparer et ameliorer votre
            toiture.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-serif">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div
                  className={`bg-card border border-border rounded-xl p-8 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                    Ce que nous proposons
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground font-serif text-balance">
            Un projet en tete ?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto leading-relaxed">
            Contactez-nous pour un devis gratuit et personnalise. Notre equipe
            vous repond sous 24h.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-background/90 transition-colors"
            >
              Demander un devis
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 px-8 py-4 rounded-lg text-base font-semibold hover:bg-primary-foreground/20 transition-colors"
            >
              <Satellite className="h-5 w-5" />
              Diagnostic gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
