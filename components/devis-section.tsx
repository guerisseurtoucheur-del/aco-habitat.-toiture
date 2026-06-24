"use client"

import { useState } from "react"
import { Phone, Mail, CheckCircle2, Loader2 } from "lucide-react"

const services = [
  { value: "insectes", label: "Insectes xylophages (capricorne, vrillette...)" },
  { value: "merule", label: "Mérule / champignons" },
  { value: "preventif", label: "Traitement préventif" },
  { value: "charpente", label: "Charpente / structure bois" },
  { value: "autre", label: "Je ne sais pas / autre" },
]

export function DevisSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "")
    const phone = String(data.get("phone") || "")
    const email = String(data.get("email") || "")
    const service = String(data.get("service") || "")
    const postal = String(data.get("postal") || "")
    const details = String(data.get("message") || "")
    const message = `Code postal : ${postal}\n\n${details}`

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, service, message }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || "Erreur lors de l'envoi.")
      }
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Erreur lors de l'envoi.")
    }
  }

  return (
    <section id="devis" className="border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
              Demande de devis
            </span>
            <h2
              className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Recevez votre devis gratuit
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              Décrivez votre problème de charpente ou de bois. Nous vous recontactons rapidement
              pour organiser une inspection et établir un devis clair, gratuit et sans engagement.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:+33233311979"
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone size={18} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Appelez-nous</span>
                  <span className="text-base font-semibold text-foreground">02 33 31 19 79</span>
                </div>
              </a>
              <a
                href="mailto:aco.habitat@orange.fr"
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Mail size={18} className="text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Écrivez-nous</span>
                  <span className="text-base font-semibold text-foreground">aco.habitat@orange.fr</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 size={48} className="text-accent" />
                <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Demande envoyée !
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Merci. Nous avons bien reçu votre demande et vous recontactons au plus vite.
                  Pour une urgence, appelez le 02 33 31 19 79.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Nom complet" name="name" type="text" placeholder="Jean Dupont" required />
                  <Field label="Téléphone" name="phone" type="tel" placeholder="06 12 34 56 78" required />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" placeholder="jean@email.fr" required />
                  <Field label="Code postal" name="postal" type="text" placeholder="61000" required />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-sm font-medium text-foreground">
                    Type de problème
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="" disabled>
                      Sélectionnez...
                    </option>
                    {services.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Décrivez votre situation
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Ex : j'ai vu un champignon orange sur une poutre de mon grenier..."
                    className="resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Gratuit et sans engagement. Réponse sous 48h.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  )
}
