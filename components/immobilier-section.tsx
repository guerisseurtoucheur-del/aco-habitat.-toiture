"use client"

import { Home, ShieldCheck, TrendingUp, FileText, Users, Scale, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

const profiles = [
  {
    icon: Home,
    title: "Acheteurs",
    subtitle: "Achetez en toute confiance",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    benefits: [
      "Evaluez l'etat reel de la toiture avant d'acheter",
      "Negociez le prix avec un rapport objectif",
      "Evitez les mauvaises surprises (15 000 a 40 000 EUR de travaux)",
      "Rapport PDF a joindre a votre dossier",
    ],
    cta: "Verifier une toiture avant achat",
  },
  {
    icon: TrendingUp,
    title: "Vendeurs",
    subtitle: "Vendez plus vite, plus cher",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
    benefits: [
      "Prouvez le bon etat de votre toiture aux acheteurs",
      "Rassurez et accelerez la vente",
      "Justifiez votre prix de vente avec un rapport IA",
      "Anticipez les objections lors des visites",
    ],
    cta: "Valoriser ma toiture pour la vente",
  },
  {
    icon: Users,
    title: "Agents immobiliers",
    subtitle: "Un outil pour vos mandats",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
    benefits: [
      "Proposez un service supplementaire a vos clients",
      "Securisez vos transactions avec un diagnostic objectif",
      "Demarquez-vous de la concurrence",
      "Rapport professionnel a integrer au dossier de vente",
    ],
    cta: "Ajouter a mes services",
  },
  {
    icon: Building2,
    title: "Mandataires",
    subtitle: "Renforcez votre expertise terrain",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
    borderColor: "border-violet-400/20",
    benefits: [
      "Diagnostic rapide lors de vos prospections",
      "Argument de confiance pour decrocher des mandats",
      "Photo + rapport en 30 secondes depuis le terrain",
      "Differenciation face aux reseaux concurrents",
    ],
    cta: "Tester pour mes mandats",
  },
  {
    icon: Scale,
    title: "Notaires",
    subtitle: "Securisez vos actes",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
    benefits: [
      "Piece complementaire pour le dossier de vente",
      "Anticipez les litiges post-vente lies a la toiture",
      "Information objective a transmettre aux parties",
      "Renforcez le devoir de conseil aupres de vos clients",
    ],
    cta: "Decouvrir pour mon etude",
  },
]

export function ImmobilierSection() {
  function scrollToDiagnostic() {
    const el = document.getElementById("diagnostic")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="immobilier" className="relative py-16 sm:py-28">
      {/* Background subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Building2 size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">Transaction immobiliere</span>
          </div>

          <h2
            className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Vous achetez, vendez ou accompagnez{" "}
            <span className="text-primary">une transaction immobiliere ?</span>
          </h2>

          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {"La toiture represente jusqu'a 30% de la valeur d'un bien. Un diagnostic fiable avant la signature, c'est la garantie d'une transaction sereine pour toutes les parties."}
          </p>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-14">
          {[
            { value: "30%", label: "de la valeur du bien" },
            { value: "19,90 EUR", label: "le diagnostic" },
            { value: "30 sec", label: "pour le resultat" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 bg-card px-3 py-5 sm:px-6 sm:py-6">
              <span
                className="text-lg font-bold text-primary sm:text-2xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {value}
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* Profile cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => {
            const Icon = profile.icon
            return (
              <div
                key={profile.title}
                className={`group relative flex flex-col overflow-hidden rounded-xl border ${profile.borderColor} bg-card/50 p-5 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg sm:rounded-2xl sm:p-6`}
              >
                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${profile.bgColor}`}>
                    <Icon size={18} className={profile.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{profile.title}</h3>
                    <p className={`text-[11px] font-medium ${profile.color}`}>{profile.subtitle}</p>
                  </div>
                </div>

                {/* Benefits */}
                <ul className="mb-5 flex-1 space-y-2.5">
                  {profile.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <ShieldCheck size={13} className={`mt-0.5 shrink-0 ${profile.color}`} />
                      <span className="text-xs leading-relaxed text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToDiagnostic}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl border ${profile.borderColor} ${profile.bgColor} px-4 py-2.5 text-[12px] font-semibold ${profile.color} transition-all hover:opacity-80`}
                >
                  {profile.cta}
                  <ArrowRight size={13} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center sm:mt-16">
          <div className="mx-auto max-w-xl rounded-xl border border-primary/20 bg-primary/5 p-5 sm:rounded-2xl sm:p-8">
            <FileText size={24} className="mx-auto mb-3 text-primary" />
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              Un rapport PDF professionnel en 30 secondes
            </h3>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              {"Joignable au dossier de vente, au compromis, ou a transmettre a l'acquereur. Analyse IA objective, score de 0 a 100, recommandations detaillees."}
            </p>
            <button
              onClick={scrollToDiagnostic}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              Lancer un diagnostic maintenant
              <ArrowRight size={16} />
            </button>
            <p className="mt-3">
              <Link
                href="/guide/diagnostic-toiture-achat-vente-immobilier"
                className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                Lire notre guide complet : diagnostic toiture et transaction immobiliere
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
