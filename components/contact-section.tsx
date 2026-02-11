"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle, Loader2 } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    label: "Telephone",
    value: "06 XX XX XX XX",
    href: "tel:+33600000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "aco.habitat@orange.fr",
    href: "mailto:aco.habitat@orange.fr",
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: "Ile-de-France",
    href: null,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun - Sam : 8h - 19h",
    href: null,
  },
]

type FormStatus = "idle" | "sending" | "success" | "error"

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi.")
      }

      setStatus("success")
      setFormData({ name: "", phone: "", email: "", service: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Une erreur est survenue."
      )
    }
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-glow-blue),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide">
              Contact
            </span>
            <h2
              className="mt-4 max-w-md text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Parlons de votre projet
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
              Vous avez un doute sur l{"'"}etat de votre toiture ? Contactez-nous
              pour un diagnostic gratuit ou un devis personnalise. Reponse sous 24h.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactInfo.map((info) => {
                const Wrapper = info.href ? "a" : "div"
                const wrapperProps = info.href ? { href: info.href } : {}
                return (
                  <Wrapper
                    key={info.label}
                    {...wrapperProps}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:border-border/80 hover:bg-card/60"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <info.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-semibold text-foreground">{info.value}</p>
                    </div>
                  </Wrapper>
                )
              })}
            </div>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Demande envoyee !
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Merci pour votre message. Nous reviendrons vers vous sous 24h
                avec un devis personnalise.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card/50 p-8"
            >
              <h3
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Demande de devis gratuit
              </h3>

              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Telephone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 XX XX XX XX"
                    className="rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean@exemple.fr"
                  className="rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-sm font-medium text-foreground">
                  Type de service
                </label>
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                >
                  <option value="" disabled>Selectionnez un service</option>
                  <option value="diagnostic">Diagnostic IA</option>
                  <option value="reparation">Reparation de toiture</option>
                  <option value="renovation">Renovation complete</option>
                  <option value="isolation">Isolation thermique</option>
                  <option value="demoussage">Demoussage et traitement</option>
                  <option value="charpente">Charpente</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Votre message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Decrivez votre besoin ou la problematique observee..."
                  className="resize-none rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Reponse garantie sous 24h. Devis 100% gratuit et sans engagement.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
