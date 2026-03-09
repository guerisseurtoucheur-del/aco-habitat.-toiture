import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { regionsData, getRegionBySlug } from "@/lib/regions-data"
import { citiesData, getCitiesByRegion } from "@/lib/cities-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, 
  MapPin, 
  Cloud, 
  ThermometerSnowflake, 
  Sun,
  Wind,
  Home,
  Droplets,
  CheckCircle2,
  Building2,
  ExternalLink
} from "lucide-react"

export async function generateStaticParams() {
  return Object.values(regionsData).map((region) => ({
    region: region.slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ region: string }> 
}): Promise<Metadata> {
  const { region } = await params
  const regionData = getRegionBySlug(region)
  
  if (!regionData) {
    return { title: "Region non trouvee" }
  }

  const title = `Diagnostic Toiture ${regionData.name} | Analyse IA en 30s | ACO-HABITAT`
  const description = `Diagnostic toiture par IA en ${regionData.name}. Analyse des toitures ${regionData.roofTypes.slice(0, 3).join(", ")} adaptees au climat ${regionData.climate}. ${regionData.cities.length}+ villes couvertes. Rapport PDF detaille a 59,90 EUR.`

  return {
    title,
    description,
    keywords: [
      `diagnostic toiture ${regionData.name}`,
      `analyse toiture IA ${regionData.name}`,
      `inspection toiture ${regionData.name}`,
      `etat toiture ${regionData.name}`,
      ...regionData.departments.map(d => `diagnostic toiture ${d}`),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      siteName: "ACO-HABITAT Diagnostic Toiture",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://diag.aco-habitat.fr/diagnostic-toiture/region/${regionData.slug}`,
    },
  }
}

export default async function RegionPage({ 
  params 
}: { 
  params: Promise<{ region: string }> 
}) {
  const { region } = await params
  const regionData = getRegionBySlug(region)
  
  if (!regionData) {
    notFound()
  }

  const regionCities = getCitiesByRegion(regionData.name)
  const otherRegions = Object.values(regionsData)
    .filter(r => r.slug !== regionData.slug)
    .slice(0, 6)

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `Diagnostic Toiture IA en ${regionData.name}`,
        "description": `Service de diagnostic toiture par intelligence artificielle en region ${regionData.name}. Analyse des problemes specifiques au climat ${regionData.climate}.`,
        "provider": {
          "@type": "Organization",
          "name": "ACO-HABITAT",
          "url": "https://diag.aco-habitat.fr"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": regionData.name,
          "containedIn": {
            "@type": "Country",
            "name": "France"
          }
        },
        "offers": {
          "@type": "Offer",
          "price": "59.90",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      },
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
            "item": "https://diag.aco-habitat.fr/diagnostic-toiture"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": regionData.name,
            "item": `https://diag.aco-habitat.fr/diagnostic-toiture/region/${regionData.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Quels types de toitures trouve-t-on en ${regionData.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `En ${regionData.name}, on trouve principalement des toitures en ${regionData.roofTypes.join(", ")}. Ces materiaux sont adaptes au climat ${regionData.climate} de la region.`
            }
          },
          {
            "@type": "Question",
            "name": `Quels sont les problemes de toiture frequents en ${regionData.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Les problemes courants en ${regionData.name} incluent : ${regionData.commonProblems.join(", ")}. Notre diagnostic IA detecte ces problemes specifiques au climat regional.`
            }
          },
          {
            "@type": "Question",
            "name": `Combien coute un diagnostic toiture en ${regionData.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Notre diagnostic toiture par IA en ${regionData.name} coute 59,90 EUR. Vous recevez un rapport PDF complet analysant votre toiture en moins de 30 secondes.`
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Accueil</Link>
              <span>/</span>
              <Link href="/diagnostic-toiture" className="hover:text-foreground">Diagnostic Toiture</Link>
              <span>/</span>
              <span className="text-foreground">{regionData.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <Badge className="mb-4" variant="secondary">
                  <MapPin className="mr-1 h-3 w-3" />
                  Region {regionData.name}
                </Badge>
                
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Diagnostic Toiture par IA en{" "}
                  <span className="text-primary">{regionData.name}</span>
                </h1>
                
                <p className="mb-6 text-lg text-muted-foreground">
                  Analysez votre toiture en 30 secondes grace a notre IA specialisee 
                  pour le climat {regionData.climate} de la region {regionData.name}. 
                  Detection des problemes specifiques : {regionData.commonProblems.slice(0, 2).join(", ")}.
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {regionData.roofTypes.map((type) => (
                    <Badge key={type} variant="outline">{type}</Badge>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
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

              {/* Stats Card */}
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  La region {regionData.name} en chiffres
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-background/50 p-4">
                    <Building2 className="mb-2 h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{regionData.cities.length}+</p>
                    <p className="text-sm text-muted-foreground">Villes couvertes</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-4">
                    <MapPin className="mb-2 h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{regionData.departments.length}</p>
                    <p className="text-sm text-muted-foreground">Departements</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-4">
                    <Cloud className="mb-2 h-5 w-5 text-cyan-500" />
                    <p className="text-2xl font-bold text-foreground">{regionData.climate}</p>
                    <p className="text-sm text-muted-foreground">Climat regional</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-4">
                    <Home className="mb-2 h-5 w-5 text-amber-500" />
                    <p className="text-2xl font-bold text-foreground">{regionData.roofTypes.length}</p>
                    <p className="text-sm text-muted-foreground">Types de toitures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Climate & Problems Section */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Specificites des toitures en {regionData.name}
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-primary" />
                    Climat {regionData.climate}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {regionData.description}
                  </p>
                  <div className="space-y-2">
                    {regionData.roofTypes.map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Toiture {type}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-500">
                    <ThermometerSnowflake className="h-5 w-5" />
                    Problemes frequents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Notre IA detecte les problemes specifiques au climat de {regionData.name} :
                  </p>
                  <ul className="space-y-2">
                    {regionData.commonProblems.map((problem) => (
                      <li key={problem} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span className="text-sm">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="border-b border-border/50 bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Diagnostic toiture dans les villes de {regionData.name}
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Selectionnez votre ville pour un diagnostic adapte a votre climat local
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {regionCities.slice(0, 16).map((city) => (
                <Link
                  key={city.slug}
                  href={`/diagnostic-toiture/${city.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border/50 bg-card p-3 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    <span className="font-medium text-foreground">{city.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            {regionCities.length > 16 && (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Et {regionCities.length - 16} autres villes en {regionData.name}...
              </p>
            )}
          </div>
        </section>

        {/* Departments List */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-6 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Departements de {regionData.name}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-3">
              {regionData.departments.map((dept) => (
                <Badge key={dept} variant="secondary" className="px-4 py-2 text-sm">
                  {dept}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-b border-border/50 bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Questions frequentes - Diagnostic toiture en {regionData.name}
            </h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Quels types de toitures trouve-t-on en {regionData.name} ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    En {regionData.name}, on trouve principalement des toitures en {regionData.roofTypes.join(", ")}. 
                    Ces materiaux sont parfaitement adaptes au climat {regionData.climate} de la region. 
                    Notre IA est entrainee a analyser ces types de couvertures specifiques.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Quels sont les problemes de toiture frequents en {regionData.name} ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Les problemes courants en {regionData.name} incluent : {regionData.commonProblems.join(", ")}. 
                    Notre diagnostic IA detecte ces problemes specifiques au climat regional et vous fournit 
                    des recommandations adaptees.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Combien coute un diagnostic toiture en {regionData.name} ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notre diagnostic toiture par IA en {regionData.name} coute 59,90 EUR. 
                    Vous recevez un rapport PDF complet analysant votre toiture en moins de 30 secondes, 
                    avec des recommandations adaptees au climat {regionData.climate} de votre region.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Other Regions */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-6 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Diagnostic toiture dans les autres regions
            </h2>
            
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {otherRegions.map((otherRegion) => (
                <Link
                  key={otherRegion.slug}
                  href={`/diagnostic-toiture/region/${otherRegion.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div>
                    <p className="font-medium text-foreground">{otherRegion.name}</p>
                    <p className="text-sm text-muted-foreground">Climat {otherRegion.climate}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Analysez votre toiture en {regionData.name}
            </h2>
            <p className="mb-8 text-muted-foreground">
              Notre IA specialisee detecte les problemes specifiques au climat {regionData.climate} : 
              {regionData.commonProblems.slice(0, 3).join(", ")}. 
              Rapport PDF detaille en 30 secondes.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/#diagnostic">
                  Analyser ma toiture - 59,90 EUR
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#tarifs">
                  Voir un exemple de rapport
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Other Diagnostics Banner */}
        <section className="border-t border-border/50 bg-card/50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
              Nos autres diagnostics IA disponibles en {regionData.name}
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
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://traitement-bois.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/20"
              >
                <Home className="h-4 w-4" />
                Diagnostic Charpente IA
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
