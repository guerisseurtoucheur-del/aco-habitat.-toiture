"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Comment fonctionne le diagnostic IA ?",
    answer:
      "Notre intelligence artificielle analyse votre photo satellite ou aerienne en superposant quatre calques de diagnostic : vegetal (mousse, lichen), structure (tuiles cassees, deplacees), etancheite (traces d'humidite, infiltrations) et thermique (deperditions de chaleur). Le resultat est disponible en moins de 30 secondes.",
  },
  {
    question: "Quelle photo dois-je utiliser ?",
    answer:
      "Vous pouvez utiliser notre carte satellite IGN integree (20cm/pixel), une capture Google Maps en vue satellite, une photo prise par drone, ou une photo prise depuis le sol avec votre smartphone. Plus l'image est nette et recente, plus le diagnostic sera precis.",
  },
  {
    question: "Combien coute un diagnostic ?",
    answer:
      "Un diagnostic complet coute 9,90 EUR. Le paiement est securise par Stripe. Pas d'abonnement, pas de frais caches. Vous payez uniquement quand vous lancez une analyse. Le rapport PDF est genere instantanement.",
  },
  {
    question: "Que contient le rapport PDF ?",
    answer:
      "Le rapport inclut : la photo analysee, les scores detailles par categorie (vegetal, structure, etancheite, thermique), les zones problematiques detectees avec leur localisation, les recommandations d'intervention prioritaires, et une estimation des couts de reparation.",
  },
  {
    question: "Comment trouver un couvreur apres le diagnostic ?",
    answer:
      "Notre annuaire de couvreurs vous permet de trouver un professionnel qualifie pres de chez vous. Vous pouvez lui transmettre directement votre rapport PDF pour obtenir un devis precis adapte aux problemes detectes.",
  },
  {
    question: "Le diagnostic est-il disponible partout en France ?",
    answer:
      "Oui, la couverture satellite IGN couvre l'integralite de la France metropolitaine avec une resolution de 20 cm par pixel. Vous pouvez aussi uploader vos propres photos pour n'importe quelle localisation.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative border-y border-border bg-card/30 py-28"
      aria-label="Questions frequentes sur le diagnostic de toiture par IA"
    >
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide">
            FAQ
          </span>
          <h2
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Questions frequentes
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Tout ce que vous devez savoir sur notre diagnostic toiture par IA.
          </p>
        </div>

        <dl className="mt-14 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all ${
                  isOpen ? "border-primary/30 bg-card/80" : "border-border bg-card/30 hover:bg-card/50"
                }`}
              >
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className={`text-sm font-semibold pr-4 ${isOpen ? "text-foreground" : "text-foreground/80"}`}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </dt>
                {isOpen && (
                  <dd id={`faq-answer-${index}`} className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </dd>
                )}
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
