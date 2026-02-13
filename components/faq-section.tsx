"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Comment fonctionne le diagnostic IA de toiture ?",
    answer:
      "Notre intelligence artificielle analyse votre photo satellite ou aerienne en superposant trois calques de diagnostic : vegetal (mousse, lichen), structure (tuiles cassees, deplacees) et etancheite (traces d'humidite, infiltrations). Le resultat est disponible en moins de 30 secondes.",
  },
  {
    question: "Quelle photo dois-je utiliser pour le diagnostic ?",
    answer:
      "Vous pouvez utiliser une capture d'ecran de Google Maps en vue satellite, une photo prise par drone, ou toute photo aerienne de votre toiture. Plus l'image est nette et recente, plus le diagnostic sera precis.",
  },
  {
    question: "Le diagnostic en ligne est-il vraiment gratuit ?",
    answer:
      "Oui, le diagnostic IA en ligne est 100% gratuit et sans engagement. Vous recevez instantanement un rapport detaille avec les zones problematiques identifiees et des recommandations d'intervention.",
  },
  {
    question: "Dans quelles zones intervenez-vous ?",
    answer:
      "ACO-HABITAT intervient sur toute la France. Que vous soyez en Ile-de-France, en Normandie, dans le Nord ou partout ailleurs, nous nous deplacons pour diagnostiquer et reparer votre toiture.",
  },
  {
    question: "Combien coute une intervention de reparation ?",
    answer:
      "Le cout depend de la nature et de l'etendue des travaux identifies lors du diagnostic. Nous etablissons un devis gratuit et detaille avant toute intervention. Nos prix sont transparents et competitifs.",
  },
  {
    question: "Quelle est la precision du diagnostic IA ?",
    answer:
      "Notre IA atteint un taux de precision de 98% pour la detection des problemes de vegetation, de structure et d'etancheite. Le diagnostic est ensuite valide par nos experts couvreurs avant toute intervention.",
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
            Questions frequentes sur le diagnostic de toiture
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Tout ce que vous devez savoir sur notre service de diagnostic toiture par intelligence artificielle.
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
