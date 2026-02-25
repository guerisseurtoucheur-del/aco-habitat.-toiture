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
  Hammer,
  ThermometerSun,
  Scan,
  TreePine,
  ExternalLink,
  ChevronRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { departments, getDepartmentBySlug, getAllDepartmentSlugs, PARTNER_SITES } from "@/lib/departments"

// -- Static generation for all 101 departments --
export async function generateStaticParams() {
  return getAllDepartmentSlugs().map((slug) => ({ slug }))
}

// -- Dynamic metadata per department --
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const dept = getDepartmentBySlug(slug)
  if (!dept) return {}

  const title = `Couvreur ${dept.nom} (${dept.code}) - Diagnostic Toiture IA | ACO-HABITAT`
  const description = `Expert couvreur dans le ${dept.nom} (${dept.code}). Diagnostic toiture par IA a 59,90\u20AC. Intervention a ${dept.prefecture}, ${dept.villesPrincipales.slice(0, 3).join(", ")}. Demoussage, reparation, renovation. Devis gratuit.`

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
      siteName: "ACO-HABITAT Diagnostic Toiture",
    },
  }
}

// -- Services data --
const services = [
  { icon: Scan, title: "Diagnostic IA", description: "Analyse satellite par intelligence artificielle de votre toiture en 30 secondes.", color: "#3b82f6" },
  { icon: TreePine, title: "Demoussage", description: "Traitement anti-mousse, lichen et vegetation parasite. Protection hydrofuge longue duree.", color: "#22c55e" },
  { icon: Droplets, title: "Etancheite", description: "Reparation des infiltrations, joints, noues et points singuliers de votre couverture.", color: "#06b6d4" },
  { icon: Hammer, title: "Renovation", description: "Remplacement de tuiles, ardoises cassees. Renovation partielle ou complete de toiture.", color: "#f59e0b" },
  { icon: ThermometerSun, title: "Isolation", description: "Isolation thermique par l'exterieur ou l'interieur. Ameliorez votre DPE et vos economies.", color: "#ef4444" },
  { icon: Bug, title: "Traitement charpente", description: "Traitement preventif et curatif contre les insectes xylophages et champignons.", color: "#a855f7" },
]

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dept = getDepartmentBySlug(slug)
  if (!dept) notFound()

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
              "@type": "RoofingContractor",
              name: `ACO-HABITAT - Couvreur ${dept.nom}`,
              description: `Expert couvreur dans le ${dept.nom}. Diagnostic toiture IA, demoussage, reparation, renovation.`,
              url: `https://diag.aco-habitat.fr/couvreur/${dept.slug}`,
              telephone: "+33233311979",
              email: "contact@aco-habitat.fr",
              areaServed: {
                "@type": "AdministrativeArea",
                name: dept.nom,
              },
              address: {
                "@type": "PostalAddress",
                addressRegion: dept.region,
                addressCountry: "FR",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services toiture",
                itemListElement: services.map((s) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: s.title,
                    description: s.description,
                  },
                })),
              },
            }),
          }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-background pb-16 pt-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <MapPin size={12} />
              {dept.region} - Departement {dept.code}
            </div>
            <h1 className="mb-4 text-balance font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Couvreur expert dans{" "}
              <span className="text-primary">
                {"le "}
                {dept.nom}
              </span>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {dept.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#diagnostic"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20"
              >
                Diagnostic IA - 59,90{"\u20AC"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+33233311979"
                className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-4 text-base font-medium text-secondary-foreground transition-all hover:bg-secondary"
              >
                <Phone size={16} />
                02 33 31 19 79
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-b border-border bg-background py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-center font-heading text-3xl font-bold text-foreground">
              Nos services dans{" "}
              <span className="text-primary">
                {"le "}
                {dept.nom}
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-center text-sm text-muted-foreground">
              Specialistes des toitures en {dept.toitureDominante}, adaptees au climat {dept.climat} de votre departement.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
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
        <section className="border-b border-border bg-card/30 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-center font-heading text-2xl font-bold text-foreground">
              Nos zones d{"'"}intervention dans{" "}
              {"le "}
              {dept.nom}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">
              Nous intervenons dans tout le departement {dept.code} - {dept.nom}, y compris :
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {dept.villesPrincipales.map((ville) => (
                <div
                  key={ville}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground"
                >
                  <MapPin size={12} className="text-primary" />
                  {ville}
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-card/50 px-4 py-2.5 text-sm text-muted-foreground">
                + toutes les communes du {dept.code}
              </div>
            </div>
          </div>
        </section>

        {/* Autres diagnostics (partenaires) */}
        <section className="border-b border-border bg-background py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-center font-heading text-2xl font-bold text-foreground">
              Nos autres diagnostics en ligne
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">
              ACO-HABITAT propose egalement des diagnostics specialises pour proteger votre habitat dans{" "}
              {"le "}
              {dept.nom}.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Traitement bois */}
              <a
                href={PARTNER_SITES.traitementBois.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <Bug size={20} className="text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-semibold text-foreground">{PARTNER_SITES.traitementBois.label}</h3>
                    <p className="text-xs text-muted-foreground">traitement-bois.fr</p>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground transition-colors group-hover:text-amber-500" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{PARTNER_SITES.traitementBois.description}</p>
              </a>
              {/* Humidite */}
              <a
                href={PARTNER_SITES.humidite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                    <Droplets size={20} className="text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-semibold text-foreground">{PARTNER_SITES.humidite.label}</h3>
                    <p className="text-xs text-muted-foreground">humidite.aco-habitat.fr</p>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground transition-colors group-hover:text-cyan-500" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{PARTNER_SITES.humidite.description}</p>
              </a>
            </div>
          </div>
        </section>

        {/* Departements proches (maillage interne) */}
        <section className="border-b border-border bg-card/30 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground">
              Departements proches
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((d) => (
                <Link
                  key={d.slug}
                  href={`/couvreur/${d.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-primary/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {d.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">Couvreur {d.nom}</p>
                    <p className="truncate text-xs text-muted-foreground">{d.region}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-10">
              <Shield size={32} className="mx-auto mb-4 text-primary" />
              <h2 className="mb-3 font-heading text-2xl font-bold text-foreground">
                Votre toiture dans{" "}
                {"le "}
                {dept.nom}{" "}
                merite un expert
              </h2>
              <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Lancez votre diagnostic IA en 30 secondes ou appelez-nous directement pour un devis d{"'"}intervention gratuit.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#diagnostic"
                  className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20"
                >
                  Diagnostic IA - 59,90{"\u20AC"}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+33233311979"
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-4 text-base font-medium text-secondary-foreground transition-all hover:bg-secondary"
                >
                  <Phone size={16} />
                  02 33 31 19 79
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
