import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { citiesData, getNearbyCities, getCitiesByRegion } from "@/lib/cities-data"
import {
  getWoodProfileFromRainfall,
  isInZone,
  riskColor,
  cityAt,
  COMPANY,
  ZONE_LABEL,
} from "@/lib/wood-treatment"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Cloud,
  Bug,
  Droplets,
  Home,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Hammer,
  Search,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react"

interface PageProps {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return Object.keys(citiesData).map((city) => ({ city }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const cityData = citiesData[city]

  if (!cityData) {
    return { title: "Page non trouvee" }
  }

  const inZone = isInZone(cityData.departmentCode)
  const profile = getWoodProfileFromRainfall(cityData.climate.annualRainfall, cityData.climate.frostDays)
  const at = cityAt(cityData.name)

  const title = `Traitement du bois & charpente ${at} (${cityData.departmentCode}) | Mérule, insectes | ACO-HABITAT`
  const description = inZone
    ? `ACO-HABITAT, expert du traitement du bois depuis 2006, intervient ${at} : traitement curatif et préventif contre insectes xylophages, mérule et champignons lignivores. Diagnostic gratuit et devis sans engagement.`
    : `Traitement de charpente et du bois ${at} : insectes xylophages, mérule et champignons lignivores. ${profile.meruleLabel}. Diagnostic gratuit, mise en relation avec un expert qualifié.`

  return {
    title,
    description,
    keywords: [
      `traitement bois ${cityData.name}`,
      `traitement charpente ${cityData.name}`,
      `traitement mérule ${cityData.name}`,
      `capricorne vrillette ${cityData.name}`,
      `champignons lignivores ${cityData.name}`,
      `traitement bois ${cityData.department}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      url: `https://aco-habitat.fr/diagnostic-toiture/${city}`,
      siteName: "ACO-HABITAT Traitement du Bois",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://aco-habitat.fr/diagnostic-toiture/${city}` },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params
  const cityData = citiesData[city]

  if (!cityData) {
    notFound()
  }

  const inZone = isInZone(cityData.departmentCode)
  const profile = getWoodProfileFromRainfall(cityData.climate.annualRainfall, cityData.climate.frostDays)
  const accent = riskColor(profile.meruleRisk)
  const at = cityAt(cityData.name)

  const nearbyCities = getNearbyCities(city, 6)
  const regionCities = getCitiesByRegion(cityData.region)
    .filter((c) => c.slug !== city)
    .slice(0, 8)

  const treatments = [
    {
      icon: Bug,
      title: "Insectes xylophages",
      desc: "Capricornes, vrillettes et lyctus : bûchage, injection sous pression et pulvérisation des bois infestés.",
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
      desc: "Protection longue durée des charpentes saines contre insectes et champignons lignivores.",
      color: "#c8912f",
    },
  ]

  const faq = [
    {
      q: `Quels bois sont menacés ${at} ?`,
      a: `${at.charAt(0).toUpperCase() + at.slice(1)}, les charpentes et planchers sont surtout exposés à : ${profile.dominantPests.join(", ")}. ${profile.climateContext}`,
    },
    {
      q: `Le diagnostic de charpente est-il gratuit ${at} ?`,
      a: `Oui. ACO-HABITAT propose un diagnostic gratuit et un devis sans engagement pour le traitement du bois et de la charpente ${at}.`,
    },
    {
      q: `Comment se déroule un traitement du bois ${at} ?`,
      a: `Après inspection des bois, nous procédons au bûchage des parties attaquées, à l'injection et à la pulvérisation d'un produit certifié, curatif et préventif. ${profile.recommendation}`,
    },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://aco-habitat.fr/diagnostic-toiture/${cityData.slug}#business`,
        name: `ACO-HABITAT Traitement du Bois ${cityData.name}`,
        description: `Traitement curatif et préventif des bois (insectes xylophages, mérule, champignons lignivores) ${at}.`,
        url: `https://aco-habitat.fr/diagnostic-toiture/${cityData.slug}`,
        telephone: COMPANY.phoneHref,
        email: COMPANY.email,
        priceRange: "$$",
        foundingDate: "2006",
        address: {
          "@type": "PostalAddress",
          addressLocality: cityData.name,
          addressRegion: cityData.region,
          addressCountry: "FR",
        },
        areaServed: { "@type": "City", name: cityData.name },
      },
      {
        "@type": "Service",
        name: `Traitement du bois et de la charpente ${at}`,
        description: profile.climateContext,
        areaServed: { "@type": "City", name: cityData.name },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          description: "Diagnostic gratuit et devis sans engagement",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://aco-habitat.fr" },
          {
            "@type": "ListItem",
            position: 2,
            name: cityData.region,
            item: `https://aco-habitat.fr/diagnostic-toiture/region/${cityData.regionSlug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cityData.name,
            item: `https://aco-habitat.fr/diagnostic-toiture/${cityData.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="border-b border-border bg-secondary/40" aria-label="Breadcrumb">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Accueil
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <Link
                  href={`/diagnostic-toiture/region/${cityData.regionSlug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {cityData.region}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <span className="font-medium text-foreground">{cityData.name}</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {cityData.department} ({cityData.departmentCode})
                  </Badge>
                  {inZone && <Badge variant="secondary">Intervention directe</Badge>}
                </div>

                <h1
                  className="mb-4 text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Traitement du bois & charpente {at}
                </h1>

                <p className="mb-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {inZone ? (
                    <>
                      ACO-HABITAT, expert depuis {COMPANY.since}, traite {at} les insectes xylophages, la mérule et
                      les champignons lignivores. Diagnostic gratuit et traitement garanti.
                    </>
                  ) : (
                    <>
                      Insectes xylophages, mérule, champignons lignivores : obtenez un diagnostic gratuit pour le
                      traitement de votre charpente {at}. Nous vous mettons en relation avec un expert qualifié.
                    </>
                  )}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/#devis">
                      Diagnostic gratuit
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  {inZone && (
                    <Button asChild variant="outline" size="lg" className="gap-2">
                      <a href={`tel:${COMPANY.phoneHref}`}>
                        <Phone className="h-4 w-4" />
                        {COMPANY.phone}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Risk card */}
              <Card className="w-full lg:w-80">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Cloud className="h-4 w-4" style={{ color: accent }} />
                    Risque bois {at}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Pluviométrie</span>
                    <span className="font-medium">{cityData.climate.annualRainfall} mm/an</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Jours de pluie</span>
                    <span className="font-medium">{cityData.climate.rainyDays} j/an</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mérule</span>
                    <span className="font-semibold" style={{ color: accent }}>
                      {profile.meruleLabel}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Context + pests */}
        <section className="border-b border-border py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              className="mb-6 text-2xl font-semibold text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pourquoi les bois sont exposés {at}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Cloud className="h-5 w-5" style={{ color: accent }} />
                    Contexte local
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
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Bug className="h-5 w-5" style={{ color: accent }} />
                    Agresseurs fréquents {at}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {profile.dominantPests.map((pest) => (
                      <li key={pest} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" style={{ color: accent }} />
                        <span>{pest}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Seule une inspection sur place confirme l&apos;agresseur et l&apos;étendue des dégâts : c&apos;est
                    l&apos;objet de notre diagnostic gratuit.
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
              Nos traitements {at}
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
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {inZone ? <Hammer size={22} className="text-primary" /> : <Search size={22} className="text-primary" />}
            </div>
            <h2
              className="text-2xl font-semibold text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {inZone ? `Nous intervenons directement ${at}` : `Un expert pour votre charpente ${at}`}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {inZone
                ? `Basés à ${COMPANY.addressCity}, nous couvrons ${ZONE_LABEL}. Inspection sur place, traitement certifié et garantie sur nos interventions.`
                : `Décrivez votre situation : nous étudions votre demande et vous mettons en relation avec un professionnel qualifié du traitement du bois près de chez vous. Diagnostic gratuit et sans engagement.`}
            </p>
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

        {/* FAQ */}
        <section className="border-b border-border py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2
              className="mb-8 text-center text-2xl font-semibold text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Questions fréquentes {at}
            </h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <Card key={item.q}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact (in-zone only) */}
        {inZone && (
          <section className="border-b border-border py-10">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
              <h2 className="mb-2 text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                ACO-HABITAT — Expert traitement du bois depuis {COMPANY.since}
              </h2>
              <p className="mb-6 text-muted-foreground">Une question sur votre charpente {at} ? Contactez-nous.</p>
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
          </section>
        )}

        {/* Nearby cities */}
        {(nearbyCities.length > 0 || regionCities.length > 0) && (
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2
                className="mb-8 text-2xl font-semibold text-foreground sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Traitement du bois autour de {cityData.name}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {(nearbyCities.length > 0 ? nearbyCities : regionCities).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/diagnostic-toiture/${c.slug}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      <span className="font-medium text-foreground group-hover:text-primary">{c.name}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
