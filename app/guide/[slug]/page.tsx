import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Clock, Calendar, Zap, Phone, BookOpen, ChevronRight } from "lucide-react"
import { guidesData, getGuideBySlug, getAllGuideSlugs } from "@/lib/guides-data"
import { getServiceBySlug } from "@/lib/services-data"

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `/guide/${slug}`,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: "article",
      locale: "fr_FR",
      siteName: "ACO-HABITAT",
      url: `https://diag.aco-habitat.fr/guide/${slug}`,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: ["ACO-HABITAT"],
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const otherGuides = guidesData.filter((g) => g.slug !== slug).slice(0, 3)
  const relatedServiceData = guide.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean)

  return (
    <>
      {/* Schema.org Article (E-E-A-T) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.heroTitle,
            description: guide.metaDescription,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            author: {
              "@type": "Organization",
              name: "ACO-HABITAT",
              url: "https://diag.aco-habitat.fr",
              logo: "https://diag.aco-habitat.fr/images/logo-aco-habitat.png",
            },
            publisher: {
              "@type": "Organization",
              name: "ACO-HABITAT",
              url: "https://diag.aco-habitat.fr",
              logo: {
                "@type": "ImageObject",
                url: "https://diag.aco-habitat.fr/images/logo-aco-habitat.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://diag.aco-habitat.fr/guide/${slug}`,
            },
            image: "https://diag.aco-habitat.fr/images/logo-aco-habitat.png",
          }),
        }}
      />

      {/* Schema.org FAQPage per guide */}
      {guide.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: guide.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://diag.aco-habitat.fr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Guides",
                item: "https://diag.aco-habitat.fr/guide",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: guide.title,
                item: `https://diag.aco-habitat.fr/guide/${slug}`,
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-background">
        {/* Navigation bar */}
        <header className="border-b border-border bg-card/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3 group">
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
        </header>

        {/* Breadcrumb */}
        <nav className="mx-auto max-w-4xl px-6 pt-8" aria-label="Fil d'Ariane">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li>
              <span className="hover:text-foreground transition-colors">
                Guides
              </span>
            </li>
            <li><ChevronRight size={12} /></li>
            <li>
              <span className="text-foreground font-medium">{guide.title}</span>
            </li>
          </ol>
        </nav>

        {/* Article */}
        <article className="mx-auto max-w-4xl px-6 py-12">
          {/* Hero */}
          <div className="mb-12">
            <Link
              href="/"
              className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Retour a l{"'"}accueil
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <BookOpen size={12} />
                Guide expert
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={12} />
                {guide.readTime} de lecture
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={12} />
                {new Date(guide.dateModified).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1
              className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {guide.heroTitle}
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              {guide.heroDescription}
            </p>

            {/* Author box */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/logo-aco-habitat.png"
                  alt="ACO-HABITAT"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  ACO-HABITAT
                </p>
                <p className="text-xs text-muted-foreground">
                  Expert couverture & charpente - Plus de 500 toitures diagnostiquees
                </p>
              </div>
            </div>
          </div>

          {/* Table of contents */}
          <nav
            className="mb-12 rounded-2xl border border-border bg-card/40 p-6"
            aria-label="Sommaire de l'article"
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">Sommaire</h2>
            <ol className="flex flex-col gap-2">
              {guide.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {guide.sections.map((section, i) => (
              <section key={i} id={`section-${i}`}>
                <h2
                  className="text-balance text-xl font-bold tracking-tight text-foreground md:text-2xl mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {section.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="mt-4 flex flex-col gap-3">
                    {section.list.map((item, j) => (
                      <li
                        key={j}
                        className="flex gap-3 rounded-xl border border-border bg-card/30 p-4"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {j + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* FAQ */}
          {guide.faq.length > 0 && (
            <section className="mt-16">
              <h2
                className="text-balance text-xl font-bold tracking-tight text-foreground md:text-2xl mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Questions frequentes
              </h2>
              <div className="flex flex-col gap-4">
                {guide.faq.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-border bg-card/40 transition-all open:border-primary/20 open:bg-card/60"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-foreground">
                      {faq.question}
                      <ChevronRight
                        size={16}
                        className="shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                      />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA diagnostic */}
          <section className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2
              className="text-balance text-xl font-bold tracking-tight text-foreground md:text-2xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Diagnostiquez votre toiture gratuitement
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Notre IA analyse votre toiture en moins de 30 secondes a partir d{"'"}une photo satellite.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          </section>

          {/* Related services */}
          {relatedServiceData.length > 0 && (
            <section className="mt-16">
              <h2
                className="text-balance text-xl font-bold tracking-tight text-foreground md:text-2xl mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Services associes
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {relatedServiceData.map((service) => {
                  if (!service) return null
                  const ServiceIcon = service.icon
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:border-primary/30 hover:bg-card/70"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <ServiceIcon size={18} className="text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        En savoir plus
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </article>

        {/* Other guides */}
        <section className="border-t border-border bg-card/30 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2
              className="text-balance text-xl font-bold tracking-tight text-foreground md:text-2xl mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Autres guides experts
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {otherGuides.map((other) => (
                <Link
                  key={other.slug}
                  href={`/guide/${other.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-all hover:border-primary/30 hover:bg-card/80"
                >
                  <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                    <BookOpen size={10} />
                    {other.readTime}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {other.heroTitle}
                  </h3>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary mt-auto">
                    Lire le guide
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
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
