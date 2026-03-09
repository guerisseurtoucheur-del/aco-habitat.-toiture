import type { Metadata } from "next"
import Link from "next/link"
import { regionsData } from "@/lib/regions-data"
import { getAllCities } from "@/lib/cities-data"
import { getAllDepartments } from "@/lib/departments-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, 
  MapPin, 
  Building2,
  Droplets,
  Home,
  ExternalLink,
  Search
} from "lucide-react"

export const metadata: Metadata = {
  title: "Diagnostic Toiture France | Toutes les Villes et Regions | ACO-HABITAT",
  description: "Diagnostic toiture par IA dans toute la France. Trouvez votre ville ou region pour une analyse adaptee a votre climat local. Plus de 100 villes couvertes. Rapport PDF a 59,90 EUR.",
  keywords: [
    "diagnostic toiture France",
    "analyse toiture IA",
    "inspection toiture ville",
    "diagnostic toiture region",
  ],
  openGraph: {
    title: "Diagnostic Toiture France | Toutes les Villes et Regions",
    description: "Diagnostic toiture par IA dans toute la France. Trouvez votre ville pour une analyse adaptee a votre climat.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://diag.aco-habitat.fr/diagnostic-toiture",
  },
}

export default function DiagnosticToiturePage() {
  const regions = Object.values(regionsData)
  const cities = getAllCities().slice(0, 24) // Top 24 cities
  const departments = getAllDepartments()

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Diagnostic Toiture en France",
    "description": "Trouvez votre diagnostic toiture par ville ou region en France",
    "url": "https://diag.aco-habitat.fr/diagnostic-toiture",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": regions.map((region, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": region.name,
        "url": `https://diag.aco-habitat.fr/diagnostic-toiture/region/${region.slug}`
      }))
    }
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
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Accueil</Link>
              <span>/</span>
              <span className="text-foreground">Diagnostic Toiture</span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4" variant="secondary">
                <MapPin className="mr-1 h-3 w-3" />
                Toute la France
              </Badge>
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Diagnostic Toiture par IA{" "}
                <span className="text-primary">dans toute la France</span>
              </h1>
              
              <p className="mb-8 text-lg text-muted-foreground">
                Notre IA analyse votre toiture en tenant compte des specificites climatiques 
                de votre region. Selectionnez votre ville ou region pour un diagnostic personnalise.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/#diagnostic">
                    Analyser ma toiture - 59,90 EUR
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#regions">
                    <Search className="mr-2 h-4 w-4" />
                    Trouver ma ville
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{regions.length}</p>
                <p className="text-sm text-muted-foreground">Regions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Villes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">30s</p>
                <p className="text-sm text-muted-foreground">Analyse IA</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">59,90 EUR</p>
                <p className="text-sm text-muted-foreground">Rapport PDF</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Cities */}
        <section className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Grandes villes de France
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Diagnostic toiture adapte au climat de chaque ville
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/diagnostic-toiture/${city.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      <span className="font-medium text-foreground">{city.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{city.department} ({city.departmentCode})</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section id="regions" className="border-b border-border/50 bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Diagnostic toiture par region
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Chaque region a ses specificites climatiques et types de toitures
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regions.map((region) => (
                <Card key={region.slug} className="group transition-all hover:border-primary/50">
                  <Link href={`/diagnostic-toiture/region/${region.slug}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <span>{region.name}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-muted-foreground">
                        {region.climate.split(" ").slice(0, 3).join(" ")} - {region.departments.length} departements
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {region.mainRoofTypes.slice(0, 3).map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section id="departements" className="border-b border-border/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Tous les departements ({departments.length})
              </h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {departments.map((dept) => (
                <Link 
                  key={dept.code}
                  href={`/diagnostic-toiture/departement/${dept.slug}`}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <Badge variant="outline" className="shrink-0">{dept.code}</Badge>
                  <span className="truncate font-medium text-foreground group-hover:text-primary">{dept.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Analysez votre toiture maintenant
            </h2>
            <p className="mb-8 text-muted-foreground">
              Quel que soit votre emplacement en France, notre IA analyse votre toiture 
              en tenant compte des specificites climatiques locales : pluie, gel, vent, ensoleillement.
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
              Decouvrez nos autres diagnostics IA
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
