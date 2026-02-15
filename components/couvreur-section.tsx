"use client"

import { useState } from "react"
import { Search, MapPin, ExternalLink, Shield } from "lucide-react"

export function CouvreurSection() {
  const [city, setCity] = useState("")
  const [searchQuery, setSearchQuery] = useState("couvreur+toiture+France")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      setSearchQuery(`couvreur+toiture+${encodeURIComponent(city.trim())}`)
    }
  }

  const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${searchQuery}&zoom=11`
  const mapsExternalUrl = `https://www.google.com/maps/search/couvreur+toiture+${encodeURIComponent(city || "France")}`

  return (
    <section id="couvreurs" className="relative bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Search size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">TROUVER UN COUVREUR</span>
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Couvreurs pres de chez vous
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Recherchez un couvreur professionnel dans votre ville et transmettez-lui
            votre rapport PDF pour obtenir un devis adapte.
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Entrez votre ville ou code postal..."
              className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Search size={14} />
            Rechercher
          </button>
        </form>

        {/* Google Maps embed */}
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <iframe
              title="Couvreurs pres de chez vous - Google Maps"
              src={mapsEmbedUrl}
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full sm:h-[480px]"
            />
          </div>

          {/* Open in Google Maps link */}
          <div className="mt-4 text-center">
            <a
              href={mapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink size={14} />
              Ouvrir dans Google Maps
            </a>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Lien externe - ACO-HABITAT n{"'"}est pas responsable des prestations des couvreurs listes par Google.
            </p>
          </div>
        </div>

        {/* How to use with your report */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Comment utiliser votre rapport ?
            </h3>
            <ol className="mt-3 space-y-2">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">1</span>
                Telechargez votre rapport PDF depuis la page de resultats.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">2</span>
                Trouvez un couvreur via la carte ci-dessus ou sur Google Maps.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">3</span>
                Envoyez-lui votre rapport PDF par email. Il contient toutes les infos necessaires pour un devis.
              </li>
            </ol>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <Shield size={16} className="mt-0.5 shrink-0 text-amber-500/60" />
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Clause de non-responsabilite :</strong> Les resultats affiches proviennent
              de Google Maps et sont fournis par Google LLC. ACO-HABITAT ne selectionne pas, ne recommande pas et n{"'"}est pas
              affiliee aux couvreurs listes. Le choix du prestataire et l{"'"}execution du chantier relevent de la seule
              responsabilite du client. L{"'"}analyse de toiture fournie par ACO-HABITAT est une aide a la decision basee sur
              l{"'"}IA et ne remplace pas une inspection physique par un professionnel qualifie.{" "}
              <a href="/mentions-legales" className="font-medium text-foreground underline hover:text-primary">
                Voir les CGU completes
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
