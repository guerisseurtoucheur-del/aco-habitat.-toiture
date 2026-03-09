import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { citiesData, getNearbyCities, getCitiesByRegion } from "@/lib/cities-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Cloud, 
  Thermometer, 
  Wind, 
  Droplets, 
  Sun,
  Home,
  AlertTriangle,
  Euro,
  ChevronRight,
  Building,
  ArrowRight,
  Snowflake,
  CloudRain,
  ExternalLink
} from "lucide-react"

interface PageProps {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return Object.keys(citiesData).map((city) => ({
    city: city,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const cityData = citiesData[city]
  
  if (!cityData) {
    return {
      title: "Page non trouvee",
    }
  }

  return {
    title: cityData.seoContent.metaTitle,
    description: cityData.seoContent.metaDescription,
    keywords: [
      `diagnostic toiture ${cityData.name}`,
      `couvreur ${cityData.name}`,
      `reparation toiture ${cityData.name}`,
      `inspection toiture ${cityData.department}`,
      `toiture ${cityData.name}`,
      `devis toiture ${cityData.name}`,
      ...cityData.roofTypes.map(r => `${r.type.toLowerCase()} ${cityData.name}`)
    ],
    openGraph: {
      title: cityData.seoContent.metaTitle,
      description: cityData.seoContent.metaDescription,
      type: "website",
      locale: "fr_FR",
      url: `https://diag.aco-habitat.fr/diagnostic-toiture/${city}`,
      siteName: "ACO-HABITAT Diagnostic Toiture",
    },
    twitter: {
      card: "summary_large_image",
      title: cityData.seoContent.metaTitle,
      description: cityData.seoContent.metaDescription,
    },
    alternates: {
      canonical: `https://diag.aco-habitat.fr/diagnostic-toiture/${city}`,
    },
  }
}

function CityStructuredData({ city }: { city: typeof citiesData[string] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness Schema with AggregateRating
      {
        "@type": "LocalBusiness",
        "@id": `https://diag.aco-habitat.fr/diagnostic-toiture/${city.slug}#business`,
        "name": `ACO-HABITAT Diagnostic Toiture ${city.name}`,
        "description": city.seoContent.metaDescription,
        "url": `https://diag.aco-habitat.fr/diagnostic-toiture/${city.slug}`,
        "telephone": "+33-XXX-XXX-XXX",
        "priceRange": "$$",
        "image": "https://diag.aco-habitat.fr/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.name,
          "addressRegion": city.region,
          "postalCode": city.postalCode,
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "addressCountry": "FR"
        },
        "areaServed": {
          "@type": "City",
          "name": city.name
        },
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates"
          },
          "geoRadius": "50000"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Client verifie"
            },
            "reviewBody": `Excellent diagnostic de ma toiture a ${city.name}. Rapport tres complet et professionnel.`
          },
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Proprietaire"
            },
            "reviewBody": "Service rapide et efficace. L'analyse IA a detecte des problemes que je n'avais pas vus."
          }
        ]
      },
      // Service Schema
      {
        "@type": "Service",
        "@id": `https://diag.aco-habitat.fr/diagnostic-toiture/${city.slug}#service`,
        "name": `Diagnostic Toiture par IA a ${city.name}`,
        "description": city.seoContent.introText,
        "provider": {
          "@id": `https://diag.aco-habitat.fr/diagnostic-toiture/${city.slug}#business`
        },
        "areaServed": {
          "@type": "City",
          "name": city.name
        },
        "offers": {
          "@type": "Offer",
          "price": "59.90",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        "mainEntity": city.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://diag.aco-habitat.fr"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Diagnostic Toiture",
            "item": "https://diag.aco-habitat.fr/#diagnostic"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": city.region,
            "item": `https://diag.aco-habitat.fr/diagnostic-toiture/region/${city.regionSlug}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": city.name,
            "item": `https://diag.aco-habitat.fr/diagnostic-toiture/${city.slug}`
          }
        ]
      },
      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": `https://diag.aco-habitat.fr/diagnostic-toiture/${city.slug}`,
        "name": city.seoContent.metaTitle,
        "description": city.seoContent.metaDescription,
        "isPartOf": {
          "@type": "WebSite",
          "name": "ACO-HABITAT Diagnostic Toiture",
          "url": "https://diag.aco-habitat.fr"
        },
        "about": {
          "@type": "Thing",
          "name": `Diagnostic toiture a ${city.name}`
        },
        "mentions": [
          {
            "@type": "City",
            "name": city.name,
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": city.region
            }
          }
        ]
      },
      // Product Schema for rich snippets with price
      {
        "@type": "Product",
        "name": `Diagnostic Toiture IA ${city.name}`,
        "description": `Analyse complete de votre toiture a ${city.name} par intelligence artificielle. Rapport PDF detaille avec recommandations personnalisees.`,
        "brand": {
          "@type": "Brand",
          "name": "ACO-HABITAT"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://diag.aco-habitat.fr/diagnostic-toiture/${city.slug}`,
          "priceCurrency": "EUR",
          "price": "59.90",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "ACO-HABITAT"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        }
      },
      // HowTo Schema for featured snippets
      {
        "@type": "HowTo",
        "name": `Comment faire un diagnostic toiture a ${city.name}`,
        "description": `Guide etape par etape pour analyser l'etat de votre toiture a ${city.name}`,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Prendre une photo",
            "text": "Photographiez votre toiture depuis le sol ou utilisez une image satellite Google Maps"
          },
          {
            "@type": "HowToStep",
            "name": "Telecharger la photo",
            "text": "Uploadez votre photo sur notre plateforme de diagnostic IA"
          },
          {
            "@type": "HowToStep",
            "name": "Analyse automatique",
            "text": "Notre IA analyse mousse, fissures, tuiles cassees et deperditions thermiques"
          },
          {
            "@type": "HowToStep",
            "name": "Recevoir le rapport",
            "text": "Obtenez votre rapport PDF complet avec recommandations en 30 secondes"
          }
        ],
        "totalTime": "PT1M"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params
  const cityData = citiesData[city]

  if (!cityData) {
    notFound()
  }

  const nearbyCities = getNearbyCities(city, 4)
  const regionCities = getCitiesByRegion(cityData.regionSlug).filter(c => c.slug !== city).slice(0, 6)

  const windExposureLabels: Record<string, string> = {
    faible: "Faible",
    modere: "Modere",
    fort: "Fort",
    tres_fort: "Tres fort"
  }

  const frequencyColors: Record<string, string> = {
    frequent: "bg-red-500/10 text-red-400 border-red-500/20",
    modere: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    occasionnel: "bg-green-500/10 text-green-400 border-green-500/20"
  }

  return (
    <>
      <CityStructuredData city={cityData} />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="border-b border-border/50 bg-card/50" aria-label="Breadcrumb">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <Link href="/#diagnostic" className="text-muted-foreground hover:text-foreground transition-colors">
                  Diagnostic
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <Link 
                  href={`/diagnostic-toiture/region/${cityData.regionSlug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
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

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                    <MapPin className="mr-1 h-3 w-3" />
                    {cityData.department} ({cityData.departmentCode})
                  </Badge>
                  <Badge variant="outline" className="border-muted-foreground/30">
                    {cityData.population.toLocaleString("fr-FR")} habitants
                  </Badge>
                </div>
                
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {cityData.seoContent.h1}
                </h1>
                
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  {cityData.seoContent.introText}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/#diagnostic">
                      {cityData.seoContent.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/#tarifs">
                      Voir les tarifs - 59,90 EUR
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Stats Card */}
              <Card className="w-full lg:w-80 border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Cloud className="h-4 w-4 text-primary" />
                    Climat a {cityData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-400" />
                    <span>{cityData.climate.annualRainfall}mm/an</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <span>{cityData.climate.rainyDays} jours pluie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Snowflake className="h-4 w-4 text-cyan-400" />
                    <span>{cityData.climate.frostDays} jours gel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-400" />
                    <span>{cityData.climate.sunHours}h soleil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-400" />
                    <span>Vent {windExposureLabels[cityData.climate.windExposure]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span>Grele {cityData.climate.hailRisk}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Climate Section */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Climat et impact sur les toitures a {cityData.name}
            </h2>
            <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
              {cityData.seoContent.climateText}
            </p>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Thermometer className="h-4 w-4 text-blue-400" />
                    Temperature et gel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Avec <strong>{cityData.climate.frostDays} jours de gel</strong> et <strong>{cityData.climate.snowDays} jours de neige</strong> par an, 
                    les toitures de {cityData.name} doivent resister aux cycles gel/degel qui fragilisent les materiaux.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CloudRain className="h-4 w-4 text-blue-400" />
                    Precipitations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Les <strong>{cityData.climate.annualRainfall}mm de pluie</strong> repartis sur <strong>{cityData.climate.rainyDays} jours</strong> necessitent 
                    une etancheite parfaite et des gouttieres bien dimensionnees.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sun className="h-4 w-4 text-amber-400" />
                    Ensoleillement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Avec <strong>{cityData.climate.sunHours} heures de soleil</strong> par an, les UV peuvent 
                    {cityData.climate.sunHours > 2500 ? " accelerer significativement" : " contribuer au"} vieillissement des materiaux de couverture.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roof Types Section */}
        <section className="border-b border-border/50 bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Types de toitures a {cityData.name}
            </h2>
            <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
              {cityData.seoContent.roofTypesText}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cityData.roofTypes.map((roof, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div 
                    className="absolute inset-x-0 top-0 h-1 bg-primary" 
                    style={{ width: `${roof.percentage}%` }}
                  />
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-primary" />
                        {roof.type}
                      </span>
                      <Badge variant="secondary">{roof.percentage}%</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{roof.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Problems Section */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Problemes courants des toitures a {cityData.name}
            </h2>
            <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
              {cityData.seoContent.problemsText}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {cityData.commonProblems.map((problem, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        {problem.problem}
                      </span>
                      <Badge className={frequencyColors[problem.frequency]}>
                        {problem.frequency === "frequent" ? "Frequent" : problem.frequency === "modere" ? "Modere" : "Occasionnel"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{problem.description}</p>
                    <p className="text-xs text-muted-foreground/70">
                      <strong>Cause :</strong> {problem.cause}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="border-b border-border/50 bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Prix des travaux de toiture a {cityData.name}
            </h2>
            <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
              Estimations moyennes des couts de diagnostic et travaux de toiture dans le {cityData.department} ({cityData.departmentCode}).
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Diagnostic IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">59,90 EUR</p>
                  <p className="text-xs text-muted-foreground">Rapport PDF en 30 secondes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Euro className="h-4 w-4" />
                    Petite reparation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">
                    {cityData.pricing.repairSmall[0]} - {cityData.pricing.repairSmall[1]} EUR
                  </p>
                  <p className="text-xs text-muted-foreground">Tuiles cassees, petites fuites</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Euro className="h-4 w-4" />
                    Reparation moyenne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">
                    {cityData.pricing.repairMedium[0]} - {cityData.pricing.repairMedium[1]} EUR
                  </p>
                  <p className="text-xs text-muted-foreground">Faitage, noue, cheneaux</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Euro className="h-4 w-4" />
                    Renovation complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">
                    {(cityData.pricing.renovation[0] / 1000).toFixed(0)}k - {(cityData.pricing.renovation[1] / 1000).toFixed(0)}k EUR
                  </p>
                  <p className="text-xs text-muted-foreground">Refection totale couverture</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Patrimoine architectural de {cityData.name}
            </h2>
            <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
              Decouvrez les styles architecturaux caracteristiques de {cityData.name} et leurs specificites en matiere de toiture.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {cityData.architecture.map((arch, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building className="h-4 w-4 text-primary" />
                      {arch.style}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">{arch.period}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {arch.characteristics.map((char, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1 w-1 rounded-full bg-primary" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-b border-border/50 bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">
              Questions frequentes sur les toitures a {cityData.name}
            </h2>

            <div className="grid gap-4 lg:grid-cols-2">
              {cityData.faq.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold leading-tight">
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Cities Section */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Diagnostic toiture dans la region {cityData.region}
            </h2>
            <p className="mb-8 text-muted-foreground">
              Notre service de diagnostic IA est disponible dans toute la region {cityData.region}.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {regionCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/diagnostic-toiture/${nearbyCity.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-card"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-primary" />
                    {nearbyCity.name}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {nearbyCity.departmentCode}
                  </Badge>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href={`/diagnostic-toiture/region/${cityData.regionSlug}`}>
                  Voir toutes les villes de {cityData.region}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Local Info Section */}
        <section className="border-b border-border/50 bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
              Zones desservies a {cityData.name}
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Codes postaux</h3>
                <div className="flex flex-wrap gap-2">
                  {cityData.localInfo.zipCodes.slice(0, 8).map((zip) => (
                    <Badge key={zip} variant="secondary">{zip}</Badge>
                  ))}
                  {cityData.localInfo.zipCodes.length > 8 && (
                    <Badge variant="outline">+{cityData.localInfo.zipCodes.length - 8}</Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">Quartiers</h3>
                <div className="flex flex-wrap gap-2">
                  {cityData.localInfo.neighborhoods.slice(0, 6).map((neighborhood) => (
                    <Badge key={neighborhood} variant="outline">{neighborhood}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">Communes voisines</h3>
                <div className="flex flex-wrap gap-2">
                  {cityData.localInfo.nearbyCommunes.slice(0, 6).map((commune) => (
                    <Badge key={commune} variant="outline">{commune}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Analysez votre toiture a {cityData.name} maintenant
            </h2>
            <p className="mb-8 text-muted-foreground">
              Notre IA analyse votre toiture en 30 secondes et detecte les problemes specifiques au climat de {cityData.name} : 
              {cityData.climate.frostDays > 40 ? " gel intense," : ""}
              {cityData.climate.windExposure === "tres_fort" || cityData.climate.windExposure === "fort" ? " exposition au vent," : ""}
              {cityData.climate.rainyDays > 100 ? " humidite importante," : ""}
              {cityData.climate.sunHours > 2500 ? " degradation UV," : ""}
              {" "}et bien plus encore.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/#diagnostic">
                  Analyser ma toiture - 59,90 EUR
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#methode">
                  Comment ca marche
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Other Diagnostics Banner */}
        <section className="border-t border-border/50 bg-card/50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
              Nos autres diagnostics IA disponibles a {cityData.name}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://humidite.aco-habitat.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20"
              >
                <Droplets className="h-4 w-4" />
                Diagnostic Humidite IA
              </a>
              <a
                href="https://traitement-bois.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/20"
              >
                <Home className="h-4 w-4" />
                Diagnostic Charpente IA
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
