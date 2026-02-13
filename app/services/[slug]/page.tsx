import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Zap } from "lucide-react"
import { servicesData, getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data"

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
      locale: "fr_FR",
      siteName: "ACO-HABITAT",
      url: `https://aco-habitat.fr/services/${slug}`,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const Icon = service.icon

  const otherServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Schema.org Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.heroDescription,
            provider: {
              "@type": "LocalBusiness",
              name: "ACO-HABITAT",
              telephone: "+33233311979",
              email: "aco.habitat@orange.fr",
              url: "https://aco-habitat.fr",
            },
            areaServed: {
              "@type": "Country",
              name: "France",
            },
          }),
        }}
      />

      <main className="min-h-screen bg-background">
        {/* Navigation bar */}
        <div className="border-b border-border bg-card/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo-aco-habitat.png"
                  alt="Logo ACO-HABITAT"
                  width={44}
                  height={44}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-foreground font-sans leading-tight">
                  ACO-HABITAT
                </span>
                <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                  Expert Couverture & Charpente
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="tel:+33233311979"
                className="hidden sm:flex rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                02 33 31 19 79
              </a>
              <Link
                href="/#diagnostic"
                className="group flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Zap size={14} className="transition-transform group-hover:scale-110" />
                Diagnostic gratuit
              </Link>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{service.title}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-glow-blue),_transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Link
              href="/"
              className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Retour a l{"'"}accueil
            </Link>

            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <Icon size={28} className="text-primary" />
              </div>
              <div>
                <h1
                  className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.heroTitle}
                </h1>
                <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {service.heroDescription}
                </p>
              </div>
            </div>

            {/* Key points */}
            <div className="mt-10 flex flex-wrap gap-3">
              {service.details.map((detail) => (
                <div
                  key={detail}
                  className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2"
                >
                  <CheckCircle size={14} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2
              className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nos prestations
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-7 transition-all hover:border-primary/30 hover:bg-card/70"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2
              className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {service.cta}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Diagnostic gratuit, devis detaille sous 24h. Intervention sur toute la France.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#diagnostic"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20"
              >
                <Zap size={16} className="transition-transform group-hover:scale-110" />
                Diagnostic IA gratuit
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

        {/* Other services */}
        <section className="border-t border-border bg-card/30 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2
              className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nos autres services
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {otherServices.map((other) => {
                const OtherIcon = other.icon
                return (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-primary/30 hover:bg-card/80"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <OtherIcon size={22} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {other.heroDescription}
                    </p>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary">
                      En savoir plus
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer mini */}
        <footer className="border-t border-border py-8">
          <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              {"2026 ACO-HABITAT. Tous droits reserves."}
            </p>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Retour a l{"'"}accueil
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}
