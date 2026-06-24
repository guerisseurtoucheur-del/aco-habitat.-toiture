import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import {
  MapPin,
  Phone,
  ArrowRight,
  Shield,
  Droplets,
  Bug,
  ShieldCheck,
  Search,
  CheckCircle2,
  ChevronRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { departments, getDepartmentBySlug, getAllDepartmentSlugs } from "@/lib/departments"
import { getWoodProfile, climateFromText, isInZone, riskColor, COMPANY, deptLabels } from "@/lib/wood-treatment"

// -- Static generation for all 101 departments --
export async function generateStaticParams() {
  return getAllDepartmentSlugs().map((slug) => ({ slug }))
}

// -- Dynamic metadata per department --
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const dept = getDepartmentBySlug(slug)
  if (!dept) return {}

  const inZone = isInZone(dept.code)
  const profile = getWoodProfile(climateFromText(dept.climat))
  const L = deptLabels(dept.nom)

  const title = `Traitement du bois & charpente ${dept.nom} (${dept.code}) | Mérule, insectes | ACO-HABITAT`
  const description = inZone
    ? `ACO-HABITAT, expert du traitement du bois depuis ${COMPANY.since}, intervient ${L.dans} (${dept.code}) : insectes xylophages, mérule et champignons lignivores. Diagnostic gratuit et devis sans engagement.`
    : `Traitement de charpente et du bois ${L.dans} (${dept.code}) : capricorne, vrillette, lyctus, mérule. ${profile.meruleLabel}. Diagnostic gratuit, mise en relation avec un expert.`

  return {
    title,
    description,
    alternates: { canonical: `/couvreur/${dept.slug}` },
    openGraph: {
      title,
      description,
      url: `https://diag.aco-habitat.fr/couvreur/${dept.slug}`,
      type: "website",
      locale: "fr_FR",
      siteName: "ACO-HABITAT Traitement du Bois",
    },
  }
}

// -- Services traitement du bois --
const services = [
  {
    icon: Bug,
    title: "Insectes xylophages",
    description: "Capricornes, vrillettes et lyctus : bûchage, injection sous pression et pulvérisation des bois infestés.",
    color: "#b04a25",
  },
  {
    icon: Droplets,
    title: "Mérule & champignons",
    description: "Recherche des causes d'humidité, assainissement et traitement fongicide en profondeur de la charpente.",
    color: "#3c5a4a",
  },
  {
    icon: ShieldCheck,
    title: "Traitement préventif",
    description: "Protection longue durée des charpentes saines contre insectes et champignons lignivores.",
    color: "#c8912f",
  },
  {
    icon: Search,
    title: "Diagnostic charpente",
    description: "Inspection complète des bois de structure : sondage, repérage des attaques et préconisations.",
    color: "#3b6ea5",
  },
  {
    icon: Shield,
    title: "Charpente & structure",
    description: "Renforcement et remplacement des pièces de bois dégradées par les insectes ou les champignons.",
    color: "#8a6d3b",
  },
  {
    icon: CheckCircle2,
    title: "Devis & garantie",
    description: "Devis gratuit, produits certifiés et traitements garantis pour pérenniser votre bâti.",
    color: "#3c5a4a",
  },
]

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dept = getDepartmentBySlug(slug)
  if (!dept) notFound()

  const inZone = isInZone(dept.code)
  const profile = getWoodProfile(climateFromText(dept.climat))
  const accent = riskColor(profile.meruleRisk)
  const L = deptLabels(dept.nom)

  // Nearby departments for internal linking
  const currentIndex = departments.findIndex((d) => d.slug === slug)
  const nearby = departments
    .filter((_, i) => i !== currentIndex)
    .slice(Math.max(0, currentIndex - 3), currentIndex + 4)
    .slice(0, 6)

  return (
    <>
      <Navbar />
      <main>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GeneralContractor",
              name: `ACO-HABITAT - Traitement du bois ${dept.nom}`,
              description: `Expert du traitement du bois et de la charpente ${L.dans}. Insectes xylophages, mérule, champignons lignivores.`,
              url: `https://diag.aco-habitat.fr/couvreur/${dept.slug}`,
              telephone: COMPANY.phoneHref,
              email: COMPANY.email,
              areaServed: { "@type": "AdministrativeArea", name: dept.nom },
              address: { "@type": "PostalAddress", addressRegion: dept.region, addressCountry: "FR" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services traitement du bois",
                itemListElement: services.map((s) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: s.title, description: s.description },
                })),
              },
            }),
          }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-secondary pb-16 pt-28">
          <div className="relative mx-auto max-w-5xl px-4 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <MapPin size={12} />
              {dept.region} - Département {dept.code}
            </div>
            <h1 className="mb-4 text-balance font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Traitement du bois & charpente {L.dans}
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {inZone ? (
                <>
                  ACO-HABITAT, expert depuis {COMPANY.since}, intervient {L.dans} contre les insectes xylophages, la
                  mérule et les champignons lignivores. Diagnostic gratuit et traitement garanti.
                </>
              ) : (
                <>
                  Insectes xylophages, mérule, champignons lignivores : obtenez un diagnostic gratuit pour le
                  traitement de votre charpente {L.dans}. Nous vous mettons en relation avec un expert qualifié.
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#devis"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Diagnostic gratuit
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {inZone && (
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-secondary"
                >
                  <Phone size={16} />
                  {COMPANY.phone}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Contexte local */}
        <section className="border-b border-border bg-background py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}1a` }}>
                  <Droplets size={20} style={{ color: accent }} />
                </div>
                <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">Contexte local</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.climateContext}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${accent}1a`, color: accent }}>
                  {profile.meruleLabel}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                  <Bug size={20} className="text-foreground" />
                </div>
                <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">Agresseurs fréquents {L.dans}</h2>
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

        {/* Services */}
        <section className="border-b border-border bg-secondary py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-center font-heading text-3xl font-bold text-foreground">Nos services {L.dans}</h2>
            <p className="mx-auto mb-10 max-w-xl text-center text-sm text-muted-foreground">
              Traitement curatif et préventif des bois de charpente, adapté au climat {dept.climat} de votre
              département.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
                  style={{ borderTop: `3px solid ${service.color}` }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${service.color}15` }}>
                    <service.icon size={20} style={{ color: service.color }} />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Villes d'intervention */}
        <section className="border-b border-border bg-background py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-center font-heading text-2xl font-bold text-foreground">
              Nos zones d{"'"}intervention {L.dans}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">
              Nous traitons charpentes et planchers dans tout le département {dept.code} - {dept.nom}, y compris :
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {dept.villesPrincipales.map((ville) => (
                <div key={ville} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground">
                  <MapPin size={12} style={{ color: accent }} />
                  {ville}
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-card/50 px-4 py-2.5 text-sm text-muted-foreground">
                + toutes les communes du {dept.code}
              </div>
            </div>
          </div>
        </section>

        {/* Departements proches (maillage interne) */}
        <section className="border-b border-border bg-secondary py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground">Départements proches</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((d) => (
                <Link
                  key={d.slug}
                  href={`/couvreur/${d.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:bg-secondary"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-foreground">
                    {d.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">Traitement bois {d.nom}</p>
                    <p className="truncate text-xs text-muted-foreground">{d.region}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="rounded-2xl border border-border bg-secondary p-10">
              <Shield size={32} className="mx-auto mb-4" style={{ color: accent }} />
              <h2 className="mb-3 font-heading text-2xl font-bold text-foreground">
                {inZone ? <>Votre charpente {L.dans} mérite un expert</> : <>Un expert pour votre charpente {L.dans}</>}
              </h2>
              <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {inZone
                  ? "Décrivez votre situation : nous organisons un diagnostic gratuit et établissons un devis clair, sans engagement."
                  : "Décrivez votre situation : nous vous mettons en relation avec un professionnel qualifié du traitement du bois près de chez vous. Diagnostic gratuit et sans engagement."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#devis"
                  className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Demander mon diagnostic gratuit
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                {inZone && (
                  <a
                    href={`tel:${COMPANY.phoneHref}`}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-secondary"
                  >
                    <Phone size={16} />
                    {COMPANY.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
