import Image from "next/image"
import { Phone, ArrowRight, ShieldCheck, MapPin, Award, Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:grid-cols-2 lg:gap-12">
        {/* Left: copy */}
        <div className="flex flex-col">
          <div className="animate-fade-up inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <Award size={13} className="text-primary" />
            <span className="text-xs font-medium tracking-wide text-secondary-foreground">
              Expert traitement du bois depuis 2006
            </span>
          </div>

          <h1
            className="animate-fade-up-delay-1 mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sauvez votre charpente de la{" "}
            <span className="text-primary italic">mérule</span> et des{" "}
            <span className="text-primary italic">insectes du bois</span>
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            ACO-HABITAT traite durablement votre charpente : capricornes, vrillettes,
            lyctus, mérule et champignons lignivores. <span className="font-semibold text-foreground">Diagnostic gratuit</span>,
            traitement certifié et garantie sur nos interventions.
          </p>

          <div className="animate-fade-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#devis"
              className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Demander un devis gratuit
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+33233311979"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Phone size={17} className="text-primary" />
              02 33 31 19 79
            </a>
          </div>

          {/* Trust row */}
          <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-secondary-foreground">
            <span className="flex items-center gap-2">
              <Search size={16} className="text-accent" />
              Diagnostic gratuit
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-accent" />
              Intervention garantie
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              Orne, Sarthe, Mayenne, Eure, Eure-et-Loir
            </span>
          </div>
        </div>

        {/* Right: image */}
        <div className="animate-fade-up-delay-2 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-2xl shadow-primary/10 sm:aspect-[4/4.2]">
            <Image
              src="/images/charpente-hero.png"
              alt="Charpente en bois traitée par ACO-HABITAT contre la mérule et les insectes xylophages"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-xl sm:-left-6">
            <span
              className="text-3xl font-semibold text-primary"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              18+
            </span>
            <span className="text-xs leading-tight text-muted-foreground">
              années d&apos;expérience
              <br />
              en traitement du bois
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
