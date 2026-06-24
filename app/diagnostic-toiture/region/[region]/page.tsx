import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRegionBySlug, getAllRegions } from "@/lib/regions-data"
import { getCitiesByRegion } from "@/lib/cities-data"
import {
  getWoodProfile,
  climateFromText,
  isInZone,
  riskColor,
  COMPANY,
} from "@/lib/wood-treatment"
import { Bug, Droplets, ShieldCheck, Phone, ArrowRight, MapPin, Search, CheckCircle2 } from "lucide-react"

export const dynamicParams = true

export async function generateStaticParams() {
  return getAllRegions().map((region) => ({ region: region.slug }))
}

// Extrait les codes departements d'une entree region ("Mayenne (53)" -> "53")
function extractCodes(departments: string[]): string[] {
  return departments
    .map((d) => {
      const m = d.match(/\((\w{2,3})\)/)
      return m ? m[1] : ""
    })
    .filter(Boolean)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>
}): Promise<Metadata> {
  const { region: regionSlug } = await params
  const region = getRegionBySlug(regionSlug)
  if (!region) return { title: "Région non trouvée" }

  const inZone = extractCodes(region.departments).some((c) => isInZone(c))
  const profile = getWoodProfile(climateFromText(region.climate))

  const title = `Traitement du bois & charpente en ${region.name} | Mérule, insectes | ACO-HABITAT`
  const description = inZone
    ? `ACO-HABITAT, expert du traitement du bois depuis ${COMPANY.since}, intervient en ${region.name} : traitement curatif et préventif contre les insectes xylophages, la mérule et les champignons lignivores. Diagnostic gratuit.`
    : `Traitement de charpente et du bois en ${region.name} : insectes xylophages, mérule et champignons lignivores. ${profile.meruleLabel}. Diagnostic gratuit, mise en relation avec un expert.`

  return {
    title,
    description,
    alternates: { canonical: `/diagnostic-toiture/region/${region.slug}` },
    openGraph: { title, description, type: "website", locale: "fr_FR" },
  }
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>
}) {
  const { region: regionSlug } = await params
  const region = getRegionBySlug(regionSlug)
  if (!region) notFound()

  const inZone = extractCodes(region.departments).some((c) => isInZone(c))
  const profile = getWoodProfile(climateFromText(region.climate))
  const accent = riskColor(profile.meruleRisk)
  const cities = getCitiesByRegion(region.name).slice(0, 12)

  const treatments = [
    {
      icon: Bug,
      title: "Insectes xylophages",
      text: "Capricornes, vrillettes et lyctus : bûchage, injection sous pression et pulvérisation des bois infestés.",
      color: "#b04a25",
    },
    {
      icon: Droplets,
      title: "Mérule & champignons",
      text: "Recherche des causes d'humidité, assainissement et traitement fongicide en profondeur.",
      color: "#3c5a4a",
    },
    {
      icon: ShieldCheck,
      title: "Traitement préventif",
      text: "Protection longue durée des charpentes saines contre insectes et champignons lignivores.",
      color: "#c8912f",
    },
  ]

  const faq = [
    {
      q: `Quels bois sont menacés en ${region.name} ?`,
      a: `En ${region.name}, les charpentes et planchers sont surtout exposés à : ${profile.dominantPests.join(", ")}. ${profile.climateContext}`,
    },
    {
      q: `Le diagnostic de charpente est-il gratuit en ${region.name} ?`,
      a: `Oui. ACO-HABITAT propose un diagnostic gratuit et un devis sans engagement pour le traitement du bois et de la charpente en ${region.name}.`,
    },
    {
      q: `Comment se déroule un traitement du bois ?`,
      a: `Après inspection des bois, nous procédons au bûchage des parties attaquées, à l'injection et à la pulvérisation d'un produit certifié, curatif et préventif. ${profile.recommendation}`,
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Traitement du bois et de la charpente",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.name,
      telephone: COMPANY.phone,
      email: COMPANY.email,
    },
    areaServed: { "@type": "AdministrativeArea", name: region.name },
    name: `Traitement du bois et de la charpente en ${region.name}`,
    description: `Traitement curatif et préventif des bois (insectes xylophages, mérule, champignons lignivores) en ${region.name}.`,
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <nav aria-label="Fil d'ariane" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">
                Accueil
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-foreground">{region.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                  <MapPin size={13} />
                  {region.name}
                </span>
                <h1
                  className="mt-5 text-pretty text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Traitement du bois & charpente en {region.name}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {inZone ? (
                    <>
                      ACO-HABITAT, expert depuis {COMPANY.since}, intervient en {region.name} contre les insectes
                      xylophages, la mérule et les champignons lignivores. Diagnostic gratuit et traitement garanti.
                    </>
                  ) : (
                    <>
                      Insectes xylophages, mérule, champignons lignivores : obtenez un diagnostic gratuit pour le
                      traitement de votre charpente en {region.name}. Nous vous mettons en relation avec un expert
                      qualifié.
                    </>
                  )}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/#devis"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Diagnostic gratuit
                    <ArrowRight size={16} />
                  </a>
                  {inZone && (
                    <a
                      href={`tel:${COMPANY.phoneHref}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      <Phone size={16} />
                      {COMPANY.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Risk card */}
              <div className="rounded-2xl border border-border bg-card p-6" style={{ borderTop: `3px solid ${accent}` }}>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Droplets size={16} style={{ color: accent }} />
                  Risque bois en {region.name}
                </h2>
                <dl className="mt-4 flex flex-col gap-3 text-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Climat</dt>
                    <dd className="text-right font-medium text-foreground">{region.climate}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Risque mérule</dt>
                    <dd className="font-semibold" style={{ color: accent }}>
                      {profile.meruleLabel}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Départements</dt>
                    <dd className="font-medium text-foreground">{region.departments.length}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Context */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}1a` }}>
                  <Droplets size={20} style={{ color: accent }} />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Contexte local
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.climateContext}</p>
                <p className="mt-4 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
                  {profile.recommendation}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                  <Bug size={20} className="text-foreground" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Agresseurs fréquents en {region.name}
                </h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {profile.dominantPests.map((pest) => (
                    <li key={pest} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <CheckCircle2 size={16} style={{ color: accent }} />
                      {pest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Treatments */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <h2
              className="text-pretty text-3xl font-semibold text-foreground sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nos traitements en {region.name}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {treatments.map((t) => (
                <article
                  key={t.title}
                  className="rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-lg"
                  style={{ borderTop: `3px solid ${t.color}` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${t.color}1a` }}>
                    <t.icon size={22} style={{ color: t.color }} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Cities */}
        {cities.length > 0 && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
              <h2
                className="text-pretty text-2xl font-semibold text-foreground sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Nos interventions dans les villes de {region.name}
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/diagnostic-toiture/${city.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    <MapPin size={13} className="text-muted-foreground" />
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA band */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-card">
              <Search size={20} style={{ color: accent }} />
            </div>
            <h2
              className="mt-5 text-pretty text-3xl font-semibold text-foreground sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {inZone ? `Un doute sur votre charpente en ${region.name} ?` : `Un expert pour votre charpente en ${region.name}`}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {inZone
                ? "Décrivez votre situation : nous organisons un diagnostic gratuit et établissons un devis clair, sans engagement."
                : "Décrivez votre situation : nous étudions votre demande et vous mettons en relation avec un professionnel qualifié du traitement du bois près de chez vous. Diagnostic gratuit et sans engagement."}
            </p>
            <a
              href="/#devis"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Demander mon diagnostic gratuit
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
            <h2
              className="text-center text-pretty text-3xl font-semibold text-foreground sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Questions fréquentes en {region.name}
            </h2>
            <div className="mt-10 flex flex-col gap-4">
              {faq.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
