import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { departmentsData, getDepartmentBySlug, getDepartmentsByRegion } from "@/lib/departments-data"
import { getWoodProfile, isInZone, riskColor, COMPANY, ZONE_LABEL, deptLabels } from "@/lib/wood-treatment"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  MapPin,
  Cloud,
  Bug,
  Droplets,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Hammer,
  Search,
} from "lucide-react"

export async function generateStaticParams() {
  return Object.values(departmentsData).map((dept) => ({
    dept: dept.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dept: string }>
}): Promise<Metadata> {
  const { dept } = await params
  const deptData = getDepartmentBySlug(dept)

  if (!deptData) {
    return { title: "Departement non trouve" }
  }

  const inZone = isInZone(deptData.code)
  const profile = getWoodProfile(deptData.climate, deptData.averageRoofAge)
  const L = deptLabels(deptData.name)

  const title = `Traitement du bois & charpente ${deptData.name} (${deptData.code}) | Mérule, insectes | ACO-HABITAT`
  const description = inZone
    ? `ACO-HABITAT, expert du traitement du bois depuis 2006, intervient ${L.dans} (${deptData.code}) : traitement curatif et préventif contre les insectes xylophages, la mérule et les champignons lignivores. Diagnostic gratuit et devis sans engagement.`
    : `Traitement de charpente et du bois ${L.dans} (${deptData.code}) : insectes xylophages (capricorne, vrillette, lyctus), mérule et champignons lignivores. ${profile.meruleLabel}. Diagnostic gratuit, mise en relation avec un expert.`

  return {
    title,
    description,
    keywords: [
      `traitement bois ${deptData.name}`,
      `traitement charpente ${deptData.name}`,
      `traitement mérule ${deptData.name}`,
      `traitement mérule ${deptData.code}`,
      `capricorne vrillette ${deptData.name}`,
      `traitement charpente ${deptData.prefecture}`,
      `champignons lignivores ${deptData.name}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      siteName: "ACO-HABITAT Traitement du Bois",
    },
    alternates: {
      canonical: `https://aco-habitat.fr/diagnostic-toiture/departement/${deptData.slug}`,
    },
  }
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ dept: string }>
}) {
  const { dept } = await params
  const deptData = getDepartmentBySlug(dept)

  if (!deptData) {
    notFound()
  }

  const inZone = isInZone(deptData.code)
  const profile = getWoodProfile(deptData.climate, deptData.averageRoofAge)
  const accent = riskColor(profile.meruleRisk)
  const L = deptLabels(deptData.name)

  const sameRegionDepts = getDepartmentsByRegion(deptData.region)
    .filter((d) => d.slug !== deptData.slug)
    .slice(0, 6)

  const treatments = [
    {
      icon: Bug,
      title: "Insectes xylophages",
      desc: "Capricornes, vrillettes et lyctus : traitement curatif par bûchage, injection et pulvérisation.",
      color: "#b04a25",
    },
    {
      icon: Droplets,
      title: "Mérule & champignons",
      desc: "Recherche des causes d'humidité, assainissement et traitement fongicide en profondeur.",
      color: "#3c5a4a",
    },
    {
      icon: ShieldCheck,
      title: "Traitement préventif",
      desc: "Protection longue durée des charpentes saines contre insectes et champignons.",
      color: "#c8912f",
    },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Traitement du bois et de la charpente ${L.dans}`,
        description: `Traitement curatif et préventif des bois (insectes xylophages, mérule, champignons lignivores) ${L.dans} (${deptData.code}).`,
        provider: {
          "@type": "Organization",
          name: "ACO-HABITAT",
          telephone: COMPANY.phoneHref,
          email: COMPANY.email,
          foundingDate: "2006",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: deptData.name,
          containedIn: deptData.region,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          description: "Diagnostic gratuit et devis sans engagement",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Quels insectes et champignons attaquent les charpentes ${L.dans} ?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${L.dans.charAt(0).toUpperCase() + L.dans.slice(1)}, les bois sont surtout exposés à : ${profile.dominantPests.join(", ")}. ${profile.climateContext}`,
            },
          },
          {
            "@type": "Question",
            name: `Le diagnostic de charpente est-il payant ${L.dans} ?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Non. ACO-HABITAT propose un diagnostic gratuit et un devis sans engagement pour le traitement du bois et de la charpente ${L.dans}.`,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-foreground">{deptData.name}</span>
            </nav>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <Badge variant="outline" className="mb-4 gap-2">
                  <MapPin size={12} />
                  {inZone ? `Intervention directe — ${deptData.code}` : `${deptData.name} (${deptData.code})`}
                </Badge>
                <h1
                  className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Traitement du bois & charpente {L.dans}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {inZone ? (
                    <>
                      ACO-HABITAT, expert depuis {COMPANY.since}, intervient {L.dans} contre les insectes
                      xylophages, la mérule et les champignons lignivores. Diagnostic gratuit et traitement
                      garanti.
                    </>
                  ) : (
                    <>
                      Insectes xylophages, mérule, champignons lignivores : obtenez un diagnostic gratuit pour le
                      traitement de votre charpente {L.dans}. Nous vous mettons en relation avec un expert
                      qualifié.
                    </>
                  )}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/#devis">
                      Diagnostic gratuit
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  {inZone && (
                    <Button asChild variant="outline" size="lg" className="gap-2">
                      <a href={`tel:${COMPANY.phoneHref}`}>
                        <Phone size={16} />
                        {COMPANY.phone}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Stats card */}
              <Card className="w-full lg:w-80">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 size={18} style={{ color: accent }} />
                    {deptData.name} en bref
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">Préfecture</span>
                    <span className="font-medium">{deptData.prefecture}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">Âge moyen du bâti</span>
                    <span className="font-medium">{deptData.averageRoofAge} ans</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">Climat</span>
                    <Badge variant="secondary" className="capitalize">
                      {deptData.climate}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mérule</span>
                    <span className="font-semibold" style={{ color: accent }}>
                      {profile.meruleLabel}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Climate context + pests */}
        <section className="border-b border-border py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud size={20} style={{ color: accent }} />
                    Climat {deptData.climate} & risque pour le bois
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">{profile.climateContext}</p>
                  <p className="mt-4 rounded-lg bg-secondary/60 p-4 text-sm text-secondary-foreground">
                    {profile.recommendation}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug size={20} style={{ color: accent }} />
                    Agresseurs fréquents {L.dans}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {profile.dominantPests.map((pest) => (
                      <li key={pest} className="flex items-center gap-2">
                        <CheckCircle2 size={16} style={{ color: accent }} />
                        <span>{pest}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Seule une inspection sur place permet de confirmer l&apos;agresseur et l&apos;étendue des
                    dégâts. C&apos;est l&apos;objet de notre diagnostic gratuit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Treatments */}
        <section className="border-b border-border py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              className="mb-8 text-2xl font-semibold text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nos traitements {L.dans}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {treatments.map((t) => (
                <Card key={t.title} className="transition-all hover:-translate-y-1 hover:shadow-lg" style={{ borderTop: `3px solid ${t.color}` }}>
                  <CardContent className="flex flex-col gap-3 p-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${t.color}1a` }}
                    >
                      <t.icon size={22} style={{ color: t.color }} />
                    </div>
                    <h3 className="font-semibold text-foreground">{t.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Zone-aware band */}
        <section className="border-b border-border bg-secondary/40 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            {inZone ? (
              <>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Hammer size={22} className="text-primary" />
                </div>
                <h2
                  className="text-2xl font-semibold text-foreground sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Nous intervenons directement {L.dans}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  Basés à {COMPANY.addressCity}, nous couvrons {ZONE_LABEL}. Inspection sur place, traitement
                  certifié et garantie sur nos interventions.
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Search size={22} className="text-primary" />
                </div>
                <h2
                  className="text-2xl font-semibold text-foreground sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Un expert pour votre charpente {L.dans}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  Décrivez votre situation : nous étudions votre demande et vous mettons en relation avec un
                  professionnel qualifié du traitement du bois près de chez vous. Diagnostic gratuit et sans
                  engagement.
                </p>
              </>
            )}
            <div className="mt-7">
              <Button asChild size="lg" className="gap-2 px-8">
                <Link href="/#devis">
                  Demander mon diagnostic gratuit
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact (in-zone only) */}
        {inZone && (
          <section className="border-b border-border py-10">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <div className="text-center">
                <h2 className="mb-2 text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  ACO-HABITAT — Expert traitement du bois depuis {COMPANY.since}
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Une question sur votre charpente {L.dans} ? Contactez-nous directement.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                  <a
                    href={`tel:${COMPANY.phoneHref}`}
                    className="flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
                  >
                    <Phone className="h-5 w-5" />
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
                  >
                    <Mail className="h-5 w-5" />
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other departments */}
        {sameRegionDepts.length > 0 && (
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2
                className="mb-8 text-2xl font-semibold text-foreground sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Autres départements en {deptData.region}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sameRegionDepts.map((d) => (
                  <Link
                    key={d.code}
                    href={`/diagnostic-toiture/departement/${d.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <Badge variant="outline">{d.code}</Badge>
                    <span className="font-medium text-foreground group-hover:text-primary">{d.name}</span>
                    <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
