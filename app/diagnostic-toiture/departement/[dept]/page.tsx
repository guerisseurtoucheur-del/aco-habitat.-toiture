import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { departmentsData, getDepartmentBySlug, getDepartmentsByRegion } from "@/lib/departments-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, 
  MapPin, 
  Cloud, 
  Home,
  Droplets,
  CheckCircle2,
  Building2,
  ExternalLink,
  Phone,
  Mail,
  AlertTriangle,
  Thermometer,
  Users
} from "lucide-react"

export async function generateStaticParams() {
  return Object.values(departmentsData).map((dept) => ({
    dept: dept.slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ dept: string }> 
}): Promise<Metadata> {
  const { dept } = await params
  const deptData = getDepartmentBySlug(dept)
  
  if (!deptData) {
    return { title: "Departement non trouve" }
  }

  const title = `Diagnostic Toiture ${deptData.name} (${deptData.code}) | Analyse IA | ACO-HABITAT`
  const description = `Diagnostic toiture par IA dans le ${deptData.name} (${deptData.code}). Analyse des toitures ${deptData.mainRoofTypes.slice(0, 2).join(" et ")} adaptees au climat ${deptData.climate}. Problemes frequents : ${deptData.specificProblems.slice(0, 2).join(", ")}. Rapport PDF a 59,90 EUR.`

  return {
    title,
    description,
    keywords: [
      `diagnostic toiture ${deptData.name}`,
      `diagnostic toiture ${deptData.code}`,
      `analyse toiture ${deptData.prefecture}`,
      `couvreur ${deptData.name}`,
      `inspection toiture ${deptData.code}`,
      ...deptData.specificProblems.map(p => `${p.toLowerCase()} toiture ${deptData.name}`),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      siteName: "ACO-HABITAT Diagnostic Toiture",
    },
    alternates: {
      canonical: `https://diag.aco-habitat.fr/diagnostic-toiture/departement/${deptData.slug}`,
    },
  }
}

export default async function DepartmentPage({ 
  params 
}: { 
  params: Promise<{ dept: string }> 
}) {
  const { dept } = await params
  const deptData = getDepartmentBySlug(dept)
  
  if (!deptData) {
    notFound()
  }

  const samRegionDepts = getDepartmentsByRegion(deptData.region)
    .filter(d => d.slug !== deptData.slug)
    .slice(0, 6)

  const climateDescriptions: Record<string, string> = {
    "oceanique": "Climat doux et humide avec pluies frequentes. Les toitures sont exposees a une humidite constante favorisant le developpement de mousses et lichens.",
    "continental": "Hivers rigoureux et etes chauds. Les toitures subissent des ecarts de temperature importants et des episodes de gel pouvant fissurer les materiaux.",
    "mediterraneen": "Soleil intense et periodes de secheresse. Les toitures sont exposees aux UV et aux pluies torrentielles occasionnelles.",
    "montagnard": "Conditions extremes avec neige abondante et gel severe. Les toitures doivent supporter des charges importantes et resister au gel.",
    "semi-oceanique": "Climat de transition avec influence oceanique attenuee. Les toitures sont exposees a des conditions variees selon les saisons."
  }

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `Diagnostic Toiture IA dans le ${deptData.name}`,
        "description": `Service de diagnostic toiture par intelligence artificielle dans le departement ${deptData.name} (${deptData.code}). Analyse adaptee au climat ${deptData.climate}.`,
        "provider": {
          "@type": "Organization",
          "name": "ACO-HABITAT",
          "telephone": "+33233311979",
          "email": "aco.habitat@orange.fr",
          "foundingDate": "2006"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": deptData.name,
          "containedIn": deptData.region
        },
        "offers": {
          "@type": "Offer",
          "price": "59.90",
          "priceCurrency": "EUR",
          "description": "Diagnostic toiture complet par IA avec rapport PDF"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Quels sont les problemes de toiture courants dans le ${deptData.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Dans le ${deptData.name}, les problemes frequents sont : ${deptData.specificProblems.join(", ")}. Ces problemes sont lies au climat ${deptData.climate} de la region.`
            }
          },
          {
            "@type": "Question",
            "name": `Quels types de toiture trouve-t-on dans le ${deptData.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Les toitures les plus courantes dans le ${deptData.name} sont : ${deptData.mainRoofTypes.join(", ")}. Ces materiaux sont adaptes aux conditions climatiques locales.`
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
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_50%)] opacity-5" />
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/diagnostic-toiture" className="hover:text-foreground transition-colors">Diagnostic</Link>
              <span>/</span>
              <span className="text-foreground">{deptData.name}</span>
            </nav>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <Badge variant="outline" className="mb-4 gap-2">
                  <MapPin size={12} />
                  Departement {deptData.code} - {deptData.region}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Diagnostic Toiture dans le {deptData.name}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                  Analysez l'etat de votre toiture dans le {deptData.name} grace a notre technologie IA. 
                  Diagnostic adapte au climat {deptData.climate} et aux specificites locales.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/#diagnostic">
                      Diagnostic IA - 59,90 EUR
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link href="/#methode">
                      Comment ca marche
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Stats Card */}
              <Card className="w-full lg:w-80">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 size={18} className="text-primary" />
                    {deptData.name} en chiffres
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">Prefecture</span>
                    <span className="font-medium">{deptData.prefecture}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">Population</span>
                    <span className="font-medium">{deptData.population.toLocaleString('fr-FR')} hab.</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">Climat</span>
                    <Badge variant="secondary" className="capitalize">{deptData.climate}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Age moyen toitures</span>
                    <span className="font-medium">{deptData.averageRoofAge} ans</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Climate & Problems Section */}
        <section className="border-b border-border py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Climate Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud size={20} className="text-primary" />
                    Climat {deptData.climate}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {climateDescriptions[deptData.climate]}
                  </p>
                </CardContent>
              </Card>

              {/* Problems Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle size={20} className="text-amber-500" />
                    Problemes frequents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {deptData.specificProblems.map((problem, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roof Types Section */}
        <section className="border-b border-border py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">
              Types de toiture dans le {deptData.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deptData.mainRoofTypes.map((roofType, i) => (
                <Card key={i} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Home size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{roofType}</h3>
                      <p className="text-sm text-muted-foreground">Courant dans le {deptData.code}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Pourquoi choisir notre diagnostic IA dans le {deptData.name} ?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Thermometer, title: "Adapte au climat", desc: `Analyse specifique au climat ${deptData.climate}` },
                { icon: Droplets, title: "Detection humidite", desc: "Identification des zones a risque d'infiltration" },
                { icon: Users, title: "Expert local", desc: `Connaissance des toitures du ${deptData.name}` },
                { icon: CheckCircle2, title: "Rapport complet", desc: "PDF detaille avec recommandations" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-b border-border/50 bg-primary/5 py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="mb-2 text-xl font-bold text-foreground">ACO-HABITAT - Expert toiture depuis 2006</h2>
              <p className="mb-6 text-muted-foreground">Une question sur votre toiture dans le {deptData.name} ? Contactez-nous !</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <a 
                  href="tel:+33233311979" 
                  className="flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
                >
                  <Phone className="h-5 w-5" />
                  02 33 31 19 79
                </a>
                <a 
                  href="mailto:aco.habitat@orange.fr" 
                  className="flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
                >
                  <Mail className="h-5 w-5" />
                  aco.habitat@orange.fr
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Other Departments */}
        {samRegionDepts.length > 0 && (
          <section className="border-b border-border py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">
                Autres departements en {deptData.region}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {samRegionDepts.map((d) => (
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

        {/* Cross-selling */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Nos autres diagnostics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a 
                href="https://humidite.aco-habitat.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-cyan-500/30 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Droplets size={28} className="text-cyan-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-cyan-500">Diagnostic Humidite IA</h3>
                  <p className="text-sm text-muted-foreground">Analysez les problemes d'humidite de votre maison</p>
                </div>
                <ExternalLink size={18} className="text-muted-foreground" />
              </a>
              <a 
                href="https://traitement-bois.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-amber-500/30 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10">
                  <Home size={28} className="text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-amber-500">Diagnostic Charpente & Bois</h3>
                  <p className="text-sm text-muted-foreground">Merule, insectes xylophages, etat de la charpente</p>
                </div>
                <ExternalLink size={18} className="text-muted-foreground" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Analysez votre toiture dans le {deptData.name} maintenant
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Obtenez un diagnostic complet de votre toiture en moins de 30 secondes. 
              Analyse adaptee au climat {deptData.climate} du departement.
            </p>
            <Button asChild size="lg" className="gap-2 px-8">
              <Link href="/#diagnostic">
                Lancer mon diagnostic - 59,90 EUR
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
